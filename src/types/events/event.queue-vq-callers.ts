import { AMIEvents } from './enum.events'

/**
 * The QueueVqCallers event is related to queue management in Asterisk,
 * particularly in the context of monitoring callers waiting in a queue.
 * This event provides details about callers who are currently in a queue,
 * including their position, channel information, and other related data.
 */
export interface AMIQueueVqCallersEvent {
    Event: AMIEvents.QueueVqCallers // The type of event, e.g., 'QueueVqCallers'
    Privilege: 'agent,all' // Privilege level required to receive the event
    Queue: string // The name or identifier of the queue
    Channel: string // The channel associated with the caller in the queue
    CallerId: string // Caller ID number of the caller in the queue
    CallerName: string // Caller ID name of the caller in the queue
    StartTime: string // Unix timestamp indicating when the caller entered the queue
    Position: string // The current position of the caller in the queue
}
