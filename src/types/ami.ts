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
