import { AMICoreShowChannelsAction } from './action.core-show-channels'
import { AMILoginAction } from './action.login'
import { AMIPJSIPShowEndpointsAction } from './action.pjsip-show-endpoints'
import { AMIQueueStatusAction } from './action.queue-status'
import { AMIQueueSummaryAction } from './action.queue-summary'
import { AMIQueuesAction } from './action.queues'

export enum AMIActionTypes {
    Login = 'Login',
    Ping = 'Ping',
    Queues = 'Queues',
    QueueSummary = 'QueueSummary',
    QueueStatus = 'QueueStatus',
    CoreShowChannels = 'CoreShowChannels',
    PJSIPShowEndpoints = 'PJSIPShowEndpoints',
}

interface AMIPingAction {
    Action: AMIActionTypes.Ping
}

export type AMIAction =
    | AMILoginAction
    | AMIPingAction
    | AMIQueuesAction
    | AMIQueueSummaryAction
    | AMIQueueStatusAction
    | AMICoreShowChannelsAction
    | AMIPJSIPShowEndpointsAction
