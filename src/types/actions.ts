import { AMICoreSettingsAction } from './action.core-settings'
import { AMICoreShowChannelsAction } from './action.core-show-channels'
import { AMICoreStatusAction } from './action.core-status'
import { AMILoginAction } from './action.login'
import { AMIPJSIPShowEndpointsAction } from './action.pjsip-show-endpoints'
import { AMIQueuePauseAction } from './action.queue-pause'
import { AMIQueueStatusAction } from './action.queue-status'
import { AMIQueueSummaryAction } from './action.queue-summary'
import { AMIQueuesAction } from './action.queues'
import { AMISipPeersAction } from './action.sip-peers'

export enum AMIActionTypes {
    Login = 'Login',
    Ping = 'Ping',
    Queues = 'Queues',
    QueueSummary = 'QueueSummary',
    QueueStatus = 'QueueStatus',
    CoreShowChannels = 'CoreShowChannels',
    PJSIPShowEndpoints = 'PJSIPShowEndpoints',
    QueuePause = 'QueuePause',
    SIPPeers = 'SIPpeers',
    CoreSettings = 'CoreSettings',
    CoreStatus = 'CoreStatus',
}

interface AMIPingAction {
    Action: AMIActionTypes.Ping
}

interface ArbitraryAction extends Record<string, unknown> {
    Action: string
}

export type AMIAction =
    | AMILoginAction
    | AMIPingAction
    | AMIQueuesAction
    | AMIQueueSummaryAction
    | AMIQueueStatusAction
    | AMIQueuePauseAction
    | AMICoreSettingsAction
    | AMICoreStatusAction
    | AMISipPeersAction
    | AMICoreShowChannelsAction
    | AMIPJSIPShowEndpointsAction
    | ArbitraryAction
