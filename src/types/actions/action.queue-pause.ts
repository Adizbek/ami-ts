import { AMIActionTypes } from './index'

export interface AMIQueuePauseAction {
    Action: AMIActionTypes.QueuePause
    Interface: string
    Paused: string
    Queue?: string
    Reason?: string
}

export interface AMIQueuePauseResult {
    Response: 'Success' | 'Error'
    Message: string
    ActionID: string
}
