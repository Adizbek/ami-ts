import { AMIQueueStatusAction } from './action.queue-status'
import { AMIQueueSummaryAction } from './action.queue-summary'

export enum AMIActionTypes {
    Login = 'Login',
    Ping = 'Ping',
    QueueSummary = 'QueueSummary',
    QueueStatus = 'QueueStatus',
    CoreShowChannels = 'CoreShowChannels',
}

interface AMILoginAction {
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

interface AMIPingAction {
    Action: AMIActionTypes.Ping
}

interface AMICoreShowChannelsAction {
    Action: AMIActionTypes.CoreShowChannels
}

export type AMIAction =
    | AMILoginAction
    | AMIPingAction
    | AMIQueueSummaryAction
    | AMIQueueStatusAction
    | AMICoreShowChannelsAction
