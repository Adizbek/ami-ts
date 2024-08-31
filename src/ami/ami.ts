import {
    AMIActionTypes,
    AMICoreSettingsResult,
    AMICoreShowChannelsCompleteResult,
    AMICoreStatusResult,
    AMIOptions,
    AMIPJSIPShowEndpointsCompleteResult,
    AMIQueuePauseResult,
    AMIQueuesCompleteResult,
    AMIQueueStatusCompleteResult,
    AMIQueueSummaryCompleteResult,
    AMISipPeersCompleteResult,
} from '../types'
import { AMIConnection } from './ami-connection'

export class AMI extends AMIConnection {
    constructor(options: AMIOptions) {
        super(options)
    }

    actionQueues() {
        return this.sendAction<AMIQueuesCompleteResult>({
            Action: AMIActionTypes.Queues,
        })
    }

    actionQueueSummary(queue?: string) {
        return this.sendAction<AMIQueueSummaryCompleteResult[]>({
            Action: AMIActionTypes.QueueSummary,
            Queue: queue,
        })
    }

    actionQueueStatus(queue?: string, member?: string) {
        return this.sendAction<AMIQueueStatusCompleteResult>({
            Action: AMIActionTypes.QueueStatus,
            Queue: queue,
            Member: member,
        })
    }

    actionPJSIPShowEndpoints() {
        return this.sendAction<AMIPJSIPShowEndpointsCompleteResult>({
            Action: AMIActionTypes.PJSIPShowEndpoints,
        })
    }

    actionCoreShowChannels() {
        return this.sendAction<AMICoreShowChannelsCompleteResult>({
            Action: AMIActionTypes.CoreShowChannels,
        })
    }

    /**
     * Makes a queue member temporarily unavailable. (Requires Privileges: agent,all)
     * @param extension The name of the interface (extension) to pause or unpause.
     * @param paused Pause or unpause the interface. Set to 'true' to pause the member or 'false' to unpause.
     * @param queue The name of the queue in which to pause or unpause this member. If not specified, the member will be paused or unpaused in all the queues it is a member of.
     * @param reason Text description, returned in the event QueueMemberPaused.
     */
    actionQueuePause(
        extension: string,
        paused: boolean,
        queue?: string,
        reason?: string
    ) {
        return this.sendAction<AMIQueuePauseResult>({
            Action: AMIActionTypes.QueuePause,
            Interface: extension,
            Paused: paused ? 'true' : 'false',
            Queue: queue,
            Reason: reason,
        })
    }

    actionSIPPeers() {
        return this.sendAction<AMISipPeersCompleteResult>({
            Action: AMIActionTypes.SIPPeers,
        })
    }

    actionCoreSettings() {
        return this.sendAction<AMICoreSettingsResult>({
            Action: AMIActionTypes.CoreSettings,
        })
    }

    actionCoreStatus() {
        return this.sendAction<AMICoreStatusResult>({
            Action: AMIActionTypes.CoreStatus,
        })
    }
}
