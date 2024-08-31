import { AMIBoolean } from './index'
import { AMIChannelState } from './enum.channel-state'
import { AMIChannelStateDescription } from './enum.channel-state-description'
import { AMIEvents } from './enum.events'

export interface AMIHangupRequestEvent {
    Event: AMIEvents.HangupRequest
    Privilege: string
    Channel: string // Channel name something like 'PJSIP/171-00000000'
    ChannelState: AMIChannelState
    ChannelStateDesc: AMIChannelStateDescription
    CallerIDNum: string
    CallerIDName: string
    ConnectedLineNum: string
    ConnectedLineName: string
    Language: string
    AccountCode: string
    Context: string
    Exten: string
    Priority: string
    Callid: string
    Linkedid: string
    PageFlag: AMIBoolean
    Application: string
    Reg_calleenum: string
    Reg_callernum: string
    Reg_callername: string
    Uniqueid: string
}
