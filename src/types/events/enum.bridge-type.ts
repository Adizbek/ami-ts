// Enum for BridgeType values
export enum AMIBridgeType {
    BASIC = 'basic', // A simple bridge for basic connections
    MIXING = 'mixing', // A bridge that mixes audio from multiple channels
    HOLDING = 'holding', // A bridge that holds calls, typically used for parking
    DIAL = 'dial', // A bridge used during a dialing operation
    MULTIPARTY = 'multiparty', // A bridge that supports multiple parties, often used for conferences
    ANNOUNCEMENT = 'announcement', // A bridge used for announcements
}
