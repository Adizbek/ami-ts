import { AMIBridgeType } from './enum.bridge-type'
import { AMIBridgeTechnology } from './enum.bridge-technology'
import { AMIEvents } from './enum.events'

export interface AMIBridgeCreateEvent {
    Event: AMIEvents.BridgeCreate // The type of event, e.g., 'BridgeCreate'
    Privilege: 'call,all' // Privilege level required to receive the event
    BridgeUniqueid: string // A unique identifier for the bridge, UUID format
    BridgeType: AMIBridgeType // The type of the bridge, indicating its functionality
    BridgeTechnology: AMIBridgeTechnology // The technology used for the bridge
    BridgeCreator: string // The creator of the bridge, usually the application or entity that initiated it
    BridgeName: string // The name of the bridge, which may be set by the creator
    BridgeNumChannels: string // The number of channels currently in the bridge
}
