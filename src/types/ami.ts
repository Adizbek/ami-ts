export interface AMIOptions {
    port: number
    host: string
    username: string
    password: string
    listenEvents?: boolean
    keepAlive?: boolean
    reconnect?: boolean
    reconnectInterval?: number
    readTimeout?: number
    logger?: Console
}
