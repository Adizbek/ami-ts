import { AMIEvents } from './enum.events'

// No officially documented by Asterisk, possible custom event for grandstream
export interface AMIActiveCountEvent {
    Event: AMIEvents.ActiveCount
    Privilege: 'call,all'
    ActiveCalls: string // Number of active calls
}
