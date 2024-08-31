import { AMIBoolean } from './index'
import { AMIChannelState } from './enum.channel-state'
import { AMIChannelStateDescription } from './enum.channel-state-description'
import { AMIEvents } from './enum.events'

export interface AMIQueueCallerLeaveEvent {
    Event: AMIEvents.QueueCallerLeave // The type of event, e.g., 'QueueCallerLeave'
    Privilege: 'agent,all' // Privilege level required to receive the event
    Channel: string // The channel associated with the event
    ChannelState: AMIChannelState // Numeric code representing the current state of the channel
    ChannelStateDesc: AMIChannelStateDescription // Description of the current state of the channel
    CallerIDNum: string // Caller ID number of the calling party
    CallerIDName: string // Caller ID name of the calling party, if available
    ConnectedLineNum: string // Number of the line that the caller is connected to
    ConnectedLineName: string // Name of the line that the caller is connected to, if available
    Language: string // Language code used in the call
    AccountCode: string // Account code associated with the call, used for billing or tracking
    Context: string // The dial plan context in which the call is being handled
    Exten: string // Extension involved in the call
    Priority: string // Priority of the dial plan entry being executed
    Callid: string // A unique identifier for the call
    Linkedid: string // Unique ID of the oldest linked channel, used to track call legs
    PageFlag: AMIBoolean // Indicates whether the call was part of a paging operation
    Application: string // The application that was executing when the event occurred
    Reg_calleenum: string // Registered callee number, if applicable
    Reg_callernum: string // Registered caller number, if applicable
    Reg_callername: string // Registered caller name, if applicable
    Uniqueid: string // Unique identifier for the call, used for tracking and logging
    Queue: string // The name or identifier of the queue involved in the event
    CalleeIDNum: string // The number of the agent or destination that the caller was attempting to reach
    Position: string // The position of the caller in the queue at the time of leaving
    Dynamic: '0' | '1' // Indicates if the queue member is dynamic (0 for no, 1 for yes)
    Count: string // The number of callers currently in the queue
    PeerChannel: string // The peer channel associated with the call
    LeaveTime: string // The Unix timestamp indicating when the caller left the queue
}