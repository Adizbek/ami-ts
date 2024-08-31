import { AMIBoolean } from './index'
import { AMIChannelState } from './enum.channel-state'
import { AMIChannelStateDescription } from './enum.channel-state-description'
import { AMIEvents } from './enum.events'

export interface AMIAgentCompleteEvent {
    Event: AMIEvents.AgentComplete // The type of event, e.g., 'AgentComplete'
    Privilege: 'agent,all' // Privilege level required to receive the event
    Channel: string // The originating channel of the call
    ChannelState: AMIChannelState // Numeric code representing the current state of the originating channel
    ChannelStateDesc: AMIChannelStateDescription // Description of the current state of the originating channel
    CallerIDNum: string // Caller ID number of the originating party
    CallerIDName: string // Caller ID name of the originating party, if available
    ConnectedLineNum: string // Number of the line connected to the originating channel
    ConnectedLineName: string // Name of the line connected to the originating channel
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
    Uniqueid: string // Unique identifier for the originating channel
    DestChannel: string // The destination channel of the call
    DestChannelState: string // Numeric code representing the current state of the destination channel
    DestChannelStateDesc: string // Description of the current state of the destination channel
    DestCallerIDNum: string // Caller ID number of the destination party
    DestCallerIDName: string // Caller ID name of the destination party
    DestConnectedLineNum: string // Number of the line connected to the destination channel
    DestConnectedLineName: string // Name of the line connected to the destination channel
    DestLanguage: string // Language code used for the destination channel
    DestAccountCode: string // Account code associated with the destination channel
    DestContext: string // Dial plan context in which the destination channel is being handled
    DestExten: string // Extension involved in the destination channel
    DestPriority: string // Priority of the dial plan entry being executed on the destination channel
    DestCallid: string // Unique identifier for the destination call
    DestLinkedid: string // Unique ID of the oldest linked channel for the destination
    DestPageFlag: AMIBoolean // Indicates whether the destination call was part of a paging operation
    DestApplication: string // The application that was executing on the destination channel
    DestReg_calleenum: string // Registered callee number for the destination, if applicable
    DestReg_callernum: string // Registered caller number for the destination, if applicable
    DestReg_callername: string // Registered caller name for the destination, if applicable
    DestUniqueid: string // Unique identifier for the destination channel
    Queue: string // The name or identifier of the queue involved in the event
    TalkTime: string // The amount of time, in seconds, that the agent spent talking to the caller
    Interface: string // The interface (e.g., SIP channel) used by the agent
    HoldTime: string // The amount of time, in seconds, that the caller spent on hold before the call was answered
    MemberName: string // The name of the agent or member who answered the call
    Reason: 'caller' | 'agent' | 'transfer' // The reason for the event, such as 'agent' indicating the agent completed the call
}
