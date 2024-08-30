import {
    AMIActiveCountEvent,
    AMIAgentCompleteEvent,
    AMIBridgeCreateEvent,
    AMIBridgeDestroyEvent,
    AMICdrEvent,
    AMIDeviceStateChangeEvent,
    AMIDialEndEvent,
    AMIEvent,
    AMIExtensionStatusEvent,
    AMIHangupEvent,
    AMIHangupRequestEvent,
    AMIMusicOnHoldStopEvent,
    AMINewCalleridEvent,
    AMINewchannelEvent,
    AMINewConnectedLineEvent,
    AMIQueueCallerHangupEvent,
    AMIQueueMemberPauseEvent,
    AMIQueueMemberStatusEvent,
    AMIQueueStatusEvent,
    AMIQueueVqCallersEvent,
    AMISoftHangupRequestEvent,
} from './types/ami.events'

export type AMIEventsDefinition = {
    ['*']: [AMIEvent]
    ['onQueueMemberStatus']: [AMIQueueMemberStatusEvent]
    ['onDeviceStateChange']: [AMIDeviceStateChangeEvent]
    ['onExtensionStatus']: [AMIExtensionStatusEvent]
    ['onQueueStatus']: [AMIQueueStatusEvent]
    ['onQueueMemberPause']: [AMIQueueMemberPauseEvent]
    ['onCdr']: [AMICdrEvent]
    ['onHangupRequest']: [AMIHangupRequestEvent]
    ['onHangup']: [AMIHangupEvent]
    ['onSoftHangupRequest']: [AMISoftHangupRequestEvent]
    ['onActiveCount']: [AMIActiveCountEvent]
    ['onDialEnd']: [AMIDialEndEvent]
    ['onNewConnectedLine']: [AMINewConnectedLineEvent]
    ['onNewCallerid']: [AMINewCalleridEvent]
    ['onNewchannel']: [AMINewchannelEvent]
    ['onQueueVqCallers']: [AMIQueueVqCallersEvent]
    ['onBridgeCreate']: [AMIBridgeCreateEvent]
    ['onBridgeDestroy']: [AMIBridgeDestroyEvent]
    ['onQueueCallerHangup']: [AMIQueueCallerHangupEvent]
    ['onAgentComplete']: [AMIAgentCompleteEvent]
    ['onMusicOnHoldStop']: [AMIMusicOnHoldStopEvent]
}
