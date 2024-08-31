import { AMIQueueMemberStatus } from '../actions'

import { AMIEvents } from './enum.events'

export interface AMIQueueMemberPauseEvent {
    Event: AMIEvents.QueueMemberPause // Event type, indicating a queue member has been paused
    Privilege: string // Privileges required for the event, usually indicating access level
    Queue: string // The identifier of the queue, e.g., '6500'
    LastCall: string // Timestamp of the last call the member participated in
    MemberName: string // Name of the member, typically the interface name
    EnableAgentLogin: 'yes' | 'no' // Indicates if agent login is enabled
    Interface: string // The specific channel or device interface, e.g., 'PJSIP/173'
    LoginTime: string // Timestamp of when the member logged in; '0' if not logged in
    TalkTime: string // Total time spent talking, in seconds
    StateInterface: string // The interface used to track the member's state
    Penalty: string // The penalty assigned to the member, affecting call distribution priority
    Membership: 'static' | 'dynamic' // Membership type of the member in the queue
    Paused: '1' | '0' // Indicates whether the member is paused ('1' for paused, '0' for not paused)
    CallerChannel: string // The current channel of the caller interacting with the queue
    CallsTaken: string // The total number of calls the member has taken
    Status: AMIQueueMemberStatus // The current status of the member (e.g., '1' for available)
    CallsAbandon: string // The total number of calls abandoned by the member
    PausedTime: string // Timestamp of when the member was paused
    Ringinuse: '1' | '0' // Indicates if the member can be rung when already in use ('0' for no, '1' for yes)
}
