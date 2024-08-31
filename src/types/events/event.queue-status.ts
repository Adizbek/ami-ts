import { AMIQueueCallStrategy } from '../actions'

import { AMIEvents } from './enum.events'

export interface AMIQueueStatusEvent {
    Event: AMIEvents.QueueStatus
    Privilege: string // Privileges required for the event, usually indicating access level
    Queue: string // The identifier of the queue, e.g., '6500'
    CallsTotal: string // Total number of calls received by the queue
    CallCount: string // Current number of active calls in the queue
    CallsComplete: string // Total number of calls that were successfully completed
    CallsAbandoned: string // Total number of calls that were abandoned
    ServiceLevel: string // Service level metric showing percentage of calls answered within a specific time, e.g., SL:0.0% within 0s
    Strategy: AMIQueueCallStrategy // The call distribution strategy used, e.g., 'ringall'
    Chairman: string // Name of the chairman, usually empty if not set
    EnableAgentLogin: 'yes' | 'no' // Indicates if agent login is enabled, values are 'yes' or 'no'
    QueueName: string // The human-readable name of the queue
    AbandonedRate: string // Percentage rate of abandoned calls in the queue, e.g., '25.81%'
    AvgWaitTime: string // Average waiting time for callers in the queue, in seconds
    AvgTalkTime: string // Average talk time per call in the queue, in seconds
    AvailableCount: string // Number of agents currently available to take calls
    AgentCount: string // Total number of agents assigned to the queue
}
