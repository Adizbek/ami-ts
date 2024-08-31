import { AMIBoolean } from './index'
import { AMIChannelState } from './enum.channel-state'
import { AMIChannelStateDescription } from './enum.channel-state-description'
import { AMIEvents } from './enum.events'

export interface AMINewchannelEvent {
    Event: AMIEvents.Newchannel // The type of event, e.g., 'Newchannel'
    Privilege: 'call,all' // Privilege level required to receive the event
    Channel: string // The specific channel related to the call
    ChannelState: AMIChannelState // Numeric value representing the channel's current state
    ChannelStateDesc: AMIChannelStateDescription // Textual description of the channel's current state
    CallerIDNum: string // The phone number of the caller, if available
    CallerIDName: string // The name of the caller, if available
    ConnectedLineNum: string // The phone number of the connected line (destination)
    ConnectedLineName: string // The name associated with the connected line
    Language: string // The language setting for the call (e.g., 'en' for English)
    AccountCode: string // Account code associated with the call, if any
    Context: string // The dial plan context associated with the call
    Exten: string // The extension number associated with the call
    Priority: string // The priority of the call within the dial plan
    Callid: string // A unique identifier for the call, if available
    Linkedid: string // The linked identifier for the call, used for tracking call legs
    PageFlag: AMIBoolean // Indicates if the call is related to a paging operation (true/false)
    Application: string // The application currently executing on the channel, if any
    Reg_calleenum: string // The registered number of the callee, if available
    Reg_callernum: string // The registered number of the caller, if available
    Reg_callername: string // The registered name of the caller, if available
    Uniqueid: string // A unique identifier for the channel, typically used for tracking
}
