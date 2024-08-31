import { AMIBoolean } from './index'
import { AMIChannelState } from './enum.channel-state'
import { AMIChannelStateDescription } from './enum.channel-state-description'
import { AMIBridgeType } from './enum.bridge-type'
import { AMIBridgeTechnology } from './enum.bridge-technology'
import { AMIEvents } from './enum.events'

export interface AMIBridgeEnterEvent {
    Event: AMIEvents.BridgeEnter // The type of event, e.g., 'BridgeEnter'
    Privilege: 'call,all' // Privilege level required to receive the event
    BridgeUniqueid: string // A unique identifier for the bridge
    BridgeType: AMIBridgeType // The type of the bridge, indicating its functionality
    BridgeTechnology: AMIBridgeTechnology // The technology used for the bridge
    BridgeCreator: string // The creator of the bridge, usually the application or entity that initiated it
    BridgeName: string // The name of the bridge, which may be set by the creator
    BridgeNumChannels: string // The number of channels currently in the bridge
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
}
