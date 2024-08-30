import { AMIDataReaderResult } from './AMIDataReader'
import { AMIEvent } from './types/ami.events'
import TypedEventEmitter from './utils/TypedEventEmitter'

export enum AMIDelayedResultCollectorEvents {
    ActionResult = 'actionResult',
    Event = 'event',
}

type ActionResult = AMIDataReaderResult | AMIDataReaderResult[]

export type AMIDelayedResultCollectorDefinition = {
    [AMIDelayedResultCollectorEvents.ActionResult]: [
        actionID: string,
        result: ActionResult,
    ]

    [AMIDelayedResultCollectorEvents.Event]: [AMIEvent]
}

export interface AMIDelayedResultCollectorOptions {
    logger?: Console
}

export default class AMIDelayedResultCollector extends TypedEventEmitter<AMIDelayedResultCollectorDefinition> {
    private collectorBuffer: Record<string, AMIDataReaderResult[]> = {}

    constructor(
        private readonly options: AMIDelayedResultCollectorOptions = {}
    ) {
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
                    AMIDelayedResultCollectorEvents.ActionResult,
                    result.ActionID,
                    finalResult
                )
            } else if (this.collectorBuffer[result.ActionID]) {
                // if buffering in progress
                this.collectorBuffer[result.ActionID].push(result)
            } else {
                // if no need for buffering, just emit result
                this.emit(
                    AMIDelayedResultCollectorEvents.ActionResult,
                    result.ActionID,
                    result
                )
            }
        } else if ('Event' in result && result.Event) {
            this.emit(AMIDelayedResultCollectorEvents.Event, result)
        } else {
            this.options.logger?.log('Unknown result: ', result)
        }
    }
}
