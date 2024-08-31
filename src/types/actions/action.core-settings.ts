import { AMIActionTypes } from './index'

export interface AMICoreSettingsAction {
    Action: AMIActionTypes.CoreSettings
}

export interface AMICoreSettingsResult {
    Response: 'Success' | 'Error'
    ActionID: string

    /**
     * Asterisk Module Interface (AMI) version. Semver.
     */
    AMIversion: string

    /**
     * Asterisk version. Semver.
     */
    AsteriskVersion: string

    /**
     * The number of channels available to handle calls.
     */
    CoreMaxCalls: '0'

    CoreMaxLoadAvg: '0.000000' | string
    /**
     * The number of file handles allocated to Asterisk.
     */
    CoreMaxFilehandles: string
    CoreRealTimeEnabled: 'Yes' | 'No'
    CoreCDRenabled: 'Yes' | 'No'
    CoreHTTPenabled: 'Yes' | 'No'

    SystemName: string
    CoreRunUser: string
    CoreRunGroup: string
}
