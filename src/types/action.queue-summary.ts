import { AMIActionTypes } from './actions'

export interface AMIQueueSummaryAction {
    Action: AMIActionTypes.QueueSummary
    Queue?: string
}

export interface AMIQueueSummaryCompleteResult {
    Event: AMIActionTypes.QueueSummary

    /**
     * The name of queue.
     */
    Queue: string

    /**
     * The number of members logged in.
     */
    LoggedIn: string

    /**
     * The number of members logged in and not in a call.
     */
    Available: string

    /**
     * The number of callers currently waiting in the queue.
     */
    Callers: string

    /**
     * The current average hold time for this queue based on an exponential average.
     */
    HoldTime: string

    /**
     * The current average talk time for this queue based on an exponential average.
     */
    TalkTime: string

    /**
     * The longest hold time of the queue entry currently in the queue.
     */
    LongestHoldTime: string

    ActionID: string
}
