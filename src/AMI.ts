import Net from 'net'
import EventEmitter from 'node:events'
import AMIDataReader, { AMIDataReaderEvents } from './AMIDataReader'
import AMIDelayedResultCollector, {
    AMIDelayedResultCollectorEvents,
} from './AMIDelayedResultCollector'
import {
    AMIAction,
    AMIActionTypes,
    AMILoginResult,
    AMIOptions,
    AMIPJSIPShowEndpointsCompleteResult,
    AMIQueuePauseResult,
    AMIQueuesCompleteResult,
    AMIQueueStatusCompleteResult,
    AMIQueueSummaryCompleteResult,
} from './types'
import { AMICoreShowChannelsCompleteResult } from './types/action.core-show-channels'
import { AMIQueuePauseAction } from './types/action.queue-pause'

export * from './types'

const DEFAULT_RECONNECT_INTERVAL = 5000
const DEFAULT_READ_TIMEOUT = 30000

export default class AMI {
    private connection?: Net.Socket
    private connected = false
    private authenticated = false
    private emitter = new EventEmitter()
    private actionId = 1

    private keepAliveIntervalRef?: NodeJS.Timeout
    private shouldReconnect = true
    private readonly _reconnectInterval: number

    constructor(private readonly options: AMIOptions) {
        const defaultConfig: Partial<AMIOptions> = {
            keepAlive: true,
            reconnect: true,
            listenEvents: true,
            reconnectInterval: 5000,
            readTimeout: 30000,
        }

        this.options = Object.assign(defaultConfig, this.options)
        this._reconnectInterval =
            this.options.reconnectInterval &&
            Number.isInteger(this.options.reconnectInterval)
                ? this.options.reconnectInterval
                : DEFAULT_RECONNECT_INTERVAL
    }

    async connect() {
        const delayedResultCollector = new AMIDelayedResultCollector().on(
            AMIDelayedResultCollectorEvents.ActionResult,
            (actionID, payload) => {
                this.emitter.emit(`result_${actionID}`, payload)
            }
        )

        const dataReader = new AMIDataReader({
            logger: this.options.logger,
        }).on(AMIDataReaderEvents.Result, (result) =>
            delayedResultCollector.collect(result)
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

    disconnect() {
        this.shouldReconnect = false
        this.connection?.destroy()
    }

    reconnect() {
        if (this.shouldReconnect && this.options.reconnect) {
            setTimeout(() => {
                this.options.logger?.log('reconnect')
                this.connect()
            }, this._reconnectInterval)
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
            this.emitter.once(`result_${currentActionID}`, (result) =>
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

    actionQueues() {
        return this.sendAction<AMIQueuesCompleteResult>({
            Action: AMIActionTypes.Queues,
        })
    }

    actionQueueSummary(queue?: string) {
        return this.sendAction<AMIQueueSummaryCompleteResult[]>({
            Action: AMIActionTypes.QueueSummary,
            Queue: queue,
        })
    }

    actionQueueStatus(queue?: string, member?: string) {
        return this.sendAction<AMIQueueStatusCompleteResult>({
            Action: AMIActionTypes.QueueStatus,
            Queue: queue,
            Member: member,
        })
    }

    actionPJSIPShowEndpoints() {
        return this.sendAction<AMIPJSIPShowEndpointsCompleteResult>({
            Action: AMIActionTypes.PJSIPShowEndpoints,
        })
    }

    actionCoreShowChannels() {
        return this.sendAction<AMICoreShowChannelsCompleteResult>({
            Action: AMIActionTypes.CoreShowChannels,
        })
    }

    /**
     * Makes a queue member temporarily unavailable. (Requires Privileges: agent,all)
     * @param extension The name of the interface (extension) to pause or unpause.
     * @param paused Pause or unpause the interface. Set to 'true' to pause the member or 'false' to unpause.
     * @param queue The name of the queue in which to pause or unpause this member. If not specified, the member will be paused or unpaused in all the queues it is a member of.
     * @param reason Text description, returned in the event QueueMemberPaused.
     */
    actionQueuePause(
        extension: string,
        paused: boolean,
        queue?: string,
        reason?: string
    ) {
        return this.sendAction<AMIQueuePauseResult>({
            Action: AMIActionTypes.QueuePause,
            Interface: extension,
            Paused: paused ? 'true' : 'false',
            Queue: queue,
            Reason: reason,
        })
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
        }, 1000)
    }
}
