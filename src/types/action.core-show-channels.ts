import { AMIActionTypes } from './actions'

export interface AMICoreShowChannelsAction {
    Action: AMIActionTypes.CoreShowChannels
}

export interface AMICoreShowChannelsItem {
    Event: AMIActionTypes.CoreShowChannels
    ActionID: string
    Channel: string
    ChannelState: string
    ChannelStateDesc: string
    CallerIDNum?: string
    CallerIDName?: string
    ConnectedLineNum?: string
    Language: string
    Context: string
    Exten: string
    Priority: string
    Callid: string
    Linkedid: string
    PageFlag: string
    Application: string
    Uniqueid: string

    ApplicationData: string

    /**
     * The duration of the call. example: 00:00:04
     */
    Duration: string
}

export type AMICoreShowChannelsCompleteResult = AMICoreShowChannelsItem[]
