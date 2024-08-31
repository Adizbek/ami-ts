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
