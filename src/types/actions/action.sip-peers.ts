import { AMIActionTypes } from './index'

export interface AMISipPeersAction {
    Action: AMIActionTypes.SIPPeers
}

export interface AMISipPeersPeerEntryInfo {
    ActionID: string
    Event: 'PeerEntry'
    Channeltype: 'SIP' | 'IAX'

    /**
     * The name of this peer.
     *
     * @example 101
     */
    ObjectName: string

    /**
     * For SIP peers this is either "peer" or "user".
     */
    ChanObjectType: 'peer' | 'user'

    /**
     * the IP address of the peer or "-none-" if none is available.
     */
    IPaddress: '-none-' | string

    /**
     * the port of the peer.
     */
    IPport: string

    Dynamic: 'yes' | 'no'
    AutoForcerport: 'yes' | 'no'

    /**
     * true if the nat option is set to force_rport, false otherwise or null if not supported by Asterisk.
     */
    Forcerport: 'yes' | 'no'
    AutoComedia: 'yes' | 'no'
    Comedia: 'yes' | 'no'

    /**
     * @since Asterisk 1.4.
     */
    VideoSupport: 'yes' | 'no'

    /**
     * @since Asterisk 1.6.
     * @returns true if the peer supports text messages, false otherwise or null if the property is not set (i.e. for Asterisk prior to 1.6).
     */
    TextSupport: 'yes' | 'no'
    ACL: 'yes' | 'no'

    /**
     * @returns the status of this peer.
     * For SIP peers this is one of:
     *
     * "UNREACHABLE"
     * "LAGGED (%d ms)"
     * "OK (%d ms)"
     * "UNKNOWN"
     * "Unmonitored"
     */
    Status:
        | 'UNKNOWN'
        | 'Unmonitored'
        | 'UNREACHABLE'
        | 'LAGGED (%d ms)'
        | 'OK (%d ms)'
        | string

    /**
     * @since Asterisk 1.4.
     */
    RealtimeDevice: 'yes' | 'no'
}

export type AMISipPeersCompleteResult = AMISipPeersPeerEntryInfo[]
