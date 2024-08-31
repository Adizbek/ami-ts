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
