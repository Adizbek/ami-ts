import { AMIActionTypes } from './index'

export interface AMILoginAction {
    Action: AMIActionTypes.Login
    Username: string
    Secret: string
    // if on - AMI will send events, if off - AMI will not send events
    Events?: 'ON' | 'OFF'
}

export interface AMILoginResult {
    Response: 'Success' | 'Error'
    Message: string
    ActionID: string
}
