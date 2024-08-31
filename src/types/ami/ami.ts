import { AMIEvent } from '../events'

export interface AMIOptions {
    port: number
    host: string
    username: string
    password: string
    listenEvents?: boolean
    keepAlive?: boolean
    pingInterval?: number
    reconnect?: boolean
    reconnectInterval?: number
    readTimeout?: number
    logger?: Console
}

export enum AMIDataReaderEvents {
    Welcome = 'welcome',
    Result = 'result',
}

export interface AMIDataReaderAsyncResult {
    ActionID: string
    EventList: 'start'
    Response: 'Success' | 'Error'
    Message?: 'Queue summary will follow'
}

export type AMIDataReaderResult = AMIEvent | AMIDataReaderAsyncResult

export type AMIDataReaderEventsDefinition = {
    [AMIDataReaderEvents.Welcome]: []
    [AMIDataReaderEvents.Result]: [arg1: AMIDataReaderResult]
}

export interface AMIDataReaderOptions {
    logger?: Console
}

export enum AMIResultCollectorEvents {
    ActionResult = 'actionResult',
    Event = 'event',
}

type AMIActionResult = AMIDataReaderResult | AMIDataReaderResult[]

export type AMIResultCollectorDefinition = {
    [AMIResultCollectorEvents.ActionResult]: [
        actionID: string,
        result: AMIActionResult,
    ]

    [AMIResultCollectorEvents.Event]: [AMIEvent]
}

export interface AMIResultCollectorOptions {
    logger?: Console
}
