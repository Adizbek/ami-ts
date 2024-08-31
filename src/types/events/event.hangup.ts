import { AMIBoolean } from './index'
import { AMIChannelState } from './enum.channel-state'
import { AMIChannelStateDescription } from './enum.channel-state-description'
import { AMIHangupCause } from './enum.hangup-cause'
import { AMIEvents } from './enum.events'

export interface AMIHangupEvent {
    Event: AMIEvents.Hangup
    Privilege: string // Privilege level required to receive the event
    Channel: string // The originating channel of the call
    ChannelState: AMIChannelState // Numeric code representing the current state of the channel
    ChannelStateDesc: AMIChannelStateDescription // Description of the current state of the channel
    CallerIDNum: string // The Caller ID number of the calling party
    CallerIDName: string // The Caller ID name of the calling party
    ConnectedLineNum: string // The number of the connected line
    ConnectedLineName: string // The name of the connected line
    Language: string // Language code used in the call
    AccountCode: string // Account code associated with the call, used for billing or tracking
    Context: string // The dial plan context in which the hangup occurred
    Exten: string // The extension involved in the hangup
    Priority: string // The priority of the dial plan entry being executed
    Callid: string // A unique identifier for the call
    Linkedid: string // The unique ID of the linked call, used to track call legs
    PageFlag: AMIBoolean // Indicates whether the call was part of a paging operation
    Application: string // The application that was executing when the hangup occurred
    Reg_calleenum: string // The registered caller number (if applicable)
    Reg_callernum: string // The registered caller number (if applicable)
    Reg_callername: string // The registered caller name (if applicable)
    Uniqueid: string // A unique identifier for the call, often used for tracking and logging
    Cause: AMIHangupCause // The numeric cause code indicating why the call was hung up
    'Cause-txt': string // Text description of the hangup cause
}