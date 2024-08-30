import { AMIQueueMemberStatus } from './action.queue-status'
import { AMIQueueCallStrategy } from './action.queues'

export enum AMIChannelState {
    DOWN = '0', // Channel is down and available
    RESERVED = '1', // Channel is reserved
    OFFHOOK = '2', // Channel is off-hook
    DIALING = '3', // Channel is dialing
    RING = '4', // Remote end is ringing
    RINGING = '5', // Local end is ringing
    UP = '6', // Channel is up and active
    BUSY = '7', // Channel is busy
    DIALING_OFFHOOK = '8', // Channel is dialing off-hook
    PRERING = '9', // Channel is pre-ring
    MUTE = '10', // Channel is muted
}

export enum AMIDialStatus {
    ABORT = 'ABORT', // The call was aborted.
    ANSWER = 'ANSWER', // The caller answered.
    BUSY = 'BUSY', // The caller was busy.
    CANCEL = 'CANCEL', // The caller cancelled the call.
    CHANUNAVAIL = 'CHANUNAVAIL', // The requested channel is unavailable.
    CONGESTION = 'CONGESTION', // The called party is congested.
    CONTINUE = 'CONTINUE', // The dial completed, but the caller elected to continue in the dialplan.
    GOTO = 'GOTO', // The dial completed, but the caller jumped to a dialplan location.
    NOANSWER = 'NOANSWER', // The called party failed to answer.
}

export enum AMIChannelStateDescription {
    DOWN = 'Down', // Channel is down and available
    RESERVED = 'Reserved', // Channel is reserved
    OFFHOOK = 'Off Hook', // Channel is off-hook
    DIALING = 'Dialing', // Channel is dialing
    RING = 'Ring', // Remote end is ringing
    RINGING = 'Ringing', // Local end is ringing
    UP = 'Up', // Channel is up and active
    BUSY = 'Busy', // Channel is busy
    DIALING_OFFHOOK = 'Dialing Offhook', // Channel is dialing off-hook
    PRERING = 'Pre-ring', // Channel is pre-ring
    MUTE = 'Mute', // Channel is muted
}

export enum AMIDeviceState {
    UNKNOWN = 'UNKNOWN', // The device is in an unknown state
    NOT_INUSE = 'NOT_INUSE', // The device is not in use, available and idle
    INUSE = 'INUSE', // The device is currently in use, actively engaged in a call
    BUSY = 'BUSY', // The device is busy and cannot take additional calls
    INVALID = 'INVALID', // The device state is invalid, possibly due to configuration errors
    UNAVAILABLE = 'UNAVAILABLE', // The device is unavailable, possibly disconnected or out of service
    RINGING = 'RINGING', // The device is ringing with an incoming call
    RINGINUSE = 'RINGINUSE', // The device is ringing while already in use
    ONHOLD = 'ONHOLD', // The device is on hold, with a call placed on hold
}

export interface AMIHangupRequestEvent {
    Event: AMIEventTypes.HangupRequest
    Privilege: string
    Channel: string // Channel name something like 'PJSIP/171-00000000'
    ChannelState: AMIChannelState
    ChannelStateDesc: AMIChannelStateDescription
    CallerIDNum: string
    CallerIDName: string
    ConnectedLineNum: string
    ConnectedLineName: string
    Language: string
    AccountCode: string
    Context: string
    Exten: string
    Priority: string
    Callid: string
    Linkedid: string
    PageFlag: 'true' | 'false'
    Application: string
    Reg_calleenum: string
    Reg_callernum: string
    Reg_callername: string
    Uniqueid: string
}

export interface AMIQueueMemberStatusEvent {
    Event: AMIEventTypes.QueueMemberStatus
    Privilege: string // Privilege level required to receive the event
    Queue: string // Identifier of the queue
    LastCall: string // Unix timestamp of the last call handled
    MemberName: string // Name of the queue member (e.g., PJSIP endpoint)
    EnableAgentLogin: string // Indicates if agent login is enabled ('yes' or 'no')
    Interface: string // Interface or device the agent is connected to
    LoginTime: string // Unix timestamp of the agent's login time, default 0
    TalkTime: string // Total talk time in seconds for the agent
    StateInterface: string // Interface related to the agent’s state
    Penalty: string // Penalty level of the agent within the queue
    Membership: 'static' | 'dynamic' // Type of membership ('static' or 'dynamic')
    Paused: string // Whether the agent is paused (0 = no, 1 = yes)
    CallerChannel: string // Current channel associated with the caller
    CallsTaken: string // Total number of calls taken by the agent
    Status: AMIQueueMemberStatus // Current status of the agent
    CallsAbandon: string // Number of calls abandoned waiting for the agent
    PausedTime: string // Unix timestamp of when the agent last paused
    Ringinuse: string // Whether calls are sent to agents already on a call, 0 = no, 1 = yes
}

export interface AMIDeviceStateChangeEvent {
    Event: AMIEventTypes.DeviceStateChange
    Privilege: string
    // The name of the device whose state has changed
    // e.g: 'PJSIP/171', 'Queue:6500', 'PJSIP/trunk_1'
    Device: string
    State: AMIDeviceState
}

export enum AMIExtensionStatusCode {
    REMOVED_FROM_DIALPLAN = '-2', // The extension was removed from the dialplan
    HINT_REMOVED = '-1', // The extension's hint was removed from the dialplan
    IDLE = '0', // Related device(s) are in an idle state
    INUSE = '1', // Related device(s) are in active calls but may take more calls
    BUSY = '2', // Related device(s) are in active calls and may not take any more calls
    UNAVAILABLE = '4', // Related device(s) are not reachable
    RINGING = '8', // Related device(s) are currently ringing
    INUSE_RINGING = '9', // Related device(s) are currently ringing and in active calls
    HOLD = '16', // Related device(s) are currently on hold
    INUSE_HOLD = '17', // Related device(s) are currently on hold and in active calls
}

// Enum for Extension Status Text
export enum AMIExtensionStatusText {
    IDLE = 'Idle', // Extension is idle
    INUSE = 'InUse', // Extension is in use
    BUSY = 'Busy', // Extension is busy
    UNAVAILABLE = 'Unavailable', // Extension is unavailable
    RINGING = 'Ringing', // Extension is ringing
    INUSE_RINGING = 'InUse&Ringing', // Extension is in use and ringing
    HOLD = 'Hold', // Extension is on hold
    INUSE_HOLD = 'InUse&Hold', // Extension is in use and on hold
    UNKNOWN = 'Unknown', // Status does not match any of the above values
}

export interface AMIExtensionStatusEvent {
    Event: AMIEventTypes.ExtensionStatus
    Privilege: string // Privilege level required to receive the event
    Exten: string // The extension number associated with the event
    Context: string // The dial plan context in which the extension exists
    Hint: string // The hint or reference that describes the status of the extension
    Status: AMIExtensionStatusCode // Numeric code representing the current status of the extension
    StatusText: AMIExtensionStatusText // Human-readable text describing the status of the extension
}

export interface AMIQueueStatusEvent {
    Event: AMIEventTypes.QueueStatus
    Privilege: string // Privileges required for the event, usually indicating access level
    Queue: string // The identifier of the queue, e.g., '6500'
    CallsTotal: string // Total number of calls received by the queue
    CallCount: string // Current number of active calls in the queue
    CallsComplete: string // Total number of calls that were successfully completed
    CallsAbandoned: string // Total number of calls that were abandoned
    ServiceLevel: string // Service level metric showing percentage of calls answered within a specific time, e.g., SL:0.0% within 0s
    Strategy: AMIQueueCallStrategy // The call distribution strategy used, e.g., 'ringall'
    Chairman: string // Name of the chairman, usually empty if not set
    EnableAgentLogin: 'yes' | 'no' // Indicates if agent login is enabled, values are 'yes' or 'no'
    QueueName: string // The human-readable name of the queue
    AbandonedRate: string // Percentage rate of abandoned calls in the queue, e.g., '25.81%'
    AvgWaitTime: string // Average waiting time for callers in the queue, in seconds
    AvgTalkTime: string // Average talk time per call in the queue, in seconds
    AvailableCount: string // Number of agents currently available to take calls
    AgentCount: string // Total number of agents assigned to the queue
}

export interface AMIQueueMemberPauseEvent {
    Event: AMIEventTypes.QueueMemberPause // Event type, indicating a queue member has been paused
    Privilege: string // Privileges required for the event, usually indicating access level
    Queue: string // The identifier of the queue, e.g., '6500'
    LastCall: string // Timestamp of the last call the member participated in
    MemberName: string // Name of the member, typically the interface name
    EnableAgentLogin: 'yes' | 'no' // Indicates if agent login is enabled
    Interface: string // The specific channel or device interface, e.g., 'PJSIP/173'
    LoginTime: string // Timestamp of when the member logged in; '0' if not logged in
    TalkTime: string // Total time spent talking, in seconds
    StateInterface: string // The interface used to track the member's state
    Penalty: string // The penalty assigned to the member, affecting call distribution priority
    Membership: 'static' | 'dynamic' // Membership type of the member in the queue
    Paused: '1' | '0' // Indicates whether the member is paused ('1' for paused, '0' for not paused)
    CallerChannel: string // The current channel of the caller interacting with the queue
    CallsTaken: string // The total number of calls the member has taken
    Status: AMIQueueMemberStatus // The current status of the member (e.g., '1' for available)
    CallsAbandon: string // The total number of calls abandoned by the member
    PausedTime: string // Timestamp of when the member was paused
    Ringinuse: '1' | '0' // Indicates if the member can be rung when already in use ('0' for no, '1' for yes)
}

export enum AMICdrDisposition {
    NO_ANSWER = 'NO ANSWER', // The channel was not answered
    FAILED = 'FAILED', // The channel attempted to dial but the call failed
    BUSY = 'BUSY', // The channel attempted to dial but the remote party was busy
    ANSWERED = 'ANSWERED', // The channel was answered
    CONGESTION = 'CONGESTION', // The channel attempted to dial but the remote party was congested
}

export enum AMAFlags {
    OMIT = 'OMIT', // This CDR should be ignored
    BILLING = 'BILLING', // This CDR contains valid billing data
    DOCUMENTATION = 'DOCUMENTATION', // This CDR is for documentation purposes
}

export interface AMICdrEvent {
    Event: AMIEventTypes.Cdr // The event type, indicating a call detail record
    Privilege: string // Privilege level required to receive the event
    AccountCode: string // Account code associated with the call, often used for billing
    Source: string // The source extension or number that initiated the call
    Destination: string // The destination number or extension being called
    DestinationContext: string // The context in which the destination is handled in the dial plan
    CallerID: string // Caller ID information of the source, including name and number
    Channel: string // The originating channel of the call
    DestinationChannel: string // The channel associated with the destination
    LastApplication: string // The last application executed on the channel (e.g., 'Dial')
    LastData: string // Arguments or data passed to the last application
    StartTime: string // The start time of the call in the format 'YYYY-MM-DD HH:MM:SS'
    AnswerTime: string // The time when the call was answered, in the same format
    EndTime: string // The time when the call ended
    Duration: string // The total duration of the call in seconds, from start to end
    BillableSeconds: string // The number of seconds that are billable (talk time)
    Disposition: AMICdrDisposition // The result of the call (e.g., 'ANSWERED', 'NO ANSWER', 'BUSY', 'FAILED')
    AMAFlags: AMAFlags // AMA (Automated Message Accounting) flags, indicating billing status
    UniqueID: string // A unique identifier for the call
    UserField: string // A custom user-defined field associated with the call
}

export enum AMIHangupCause {
    UNALLOCATED = '1', // Unallocated (unassigned) number
    NO_ROUTE_TRANSIT_NET = '2', // No route to the specified transit network
    NO_ROUTE_DESTINATION = '3', // No route to the destination
    CHANNEL_UNACCEPTABLE = '6', // The channel is unacceptable
    CALL_AWARDED_DELIVERED = '7', // Call awarded, being delivered in an established channel
    NORMAL_CLEARING = '16', // Normal call clearing
    USER_BUSY = '17', // User busy
    NO_USER_RESPONSE = '18', // No user response
    NO_ANSWER = '19', // No answer from the user
    SUBSCRIBER_ABSENT = '20', // Subscriber absent
    CALL_REJECTED = '21', // Call rejected
    NUMBER_CHANGED = '22', // Number changed
    REDIRECTED_TO_NEW_DESTINATION = '23', // Redirected to a new destination
    USER_NOT_REGISTERED = '26', // User not registered
    NORMAL_UNSPECIFIED = '31', // Normal, unspecified
    NO_CIRCUIT_AVAILABLE = '34', // No circuit or channel available
    NETWORK_OUT_OF_ORDER = '38', // Network out of order
    TEMPORARY_FAILURE = '41', // Temporary failure
    SWITCH_CONGESTION = '42', // Switch congestion
    ACCESS_INFO_DISCARDED = '43', // Access information discarded
    REQUESTED_CHAN_UNAVAIL = '44', // Requested channel not available
    PRE_EMPTED = '45', // Call has been preempted
    FACILITY_NOT_SUBSCRIBED = '50', // Facility not subscribed
    OUTGOING_CALL_BARRED = '52', // Outgoing calls barred
    INCOMING_CALL_BARRED = '54', // Incoming calls barred
    BEARERCAPABILITY_NOTAUTH = '57', // Bearer capability not authorized
    BEARERCAPABILITY_NOTAVAIL = '58', // Bearer capability not available
    BEARERCAPABILITY_NOTIMPL = '65', // Bearer capability not implemented
    CHAN_NOT_IMPLEMENTED = '66', // Channel type not implemented
    FACILITY_NOT_IMPLEMENTED = '69', // Facility not implemented
    INVALID_CALL_REFERENCE = '81', // Invalid call reference value
    INCOMPATIBLE_DESTINATION = '88', // Incompatible destination
    INVALID_MSG_UNSPECIFIED = '95', // Invalid message, unspecified
    MANDATORY_IE_MISSING = '96', // Mandatory information element is missing
    MESSAGE_TYPE_NONEXIST = '97', // Message type nonexistent or not implemented
    WRONG_MESSAGE = '98', // Message not compatible with call state
    IE_NONEXIST = '99', // Information element nonexistent or not implemented
    INVALID_IE_CONTENTS = '100', // Invalid information element contents
    WRONG_CALL_STATE = '101', // Message not compatible with call state
    RECOVERY_ON_TIMER_EXPIRE = '102', // Recovery on timer expiry
    MANDATORY_IE_LENGTH_ERROR = '103', // Mandatory information element length error
    PROTOCOL_ERROR = '111', // Protocol error, unspecified
    INTERWORKING = '127', // Interworking, unspecified
}

export interface AMIHangupEvent {
    Event: AMIEventTypes.Hangup
    Privilege: string // Privilege level required to receive the event
    Channel: string // The originating channel of the call
    ChannelState: AMIChannelState // Numeric code representing the current state of the channel
    ChannelStateDesc: AMIChannelStateDescription // Description of the current state of the channel
    CallerIDNum: string // The Caller ID number of the calling party
    CallerIDName: string // The Caller ID name of the calling party
    ConnectedLineNum: string // The number of the connected line
    ConnectedLineName: string // The name of the connected line
    Language: string // Language code used in the call
    AccountCode: string // Account code associated with the call, used for billing or tracking
    Context: string // The dial plan context in which the hangup occurred
    Exten: string // The extension involved in the hangup
    Priority: string // The priority of the dial plan entry being executed
    Callid: string // A unique identifier for the call
    Linkedid: string // The unique ID of the linked call, used to track call legs
    PageFlag: 'true' | 'false' // Indicates whether the call was part of a paging operation
    Application: string // The application that was executing when the hangup occurred
    Reg_calleenum: string // The registered caller number (if applicable)
    Reg_callernum: string // The registered caller number (if applicable)
    Reg_callername: string // The registered caller name (if applicable)
    Uniqueid: string // A unique identifier for the call, often used for tracking and logging
    Cause: AMIHangupCause // The numeric cause code indicating why the call was hung up
    'Cause-txt': string // Text description of the hangup cause
}

// No officially documented by Asterisk, possible custom event for grandstream
export interface AMIActiveCountEvent {
    Event: AMIEventTypes.ActiveCount
    Privilege: 'call,all'
    ActiveCalls: string // Number of active calls
}

export interface AMISoftHangupRequestEvent {
    Event: AMIEventTypes.SoftHangupRequest // The type of event, e.g., 'SoftHangupRequest'
    Privilege: 'call,all' // Privilege level required to receive the event
    Channel: string // The originating channel of the call
    ChannelState: AMIChannelState // Numeric code representing the current state of the channel
    ChannelStateDesc: AMIChannelStateDescription // Description of the current state of the channel
    CallerIDNum: string // The Caller ID number of the calling party
    CallerIDName: string // The Caller ID name of the calling party
    ConnectedLineNum: string // The number of the connected line
    ConnectedLineName: string // The name of the connected line
    Language: string // Language code used in the call
    AccountCode: string // Account code associated with the call, used for billing or tracking
    Context: string // The dial plan context in which the call is being handled
    Exten: string // The extension involved in the call
    Priority: string // The priority of the dial plan entry being executed
    Callid: string // A unique identifier for the call
    Linkedid: string // The unique ID of the linked call, used to track call legs
    PageFlag: 'true' | 'false' // Indicates whether the call was part of a paging operation
    Application: string // The application that was executing when the soft hangup request occurred
    Reg_calleenum: string // The registered caller number (if applicable)
    Reg_callernum: string // The registered caller number (if applicable)
    Reg_callername: string // The registered caller name (if applicable)
    Uniqueid: string // A unique identifier for the call, often used for tracking and logging
    Key: string // An additional key related to the event, details depend on the specific implementation
    FaxStatus: string // Status of fax transmission, if applicable
    Cause: AMIHangupCause // The numeric cause code indicating why the soft hangup request was issued
}

export interface AMIDialBeginEvent {
    Event: AMIEventTypes.DialBegin // The type of event, e.g., 'DialBegin'
    Privilege: 'call,all' // Privilege level required to receive the event
    Channel: string // The originating channel of the call
    ChannelState: AMIChannelState // Numeric code representing the current state of the originating channel
    ChannelStateDesc: AMIChannelStateDescription // Description of the current state of the originating channel
    CallerIDNum: string // Caller ID number of the originating party
    CallerIDName: string // Caller ID name of the originating party
    ConnectedLineNum: string // Number of the line connected to the originating channel
    ConnectedLineName: string // Name of the line connected to the originating channel
    Language: string // Language code used for the originating channel
    AccountCode: string // Account code associated with the originating channel, used for billing or tracking
    Context: string // Dial plan context in which the originating channel is being handled
    Exten: string // Extension involved in the originating channel
    Priority: string // Priority of the dial plan entry being executed on the originating channel
    Callid: string // Unique identifier for the originating call
    Linkedid: string // Unique ID of the oldest linked channel, used to track call legs
    PageFlag: 'true' | 'false' // Indicates whether the call was part of a paging operation
    Application: string // The application that was executing on the originating channel
    Reg_calleenum: string // Registered callee number, if applicable
    Reg_callernum: string // Registered caller number, if applicable
    Reg_callername: string // Registered caller name, if applicable
    Uniqueid: string // Unique identifier for the originating channel
    DestChannel: string // The destination channel of the dial operation
    DestChannelState: AMIChannelState // Numeric code representing the current state of the destination channel
    DestChannelStateDesc: AMIChannelStateDescription // Description of the current state of the destination channel
    DestCallerIDNum: string // Caller ID number of the destination party
    DestCallerIDName: string // Caller ID name of the destination party
    DestConnectedLineNum: string // Number of the line connected to the destination channel
    DestConnectedLineName: string // Name of the line connected to the destination channel
    DestLanguage: string // Language code used for the destination channel
    DestAccountCode: string // Account code associated with the destination channel
    DestContext: string // Dial plan context in which the destination channel is being handled
    DestExten: string // Extension involved in the destination channel
    DestPriority: string // Priority of the dial plan entry being executed on the destination channel
    DestCallid: string // Unique identifier for the destination call
    DestLinkedid: string // Unique ID of the oldest linked channel for the destination
    DestPageFlag: 'true' | 'false' // Indicates whether the destination call was part of a paging operation
    DestApplication: string // The application that was executing on the destination channel
    DestReg_calleenum: string // Registered callee number for the destination, if applicable
    DestReg_callernum: string // Registered caller number for the destination, if applicable
    DestReg_callername: string // Registered caller name for the destination, if applicable
    DestUniqueid: string // Unique identifier for the destination channel
    DialString: string // The dial string used for the dial operation
}

export interface AMIDialEndEvent {
    Event: AMIEventTypes.DialEnd // The type of event, e.g., 'DialEnd'
    Privilege: 'call,all' // Privilege level required to receive the event
    Channel: string // The originating channel of the call
    ChannelState: AMIChannelState // Numeric code representing the current state of the originating channel
    ChannelStateDesc: AMIChannelStateDescription // Description of the current state of the originating channel
    CallerIDNum: string // Caller ID number of the originating party
    CallerIDName: string // Caller ID name of the originating party
    ConnectedLineNum: string // Number of the line connected to the originating channel
    ConnectedLineName: string // Name of the line connected to the originating channel
    Language: string // Language code used for the originating channel
    AccountCode: string // Account code associated with the originating channel, used for billing or tracking
    Context: string // Dial plan context in which the originating channel is being handled
    Exten: string // Extension involved in the originating channel
    Priority: string // Priority of the dial plan entry being executed on the originating channel
    Callid: string // Unique identifier for the originating call
    Linkedid: string // Unique ID of the oldest linked channel, used to track call legs
    PageFlag: 'true' | 'false' // Indicates whether the call was part of a paging operation
    Application: string // The application that was executing on the originating channel
    Reg_calleenum: string // Registered callee number, if applicable
    Reg_callernum: string // Registered caller number, if applicable
    Reg_callername: string // Registered caller name, if applicable
    Uniqueid: string // Unique identifier for the originating channel
    DestChannel: string // The destination channel of the dial operation
    DestChannelState: AMIChannelState // Numeric code representing the current state of the destination channel
    DestChannelStateDesc: AMIChannelStateDescription // Description of the current state of the destination channel
    DestCallerIDNum: string // Caller ID number of the destination party
    DestCallerIDName: string // Caller ID name of the destination party
    DestConnectedLineNum: string // Number of the line connected to the destination channel
    DestConnectedLineName: string // Name of the line connected to the destination channel
    DestLanguage: string // Language code used for the destination channel
    DestAccountCode: string // Account code associated with the destination channel
    DestContext: string // Dial plan context in which the destination channel is being handled
    DestExten: string // Extension involved in the destination channel
    DestPriority: string // Priority of the dial plan entry being executed on the destination channel
    DestCallid: string // Unique identifier for the destination call
    DestLinkedid: string // Unique ID of the oldest linked channel for the destination
    DestPageFlag: 'true' | 'false' // Indicates whether the destination call was part of a paging operation
    DestApplication: string // The application that was executing on the destination channel
    DestReg_calleenum: string // Registered callee number for the destination, if applicable
    DestReg_callernum: string // Registered caller number for the destination, if applicable
    DestReg_callername: string // Registered caller name for the destination, if applicable
    DestUniqueid: string // Unique identifier for the destination channel
    DialStatus: AMIDialStatus // The result of the dial operation
    Forward?: string // If the call was forwarded, where the call was forwarded to.
}

export interface AMINewConnectedLineEvent {
    Event: AMIEventTypes.NewConnectedLine // The type of event, e.g., 'NewConnectedLine'
    Privilege: 'call,all' // Privilege level required to receive the event
    Channel: string // The originating channel of the call
    ChannelState: AMIChannelState // Numeric code representing the current state of the originating channel
    ChannelStateDesc: AMIChannelStateDescription // Description of the current state of the originating channel
    CallerIDNum: string // Caller ID number of the originating party
    CallerIDName: string // Caller ID name of the originating party
    ConnectedLineNum: string // Number of the line connected to the originating channel
    ConnectedLineName: string // Name of the line connected to the originating channel
    Language: string // Language code used for the originating channel
    AccountCode: string // Account code associated with the originating channel, used for billing or tracking
    Context: string // Dial plan context in which the originating channel is being handled
    Exten: string // Extension involved in the originating channel
    Priority: string // Priority of the dial plan entry being executed on the originating channel
    Callid: string // Unique identifier for the originating call
    Linkedid: string // Unique ID of the oldest linked channel, used to track call legs
    PageFlag: 'true' | 'false' // Indicates whether the call was part of a paging operation
    Application: string // The application that was executing on the originating channel
    Reg_calleenum: string // Registered callee number, if applicable
    Reg_callernum: string // Registered caller number, if applicable
    Reg_callername: string // Registered caller name, if applicable
    Uniqueid: string // Unique identifier for the originating channel
}

export interface AMINewCalleridEvent {
    Event: AMIEventTypes.NewCallerid // The type of event, e.g., 'NewCallerid'
    Privilege: 'call,all' // Privilege level required to receive the event
    Channel: string // The specific channel related to the call
    ChannelState: AMIChannelState // Numeric value representing the channel's current state
    ChannelStateDesc: AMIChannelStateDescription // Textual description of the channel's current state
    CallerIDNum: string // The phone number of the caller
    CallerIDName: string // The name of the caller, if available
    ConnectedLineNum: string // The phone number of the connected line (destination)
    ConnectedLineName: string // The name associated with the connected line
    Language: string // The language setting for the call (e.g., 'ru' for Russian)
    AccountCode: string // Account code associated with the call, if any
    Context: string // The dial plan context associated with the call
    Exten: string // The extension number associated with the call
    Priority: string // The priority of the call within the dial plan
    Callid: string // A unique identifier for the call
    Linkedid: string // The linked identifier for the call, used for tracking call legs
    PageFlag: 'true' | 'false' // Indicates if the call is related to a paging operation (true/false)
    Application: string // The application currently executing on the channel
    Reg_calleenum: string // The registered number of the callee
    Reg_callernum: string // The registered number of the caller
    Reg_callername: string // The registered name of the caller
    Uniqueid: string // A unique identifier for the channel, typically used for tracking

    /**
     * @description Value of the Caller ID presentation and screening status. Unsure of the possible values.
     * 0 (Presentation Allowed, Not Screened)
     * 1 (Presentation Allowed, Passed Screen)
     * 3 (Presentation Restricted, Screened)
     * 4 (Presentation Allowed, Passed Screen)
     * 5 (Presentation Restricted, Passed Screen)
     */
    'CID-CallingPres':
        | string
        | '0 (Presentation Allowed, Not Screened)'
        | '1 (Presentation Allowed, Passed Screen)'
        | '3 (Presentation Restricted, Screened)'
        | '4 (Presentation Allowed, Passed Screen)'
        | '5 (Presentation Restricted, Passed Screen)'
}

export interface AMINewchannelEvent {
    Event: AMIEventTypes.Newchannel // The type of event, e.g., 'Newchannel'
    Privilege: 'call,all' // Privilege level required to receive the event
    Channel: string // The specific channel related to the call
    ChannelState: AMIChannelState // Numeric value representing the channel's current state
    ChannelStateDesc: AMIChannelStateDescription // Textual description of the channel's current state
    CallerIDNum: string // The phone number of the caller, if available
    CallerIDName: string // The name of the caller, if available
    ConnectedLineNum: string // The phone number of the connected line (destination)
    ConnectedLineName: string // The name associated with the connected line
    Language: string // The language setting for the call (e.g., 'en' for English)
    AccountCode: string // Account code associated with the call, if any
    Context: string // The dial plan context associated with the call
    Exten: string // The extension number associated with the call
    Priority: string // The priority of the call within the dial plan
    Callid: string // A unique identifier for the call, if available
    Linkedid: string // The linked identifier for the call, used for tracking call legs
    PageFlag: 'true' | 'false' // Indicates if the call is related to a paging operation (true/false)
    Application: string // The application currently executing on the channel, if any
    Reg_calleenum: string // The registered number of the callee, if available
    Reg_callernum: string // The registered number of the caller, if available
    Reg_callername: string // The registered name of the caller, if available
    Uniqueid: string // A unique identifier for the channel, typically used for tracking
}

/**
 * The QueueVqCallers event is related to queue management in Asterisk,
 * particularly in the context of monitoring callers waiting in a queue.
 * This event provides details about callers who are currently in a queue,
 * including their position, channel information, and other related data.
 */
export interface AMIQueueVqCallersEvent {
    Event: AMIEventTypes.QueueVqCallers // The type of event, e.g., 'QueueVqCallers'
    Privilege: 'agent,all' // Privilege level required to receive the event
    Queue: string // The name or identifier of the queue
    Channel: string // The channel associated with the caller in the queue
    CallerId: string // Caller ID number of the caller in the queue
    CallerName: string // Caller ID name of the caller in the queue
    StartTime: string // Unix timestamp indicating when the caller entered the queue
    Position: string // The current position of the caller in the queue
}

// Enum for BridgeType values
export enum AMIBridgeType {
    BASIC = 'basic', // A simple bridge for basic connections
    MIXING = 'mixing', // A bridge that mixes audio from multiple channels
    HOLDING = 'holding', // A bridge that holds calls, typically used for parking
    DIAL = 'dial', // A bridge used during a dialing operation
    MULTIPARTY = 'multiparty', // A bridge that supports multiple parties, often used for conferences
    ANNOUNCEMENT = 'announcement', // A bridge used for announcements
}

// Enum for BridgeTechnology values
export enum AMIBridgeTechnology {
    SIMPLE_BRIDGE = 'simple_bridge', // A basic technology for connecting channels
    BASE = 'base', // A base bridge technology, often used as a fallback
    SOFTMIX = 'softmix', // A technology that provides software-based audio mixing
    XMEETME = 'xmeetme', // A technology used for conferencing, similar to MeetMe
    DYNAMIC = 'dynamic', // A dynamic bridge that adapts to the needs of the call
    MULTI_PARTY = 'multi_party', // Technology for handling multiparty conferences
    HOLD = 'hold', // A technology specifically for holding calls
    ANNOUNCE = 'announce', // Used for bridges that play announcements
    LINKED = 'linked', // Bridges that link other bridges together
    VIDEO_BRIDGE = 'video_bridge', // A bridge that supports video connections
}

export interface AMIBridgeCreateEvent {
    Event: AMIEventTypes.BridgeCreate // The type of event, e.g., 'BridgeCreate'
    Privilege: 'call,all' // Privilege level required to receive the event
    BridgeUniqueid: string // A unique identifier for the bridge, UUID format
    BridgeType: AMIBridgeType // The type of the bridge, indicating its functionality
    BridgeTechnology: AMIBridgeTechnology // The technology used for the bridge
    BridgeCreator: string // The creator of the bridge, usually the application or entity that initiated it
    BridgeName: string // The name of the bridge, which may be set by the creator
    BridgeNumChannels: string // The number of channels currently in the bridge
}

export interface AMIBridgeDestroyEvent {
    Event: AMIEventTypes.BridgeDestroy // The type of event, e.g., 'BridgeCreate'
    Privilege: 'call,all' // Privilege level required to receive the event
    BridgeUniqueid: string // A unique identifier for the bridge, UUID format
    BridgeType: AMIBridgeType // The type of the bridge, indicating its functionality
    BridgeTechnology: AMIBridgeTechnology // The technology used for the bridge
    BridgeCreator: string // The creator of the bridge, usually the application or entity that initiated it
    BridgeName: string // The name of the bridge, which may be set by the creator
    BridgeNumChannels: string // The number of channels currently in the bridge
}

export interface AMIBridgeEnterEvent {}

export interface AMIBridgeLeaveEvent {}

// BridgeCreate, BridgeDestroy BridgeEnter, BridgeLeave

export enum AMIEventTypes {
    QueueMemberStatus = 'QueueMemberStatus',
    DeviceStateChange = 'DeviceStateChange',
    HangupRequest = 'HangupRequest',
    ExtensionStatus = 'ExtensionStatus',
    QueueStatus = 'QueueStatus',
    QueueMemberPause = 'QueueMemberPause',
    Cdr = 'Cdr',
    Hangup = 'Hangup',
    ActiveCount = 'ActiveCount',
    SoftHangupRequest = 'SoftHangupRequest',
    DialBegin = 'DialBegin',
    DialEnd = 'DialEnd',
    NewConnectedLine = 'NewConnectedLine',
    NewCallerid = 'NewCallerid',
    Newchannel = 'Newchannel',
    QueueVqCallers = 'QueueVqCallers',
    BridgeCreate = 'BridgeCreate',
    BridgeDestroy = 'BridgeDestroy',
    BridgeEnter = 'BridgeEnter',
    BridgeLeave = 'BridgeLeave',
}

export const AvailableAMIEvents: AMIEventTypes[] = Object.values(AMIEventTypes)

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
