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
