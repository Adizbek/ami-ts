import Net from 'net'
import EventEmitter from 'node:events'
import {
    AMIAction,
    AMIActionTypes,
    AMIDataReaderEvents,
    AMIResultCollectorEvents,
    AMIEventMap,
    AMILoginResult,
    AMIOptions,
} from '../types'
import { AMIResultCollector } from './ami-result-collector'
import { AMIDataReader } from './ami-data-reader'

const DEFAULT_RECONNECT_INTERVAL = 2000
const DEFAULT_READ_TIMEOUT = 60000
const DEFAULT_PING_INTERVAL = 30000

export abstract class AMIConnection {
    private connection?: Net.Socket
    private connected = false
    private authenticated = false

    private actionEmitter = new EventEmitter()
    private eventEmitter = new EventEmitter()

    private actionId = 1

    private keepAliveIntervalRef?: NodeJS.Timeout
    private shouldReconnect = true
    private readonly _reconnectInterval: number
    private _reconnectTimer?: NodeJS.Timeout
    private _nextReconnectAfter = 0

    protected constructor(protected readonly options: AMIOptions) {
        const defaultConfig: Partial<AMIOptions> = {
            keepAlive: true,
            reconnect: true,
            listenEvents: true,
            readTimeout: DEFAULT_READ_TIMEOUT,
            pingInterval: DEFAULT_PING_INTERVAL,
        }

        this.options = Object.assign(defaultConfig, this.options)

        this._reconnectInterval =
            this.options.reconnectInterval &&
            Number.isInteger(this.options.reconnectInterval)
                ? this.options.reconnectInterval
                : DEFAULT_RECONNECT_INTERVAL
    }

    async connect() {
        if (this._reconnectTimer) clearTimeout(this._reconnectTimer)

        const resultCollector = new AMIResultCollector()
            .on(AMIResultCollectorEvents.ActionResult, (actionID, payload) => {
                this.actionEmitter.emit(`result_${actionID}`, payload)
            })
            .on(AMIResultCollectorEvents.Event, (event) => {
                this.eventEmitter.emit(`on${event.Event}`, event)
                this.eventEmitter.emit('*', event)
            })

        const dataReader = new AMIDataReader({
            logger: this.options.logger,
        }).on(AMIDataReaderEvents.Result, (result) =>
            resultCollector.collect(result)
        )

        this.connection = Net.createConnection(
            this.options.port,
            this.options.host
        )
        this.connection.setKeepAlive(true)
        this.connection.setNoDelay(true)
        this.connection.setTimeout(
            this.options.readTimeout || DEFAULT_READ_TIMEOUT
        )
        this.connection.setEncoding('utf-8')

        this.connection.on('close', () => {
            clearInterval(this.keepAliveIntervalRef)

            this.connected = false
            this.authenticated = false

            this.options.logger?.log('close')

            this.reconnect()
        })

        this.connection.on('timeout', () => {
            this.options.logger?.log('timeout')

            this.connection?.destroy()
        })

        this.connection.on('connect', () => {
            this.options.logger?.log('connect')
            this._nextReconnectAfter = 0
        })
        this.connection.on('data', (data) => dataReader.onNewData(data))
        this.connection.on('error', (err: Error) => {
            this.connected = false
            this.authenticated = false

            this.options.logger?.log('error', err)

            this.reconnect()
        })

        return new Promise<void>((resolve, reject) => {
            dataReader.on(AMIDataReaderEvents.Welcome, () => {
                this.connected = true

                this.auth().then((result) => {
                    if (result.Response === 'Success') {
                        resolve()

                        this.authenticated = true

                        if (this.options.keepAlive) this.startKeepAlive()
                    } else {
                        this.shouldReconnect = false
                        this.connection?.destroy()

                        reject()
                    }
                })
            })
        })
    }

    disconnect(allowReconnect = false) {
        this.shouldReconnect = allowReconnect
        this.connection?.destroy()
    }

    reconnect() {
        if (this.shouldReconnect && this.options.reconnect) {
            this._reconnectTimer = setTimeout(() => {
                if (this.connection) {
                    this.connection.removeAllListeners()
                    this.connection.destroy()
                }

                this.options.logger?.log('reconnect')
                this._nextReconnectAfter = this._reconnectInterval
                this.connect()
            }, this._nextReconnectAfter)
        }
    }

    async sendAction<T>(action: AMIAction): Promise<T> {
        for (let i = 0; i < 10; i++) {
            if (
                !this.connected ||
                (!this.authenticated && action.Action !== AMIActionTypes.Login)
            ) {
                await new Promise((resolve) => setTimeout(resolve, 1000))
            }
        }

        const currentActionID = this.actionId++
        const msg = this.makeAction(action, currentActionID)

        const result = new Promise<T>((resolve) => {
            this.actionEmitter.once(`result_${currentActionID}`, (result) =>
                resolve(result)
            )
        })

        await new Promise((resolve, reject) => {
            this.connection?.write(msg, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(null)
                }
            })
        })

        this.options.logger?.log('Send action -->')
        this.options.logger?.log(msg)
        this.options.logger?.log('Send action done!')

        return result
    }

    on<TEventName extends keyof AMIEventMap & string>(
        eventName: TEventName,
        handler: (...eventArg: AMIEventMap[TEventName]) => void
    ): this {
        this.eventEmitter.on(eventName, handler as never)

        return this
    }

    off<TEventName extends keyof AMIEventMap & string>(
        eventName: TEventName,
        handler: (...eventArg: AMIEventMap[TEventName]) => void
    ): this {
        this.eventEmitter.off(eventName, handler as never)

        return this
    }

    private makeAction(action: AMIAction, id: number): string {
        const msg: string[] = []
        msg.push('ActionID: ' + id)

        for (const [key, value] of Object.entries(action)) {
            if (value === undefined) continue

            msg.push(key + ': ' + value)
        }

        msg.sort()

        return msg.join('\r\n') + '\r\n\r\n'
    }

    private async auth() {
        return this.sendAction<AMILoginResult>({
            Action: AMIActionTypes.Login,
            Username: this.options.username,
            Secret: this.options.password,
            Events: this.options.listenEvents ? 'ON' : 'OFF',
        })
    }

    private startKeepAlive() {
        this.keepAliveIntervalRef = setInterval(() => {
            if (this.connected) {
                this.sendAction({
                    Action: AMIActionTypes.Ping,
                }).then((result) => {
                    this.options.logger?.debug(result)
                })
            }
        }, this.options.pingInterval || DEFAULT_PING_INTERVAL)
    }
}
