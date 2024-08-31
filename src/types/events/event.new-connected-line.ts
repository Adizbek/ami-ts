import { AMIBoolean } from './index'
import { AMIChannelState } from './enum.channel-state'
import { AMIChannelStateDescription } from './enum.channel-state-description'
import { AMIEvents } from './enum.events'

export interface AMINewConnectedLineEvent {
    Event: AMIEvents.NewConnectedLine // The type of event, e.g., 'NewConnectedLine'
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
}
