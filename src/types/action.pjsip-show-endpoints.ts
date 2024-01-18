import { AMIActionTypes } from './actions'

export interface AMIPJSIPShowEndpointsAction {
    Action: AMIActionTypes.PJSIPShowEndpoints
}

export interface AMIEndpointList {
    Event: 'EndpointList'
    ActionID: string

    ObjectName: string
    ObjectType: string
    Aor: string
    Auths: string
    OutboundAuths: string
    Contacts: string
    DeviceState: string
}

export type AMIPJSIPShowEndpointsCompleteResult = AMIEndpointList[]
