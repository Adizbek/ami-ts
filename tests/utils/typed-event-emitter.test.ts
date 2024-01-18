import { test } from '@jest/globals'
import TypedEventEmitter from '../../src/utils/TypedEventEmitter'

describe('typed-event-emitter', () => {
    test('should work', () => {
        class SomeEmitter extends TypedEventEmitter<{
            event: [string, number]
        }> {
            emitEvent() {
                this.emit('event', 'hello', 1)
            }
        }

        const emitter = new SomeEmitter()

        const cb1 = jest.fn()

        emitter.on('event', cb1)
        emitter.emitEvent()
        emitter.off('event', cb1)
        emitter.emitEvent()

        expect(cb1).toHaveBeenCalledTimes(1)
    })
})
