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
