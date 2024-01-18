import { AMIActionTypes } from './actions'

export interface AMIQueueStatusAction {
    Action: AMIActionTypes.QueueStatus
    Queue?: string
    Member?: string
}

export interface AMIQueueStatusQueueParamsInfo {
    Event: 'QueueParams'

    /**
     * The name of the queue.
     */
    Queue: string

    /**
     * Maximum number of people waiting in the queue or 0 for unlimited.
     */
    Max: string

    /**
     * The strategy used for this queue.
     */
    Strategy: string

    /**
     * The number of calls currently waiting in the queue.
     */
    Calls: string

    /**
     * The current average holdtime for this queue (in seconds).
     */
    Holdtime: string

    /**
     * The current avarage talk time for this queue based on an exponential average.
     */
    TalkTime: string

    /**
     * The number of completed calls.
     */
    Completed: string

    /**
     * The number of abandoned calls.
     */
    Abandoned: string

    /**
     * The service level (in seconds) as defined by the servicelevel setting in queues.conf.
     */
    ServiceLevel: string

    /**
     * The ratio of calls answered within the specified service level per total completed calls (in percent).
     */
    ServicelevelPerf: string

    /**
     * The weight of this queue.
     */
    Weight: string

    ActionID: string
}

export enum AMIQueueMemberStatus {
    Unknown = '0',
    NotInUse = '1',
    InUse = '2',
    Busy = '3',
    Invalid = '4',
    Unavailable = '5',
    Ringing = '6',
    RingInUse = '7',
    OnHold = '8',
}

export interface AMIQueueStatusQueueMemberInfo {
    Event: 'QueueMember'

    /**
     * The name of the queue.
     */
    Queue: string

    /**
     * The name of the member supplied for logging when the member is added
     */
    Name: string

    /**
     * @deprecated
     * since Asterisk 12
     * Returns the name of the member's interface.
     * E.g. the channel name or agent group.
     *
     * The name of the member's interface.
     */
    Location: string

    /**
     * Name of the interface where device state is taken from.
     */
    StateInterface: string

    /**
     * membership - "dynamic" if the added member is a dynamic queue member, "static" if the added member is a static queue member.
     */
    Membership: 'dynamic' | 'static'

    /**
     * The penalty for the added member. When calls are distributed members with higher penalties are considered last.
     */
    Penalty: string

    /**
     * The number of calls answered by the added member.
     */
    CallsTaken: string

    /**
     * The time (in seconds since 01/01/1970) the last successful call answered by the added member was hungup.
     */
    LastCall: string

    /**
     * Returns the status of this queue member.
     * Available since Asterisk 1.2
     */
    Status: AMIQueueMemberStatus

    /**
     * Is this queue member paused (not accepting calls)?
     */
    Paused: '0' | '1'

    ActionID: string
}

export type AMIQueueStatusCompleteResult = (
    | AMIQueueStatusQueueParamsInfo
    | AMIQueueStatusQueueMemberInfo
)[]
