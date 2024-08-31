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
