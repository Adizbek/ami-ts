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
