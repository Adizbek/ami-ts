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
    RingAll = 'ringall', // Rings all available agents until one answers.
    LeastRecent = 'leastrecent', // Rings the agent who was least recently called.
    FewestCalls = 'fewestcalls', // Calls the agent with the fewest completed calls.
    Random = 'random', // Rings agents in a random order.
    RoundRobinMemory = 'rrmemory', // Round-robin with memory; remembers the last agent who answered.
    RoundRobinOrdered = 'rrordered', // Round-robin following a fixed order as listed.
    Linear = 'linear', // Rings agents in the order they are listed.
    WeightedRandom = 'wrandom', // Rings agents randomly based on assigned weights.
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
