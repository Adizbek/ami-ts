import { AMIDTMFEndEvent } from './event.dtmf-end'
import { AMIDTMFBeginEvent } from './event.dtmf-begin'
import { AMIMusicOnHoldStopEvent } from './event.music-on-hold-stop'
import { AMIMusicOnHoldStartEvent } from './event.music-on-hold-start'
import { AMIAgentRingNoAnswerEvent } from './event.agent-ring-no-answer'
import { AMIAgentCompleteEvent } from './event.agent-complete'
import { AMIAgentCalledEvent } from './event.agent-called'
import { AMIAgentConnectEvent } from './event.agent-connect'
import { AMIQueueCallerHangupEvent } from './event.queue-caller-hangup'
import { AMIQueueCallerAbandonEvent } from './event.queue-caller-abandon'
import { AMIQueueCallerLeaveEvent } from './event.queue-caller-leave'
import { AMIQueueCallerJoinEvent } from './event.queue-caller-join'
import { AMIBridgeEnterEvent } from './event.bridge-enter'
import { AMIBridgeLeaveEvent } from './event.bridge-leave'
import { AMIBridgeDestroyEvent } from './event.bridge-destroy'
import { AMIBridgeCreateEvent } from './event.bridge-create'
import { AMIQueueVqCallersEvent } from './event.queue-vq-callers'
import { AMINewchannelEvent } from './event-new-channel'
import { AMINewCalleridEvent } from './event.new-callerid'
import { AMINewConnectedLineEvent } from './event.new-connected-line'
import { AMIDialEndEvent } from './event.dial-end'
import { AMIDialBeginEvent } from './event.dial-begin'
import { AMISoftHangupRequestEvent } from './event.soft-hangup-request'
import { AMIActiveCountEvent } from './event.active-count'
import { AMIHangupEvent } from './event.hangup'
import { AMICdrEvent } from './event.cdr'
import { AMIQueueMemberPauseEvent } from './event.queue-member-pause'
import { AMIQueueStatusEvent } from './event.queue-status'
import { AMIExtensionStatusEvent } from './event.extension-status'
import { AMIDeviceStateChangeEvent } from './event.device-state-change'
import { AMIQueueMemberStatusEvent } from './event.queue-member-status'
import { AMIHangupRequestEvent } from './event.hangup-request'

export type AMIBoolean = 'false' | 'true'

export type AMIEvent =
    | AMIQueueMemberStatusEvent
    | AMIDeviceStateChangeEvent
    | AMIExtensionStatusEvent
    | AMIQueueStatusEvent
    | AMIQueueMemberPauseEvent
    | AMICdrEvent
    | AMIHangupRequestEvent
    | AMIHangupEvent
    | AMISoftHangupRequestEvent
    | AMIActiveCountEvent
    | AMIDialBeginEvent
    | AMIDialEndEvent
    | AMINewConnectedLineEvent
    | AMINewCalleridEvent
    | AMINewchannelEvent
    | AMIQueueVqCallersEvent
    | AMIBridgeCreateEvent
    | AMIBridgeDestroyEvent
    | AMIBridgeEnterEvent
    | AMIBridgeLeaveEvent
    | AMIQueueCallerAbandonEvent
    | AMIQueueCallerLeaveEvent
    | AMIQueueCallerJoinEvent
    | AMIQueueCallerHangupEvent
    | AMIAgentCalledEvent
    | AMIAgentConnectEvent
    | AMIAgentCompleteEvent
    | AMIAgentRingNoAnswerEvent
    | AMIMusicOnHoldStartEvent
    | AMIMusicOnHoldStopEvent
    | AMIDTMFBeginEvent
    | AMIDTMFEndEvent

export type AMIEventMap = {
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
    ['onQueueCallerAbandon']: [AMIQueueCallerAbandonEvent]
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

export * from './enum.ama-flags'
export * from './enum.bridge-technology'
export * from './enum.bridge-type'
export * from './enum.cdr-disposition'
export * from './enum.channel-state'
export * from './enum.channel-state-description'
export * from './enum.device-state'
export * from './enum.dial-status'
export * from './enum.events'
export * from './enum.extension-status-code'
export * from './enum.extension-status-text'
export * from './enum.hangup-cause'

export * from './event.active-count'
export * from './event.agent-called'
export * from './event.agent-complete'
export * from './event.agent-connect'
export * from './event.agent-ring-no-answer'
export * from './event.bridge-create'
export * from './event.bridge-destroy'
export * from './event.bridge-enter'
export * from './event.bridge-leave'
export * from './event.cdr'
export * from './event.device-state-change'
export * from './event.dial-begin'
export * from './event.dial-end'
export * from './event.dtmf-begin'
export * from './event.dtmf-end'
export * from './event.extension-status'
export * from './event.hangup'
export * from './event.hangup-request'
export * from './event.music-on-hold-start'
export * from './event.music-on-hold-stop'
export * from './event.new-callerid'
export * from './event.new-connected-line'
export * from './event.queue-caller-abandon'
export * from './event.queue-caller-hangup'
export * from './event.queue-caller-join'
export * from './event.queue-caller-leave'
export * from './event.queue-member-pause'
export * from './event.queue-member-status'
export * from './event.queue-status'
export * from './event.queue-vq-callers'
export * from './event.soft-hangup-request'
export * from './event-new-channel'
