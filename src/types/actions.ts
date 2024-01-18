export enum AMIActionTypes {
    Login = 'Login',
    Ping = 'Ping',
    QueueSummary = 'QueueSummary',
    QueueStatus = 'QueueStatus',
    CoreShowChannels = 'CoreShowChannels',
}

interface AMIQueueSummaryAction {
    Action: AMIActionTypes.QueueSummary
    Queue?: string
}

export interface AMIQueueSummaryCompleteResult {
    Event: AMIActionTypes.QueueSummary
    Queue: string
    LoggedIn: string
    Available: string
    Callers: string
    HoldTime: string
    TalkTime: string
    LongestHoldTime: string
    ActionID: string
}

interface AMIQueueStatusAction {
    Action: AMIActionTypes.QueueStatus
    Queue?: string
    Member?: string
}

export interface AMIQueueStatusCompleteResult {
    Event: AMIActionTypes.QueueStatus
    Queue: string
    LoggedIn: string
    Available: string
    Callers: string
    HoldTime: string
    TalkTime: string
    LongestHoldTime: string
    ActionID: string
}

interface AMILoginAction {
    Action: AMIActionTypes.Login
    Username: string
    Secret: string
    // if on - AMI will send events, if off - AMI will not send events
    Events?: 'ON' | 'OFF'
}

export interface AMILoginResult {
    Response: 'Success' | 'Error'
    Message: string
    ActionID: string
}

interface AMIPingAction {
    Action: AMIActionTypes.Ping
}

interface AMICoreShowChannelsAction {
    Action: AMIActionTypes.CoreShowChannels
}

export type AMIAction =
    | AMILoginAction
    | AMIPingAction
    | AMIQueueSummaryAction
    | AMIQueueStatusAction
    | AMICoreShowChannelsAction
