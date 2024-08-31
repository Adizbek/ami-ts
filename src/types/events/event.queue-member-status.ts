import { AMIQueueMemberStatus } from '../actions'

import { AMIEvents } from './enum.events'

export interface AMIQueueMemberStatusEvent {
    Event: AMIEvents.QueueMemberStatus
    Privilege: string // Privilege level required to receive the event
    Queue: string // Identifier of the queue
    LastCall: string // Unix timestamp of the last call handled
    MemberName: string // Name of the queue member (e.g., PJSIP endpoint)
    EnableAgentLogin: string // Indicates if agent login is enabled ('yes' or 'no')
    Interface: string // Interface or device the agent is connected to
    LoginTime: string // Unix timestamp of the agent's login time, default 0
    TalkTime: string // Total talk time in seconds for the agent
    StateInterface: string // Interface related to the agent’s state
    Penalty: string // Penalty level of the agent within the queue
    Membership: 'static' | 'dynamic' // Type of membership ('static' or 'dynamic')
    Paused: string // Whether the agent is paused (0 = no, 1 = yes)
    CallerChannel: string // Current channel associated with the caller
    CallsTaken: string // Total number of calls taken by the agent
    Status: AMIQueueMemberStatus // Current status of the agent
    CallsAbandon: string // Number of calls abandoned waiting for the agent
    PausedTime: string // Unix timestamp of when the agent last paused
    Ringinuse: string // Whether calls are sent to agents already on a call, 0 = no, 1 = yes
}
