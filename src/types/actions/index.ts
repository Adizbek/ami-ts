import { AMIArbitraryAction } from './action.arbitary'
import { AMICoreSettingsAction } from './action.core-settings'
import { AMICoreShowChannelsAction } from './action.core-show-channels'
import { AMICoreStatusAction } from './action.core-status'
import { AMILoginAction } from './action.login'
import { AMIPingAction } from './action.ping'
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

export type AMIAction =
    | AMIArbitraryAction
    | AMICoreSettingsAction
    | AMICoreShowChannelsAction
    | AMICoreStatusAction
    | AMILoginAction
    | AMIPingAction
    | AMIPJSIPShowEndpointsAction
    | AMIQueuePauseAction
    | AMIQueueStatusAction
    | AMIQueueSummaryAction
    | AMIQueuesAction
    | AMISipPeersAction

// export all types from this file
export * from './action.arbitary'
export * from './action.core-settings'
export * from './action.core-show-channels'
export * from './action.core-status'
export * from './action.login'
export * from './action.ping'
export * from './action.pjsip-show-endpoints'
export * from './action.queue-pause'
export * from './action.queue-status'
export * from './action.queue-summary'
export * from './action.queues'
export * from './action.sip-peers'
