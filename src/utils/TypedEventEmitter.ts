/* eslint-disable @typescript-eslint/no-explicit-any */
import EventEmitter from 'node:events'

export default class TypedEventEmitter<TEvents extends Record<string, any>> {
    private emitter = new EventEmitter()

    on<TEventName extends keyof TEvents & string>(
        eventName: TEventName,
        handler: (...eventArg: TEvents[TEventName]) => void
    ): this {
        this.emitter.on(eventName, handler as any)

        return this
    }

    off<TEventName extends keyof TEvents & string>(
        eventName: TEventName,
        handler: (...eventArg: TEvents[TEventName]) => void
    ): this {
        this.emitter.off(eventName, handler as any)

        return this
    }

    protected emit<TEventName extends keyof TEvents & string>(
        eventName: TEventName,
        ...eventArg: TEvents[TEventName]
    ): this {
        this.emitter.emit(eventName, ...(eventArg as []))

        return this
    }
}
