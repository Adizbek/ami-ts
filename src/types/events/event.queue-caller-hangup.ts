import { AMIBoolean } from './index'
import { AMIChannelState } from './enum.channel-state'
import { AMIChannelStateDescription } from './enum.channel-state-description'
import { AMIEvents } from './enum.events'

export interface AMIQueueCallerHangupEvent {
    Event: AMIEvents.QueueCallerHangup // The type of event, e.g., 'QueueCallerHangup'
    Privilege: 'agent,all' // Privilege level required to receive the event
    Channel: string // The channel associated with the caller who hung up
    ChannelState: AMIChannelState // Numeric code representing the current state of the channel
    ChannelStateDesc: AMIChannelStateDescription // Description of the current state of the channel
    CallerIDNum: string // Caller ID number of the caller who hung up
    CallerIDName: string // Caller ID name of the caller who hung up, if available
    ConnectedLineNum: string // Number of the line that the caller was connected to, usually empty or default
    ConnectedLineName: string // Name of the line that the caller was connected to, usually empty or default
    Language: string // Language code used in the call
    AccountCode: string // Account code associated with the call, used for billing or tracking
    Context: string // The dial plan context in which the caller was handled
    Exten: string // The extension involved in the call
    Priority: string // Priority of the dial plan entry being executed
    Callid: string // A unique identifier for the call
    Linkedid: string // Unique ID of the oldest linked channel, used to track call legs
    PageFlag: AMIBoolean // Indicates whether the call was part of a paging operation
    Application: string // The application that was executing when the hangup occurred
    Reg_calleenum: string // Registered callee number, if applicable
    Reg_callernum: string // Registered caller number, if applicable
    Reg_callername: string // Registered caller name, if applicable
    Uniqueid: string // Unique identifier for the call, used for tracking and logging
    Queue: string // The name or identifier of the queue from which the caller hung up
    PeerChannel: string // The channel associated with the peer in the call, often the agent or another party
}
