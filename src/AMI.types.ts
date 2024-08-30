import {
    AMIActiveCountEvent,
    AMIAgentCalledEvent,
    AMIAgentCompleteEvent,
    AMIAgentConnectEvent,
    AMIAgentRingNoAnswerEvent,
    AMIBridgeCreateEvent,
    AMIBridgeDestroyEvent,
    AMIBridgeEnterEvent,
    AMIBridgeLeaveEvent,
    AMICdrEvent,
    AMIDeviceStateChangeEvent,
    AMIDialBeginEvent,
    AMIDialEndEvent,
    AMIDTMFBeginEvent,
    AMIDTMFEndEvent,
    AMIEvent,
    AMIExtensionStatusEvent,
    AMIHangupEvent,
    AMIHangupRequestEvent,
    AMIMusicOnHoldStartEvent,
    AMIMusicOnHoldStopEvent,
    AMINewCalleridEvent,
    AMINewchannelEvent,
    AMINewConnectedLineEvent,
    AMIQueueCallerHangupEvent,
    AMIQueueCallerJoinEvent,
    AMIQueueCallerLeaveEvent,
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
    ['onHangupRequest']: [AMIHangupRequestEvent]
    ['onExtensionStatus']: [AMIExtensionStatusEvent]
    ['onQueueStatus']: [AMIQueueStatusEvent]
    ['onQueueMemberPause']: [AMIQueueMemberPauseEvent]
    ['onCdr']: [AMICdrEvent]
    ['onHangup']: [AMIHangupEvent]
    ['onActiveCount']: [AMIActiveCountEvent]
    ['onSoftHangupRequest']: [AMISoftHangupRequestEvent]
    ['onDialBegin']: [AMIDialBeginEvent]
    ['onDialEnd']: [AMIDialEndEvent]
    ['onNewConnectedLine']: [AMINewConnectedLineEvent]
    ['onNewCallerid']: [AMINewCalleridEvent]
    ['onNewchannel']: [AMINewchannelEvent]
    ['onQueueVqCallers']: [AMIQueueVqCallersEvent]
    ['onBridgeCreate']: [AMIBridgeCreateEvent]
    ['onBridgeDestroy']: [AMIBridgeDestroyEvent]
    ['onBridgeEnter']: [AMIBridgeEnterEvent]
    ['onBridgeLeave']: [AMIBridgeLeaveEvent]
    ['onQueueCallerJoin']: [AMIQueueCallerJoinEvent]
    ['onQueueCallerHangup']: [AMIQueueCallerHangupEvent]
    ['onQueueCallerLeave']: [AMIQueueCallerLeaveEvent]
    ['onAgentConnect']: [AMIAgentConnectEvent]
    ['onAgentCalled']: [AMIAgentCalledEvent]
    ['onAgentComplete']: [AMIAgentCompleteEvent]
    ['onAgentRingNoAnswer']: [AMIAgentRingNoAnswerEvent]
    ['onMusicOnHoldStart']: [AMIMusicOnHoldStartEvent]
    ['onMusicOnHoldStop']: [AMIMusicOnHoldStopEvent]
    ['onDTMFBegin']: [AMIDTMFBeginEvent]
    ['onDTMFEnd']: [AMIDTMFEndEvent]
}
