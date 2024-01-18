import { AMIQueueMemberStatus } from './action.queue-status'
import { AMIActionTypes } from './actions'

export interface AMIQueuesAction {
    Action: AMIActionTypes.Queues
}

export interface AMIQueuesQueueMemberStatusInfo {
    Event: 'QueueMemberStatus'
    ActionID: string
    Queue: string
    Location: string
    MemberName: string
    Membership: 'static' | 'dynamic'
    Penalty: string
    CallsTaken: string
    LastCall: string
    Status: AMIQueueMemberStatus
    EnableAgentLogin: string
    LoginTime: string
    CallsAbandon: string
    TalkTime: string
    PausedTime: string
    Paused: string
}

export enum AMIQueueCallStrategy {
    LeastRecent = 'leastrecent',
    FewestCalls = 'fewestcalls',
    Random = 'random',
    RingAll = 'ringall',
    RoundRobin = 'roundrobin',
    RRMemory = 'rrmemory',
}

export interface AMIQueuesQueueStatusStatus {
    Event: 'QueueStatus'
    ActionID: string
    Queue: string

    /**
     * @property
     * The number of calls currently waiting in the queue.
     */
    CallsTotal: string
    CallCount: string
    CallsComplete: string
    CallsAbandoned: string
    Strategy: AMIQueueCallStrategy
    EnableAgentLogin: string
    QueueName: string
    SeviceLevel: string
    AbandonedRate: string
    AvgWaitTime: string
    AvgTalkTime: string
    AvailableCount: string
    AgentCount: string
}

export type AMIQueuesCompleteResult = (
    | AMIQueuesQueueMemberStatusInfo
    | AMIQueuesQueueStatusStatus
)[]
