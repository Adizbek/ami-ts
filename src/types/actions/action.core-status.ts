import { AMIActionTypes } from './index'

export interface AMICoreStatusAction {
    Action: AMIActionTypes.CoreStatus
}

export interface AMICoreStatusResult {
    Response: 'Success' | 'Error'
    ActionID: string

    /**
     * Core startup date. example: 2024-01-25
     */
    CoreStartupDate: string

    /**
     * Core startup time. example: 05:49:51
     */
    CoreStartupTime: '05:49:51'

    /**
     * Core reload date. example: 2024-01-25
     */
    CoreReloadDate: string
    /**
     * Core reload time. example: 01:22:36
     */
    CoreReloadTime: string

    /**
     * Current calls count
     */
    CoreCurrentCalls: string
}
