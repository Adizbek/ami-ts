import { AMIBoolean } from './index'
import { AMIChannelState } from './enum.channel-state'
import { AMIChannelStateDescription } from './enum.channel-state-description'
import { AMIEvents } from './enum.events'

export interface AMIDialBeginEvent {
    Event: AMIEvents.DialBegin // The type of event, e.g., 'DialBegin'
    Privilege: 'call,all' // Privilege level required to receive the event
    Channel: string // The originating channel of the call
    ChannelState: AMIChannelState // Numeric code representing the current state of the originating channel
    ChannelStateDesc: AMIChannelStateDescription // Description of the current state of the originating channel
    CallerIDNum: string // Caller ID number of the originating party
    CallerIDName: string // Caller ID name of the originating party
    ConnectedLineNum: string // Number of the line connected to the originating channel
    ConnectedLineName: string // Name of the line connected to the originating channel
    Language: string // Language code used for the originating channel
    AccountCode: string // Account code associated with the originating channel, used for billing or tracking
    Context: string // Dial plan context in which the originating channel is being handled
    Exten: string // Extension involved in the originating channel
    Priority: string // Priority of the dial plan entry being executed on the originating channel
    Callid: string // Unique identifier for the originating call
    Linkedid: string // Unique ID of the oldest linked channel, used to track call legs
    PageFlag: AMIBoolean // Indicates whether the call was part of a paging operation
    Application: string // The application that was executing on the originating channel
    Reg_calleenum: string // Registered callee number, if applicable
    Reg_callernum: string // Registered caller number, if applicable
    Reg_callername: string // Registered caller name, if applicable
    Uniqueid: string // Unique identifier for the originating channel
    DestChannel: string // The destination channel of the dial operation
    DestChannelState: AMIChannelState // Numeric code representing the current state of the destination channel
    DestChannelStateDesc: AMIChannelStateDescription // Description of the current state of the destination channel
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
    DialString: string // The dial string used for the dial operation
}
