import {
    AMIDataReaderResult,
    AMIResultCollectorDefinition,
    AMIResultCollectorEvents,
    AMIResultCollectorOptions,
} from '../types'
import TypedEventEmitter from '../utils/TypedEventEmitter'

export class AMIResultCollector extends TypedEventEmitter<AMIResultCollectorDefinition> {
    private collectorBuffer: Record<string, AMIDataReaderResult[]> = {}

    constructor(private readonly options: AMIResultCollectorOptions = {}) {
        super()
    }

    collect(result: AMIDataReaderResult) {
        if ('ActionID' in result && result.ActionID) {
            if (result.EventList === 'start') {
                // if buffering started
                this.collectorBuffer[result.ActionID] = []
            } else if (result.EventList === 'Complete') {
                // if buffering completed
                const finalResult = this.collectorBuffer[result.ActionID]
                delete this.collectorBuffer[result.ActionID]

                this.emit(
                    AMIResultCollectorEvents.ActionResult,
                    result.ActionID,
                    finalResult
                )
            } else if (this.collectorBuffer[result.ActionID]) {
                // if buffering in progress
                this.collectorBuffer[result.ActionID].push(result)
            } else {
                // if no need for buffering, just emit result
                this.emit(
                    AMIResultCollectorEvents.ActionResult,
                    result.ActionID,
                    result
                )
            }
        } else if ('Event' in result && result.Event) {
            this.emit(AMIResultCollectorEvents.Event, result)
        } else {
            this.options.logger?.log('Unknown result: ', result)
        }
    }
}
