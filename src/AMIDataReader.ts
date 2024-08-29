import TypedEventEmitter from './utils/TypedEventEmitter'

export enum AMIDataReaderEvents {
    Welcome = 'welcome',
    Result = 'result',
}

export interface AMIDataReaderAsyncResult {
    ActionID: string
    EventList: 'start'
    Response: 'Success' | 'Error'
    Message?: 'Queue summary will follow'
}

export interface AMIDataReaderSyncResult {
    [key: string]: string
}

export type AMIDataReaderResult =
    | AMIDataReaderAsyncResult
    | AMIDataReaderSyncResult

export type AMIDataReaderEventsDefinition = {
    [AMIDataReaderEvents.Welcome]: []
    [AMIDataReaderEvents.Result]: [arg1: AMIDataReaderResult]
    // 'event-2': [arg1: number, arg2: string]
}

export interface AMIDataReaderOptions {
    logger?: Console
}

export default class AMIDataReader extends TypedEventEmitter<AMIDataReaderEventsDefinition> {
    resultHolder: Record<string, string> = {}
    _buffer: string = ''

    constructor(private readonly options: AMIDataReaderOptions = {}) {
        super()
    }

    onNewData(data: Buffer) {
        this.options.logger?.log('New data -->')
        this.options.logger?.log(
            JSON.parse(JSON.stringify({ msg: data.toString() }))
        )

        let contents = data.toString()
        // if we have something in buffer, prepend it to payload
        if (this._buffer) {
            contents = this._buffer + contents
            this._buffer = ''
        }

        const payload = contents.split('\r\n')
        let emptyLines = 0

        for (let i = 0; i < payload.length; i++) {
            const line = payload[i]

            if (line.substring(0, 21) === 'Asterisk Call Manager') {
                this.emit(AMIDataReaderEvents.Welcome)
            } else if (line === '') {
                emptyLines++
            } else if (i + 1 !== payload.length) {
                // if i is not the last index, new property is starting. If not, it's a continuation of previous property
                emptyLines = 0

                const splitAt = line.indexOf(': ')
                const key = line.substring(0, splitAt)
                const value = line.substring(splitAt + 2)

                if (key) {
                    this.resultHolder[key] = value
                }
            } else {
                this._buffer = line
            }

            // end of command is
            // when we have two empty lines in a row
            if (emptyLines === 1 && i + 1 < payload.length) {
                if (Object.keys(this.resultHolder).length > 0) {
                    this.emit(AMIDataReaderEvents.Result, {
                        ...this.resultHolder,
                    })
                    this.resultHolder = {}
                }
            } else if (emptyLines > 1) {
                // ignore empty lines
            }
        }
    }
}
