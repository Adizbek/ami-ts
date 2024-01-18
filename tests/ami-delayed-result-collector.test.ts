import { describe, test } from '@jest/globals'
import * as fs from 'fs'
import * as path from 'path'
import AMIDataReader, { AMIDataReaderEvents } from '../src/AMIDataReader'
import AMIDelayedResultCollector, {
    AMIDelayedResultCollectorEvents,
} from '../src/AMIDelayedResultCollector'

describe('AMI delayed result collector module', () => {
    test('Delayed event should constructed correctly', () => {
        const msg1 =
            'Response: Success\r\n' +
            'ActionID: 2\r\n' +
            'EventList: start\r\n' +
            'Message: Queue summary will follow\r\n' +
            '\r\n' +
            'Event: QueueSummary\r\n' +
            'Queue: 6506\r\n' +
            'LoggedIn: 0\r\n' +
            'Available: 0\r\n' +
            'Callers: 0\r\n' +
            'HoldTime: 0\r\n' +
            'TalkTime: 0\r\n' +
            'LongestHoldTime: 0\r\n' +
            'ActionID: 2\r\n' +
            '\r\n' +
            'Event: QueueSummary\r\n' +
            'Queue: 6507\r\n' +
            'LoggedIn: 1\r\n' +
            'Available: 1\r\n' +
            'Callers: 0\r\n' +
            'HoldTime: 0\r\n' +
            'TalkTime: 0\r\n' +
            'LongestHoldTime: 0\r\n' +
            'ActionID: 2\r\n' +
            '\r\n' +
            'Event: QueueSummary\r\n' +
            'Queue: 6504\r\n' +
            'LoggedIn: 0\r\n' +
            'Available: 0\r\n' +
            'Callers: 0\r\n' +
            'HoldTime: 0\r\n' +
            'TalkTime: 0\r\n' +
            'LongestHoldTime: 0\r\n' +
            'ActionID: 2\r\n' +
            '\r\n'

        const msg2 =
            'Event: QueueSummary\r\n' +
            'Queue: 6505\r\n' +
            'LoggedIn: 0\r\n' +
            'Available: 0\r\n' +
            'Callers: 0\r\n' +
            'HoldTime: 0\r\n' +
            'TalkTime: 0\r\n' +
            'LongestHoldTime: 0\r\n' +
            'ActionID: 2\r\n' +
            '\r\n' +
            'Event: QueueSummary\r\n' +
            'Queue: 6502\r\n' +
            'LoggedIn: 0\r\n' +
            'Available: 0\r\n' +
            'Callers: 0\r\n' +
            'HoldTime: 0\r\n' +
            'TalkTime: 0\r\n' +
            'LongestHoldTime: 0\r\n' +
            'ActionID: 2\r\n' +
            '\r\n' +
            'Event: QueueSummary\r\n' +
            'Queue: 6503\r\n' +
            'LoggedIn: 0\r\n' +
            'Available: 0\r\n' +
            'Callers: 0\r\n' +
            'HoldTime: 0\r\n' +
            'TalkTime: 0\r\n' +
            'LongestHoldTime: 0\r\n' +
            'ActionID: 2\r\n' +
            '\r\n'

        const msg3 =
            'Event: QueueSummary\r\n' +
            'Queue: 6500\r\n' +
            'LoggedIn: 0\r\n' +
            'Available: 0\r\n' +
            'Callers: 0\r\n' +
            'HoldTime: 0\r\n' +
            'TalkTime: 0\r\n' +
            'LongestHoldTime: 0\r\n' +
            'ActionID: 2\r\n' +
            '\r\n' +
            'Event: QueueSummary\r\n' +
            'Queue: 6501\r\n' +
            'LoggedIn: 0\r\n' +
            'Available: 0\r\n' +
            'Callers: 0\r\n' +
            'HoldTime: 0\r\n' +
            'TalkTime: 0\r\n' +
            'LongestHoldTime: 0\r\n' +
            'ActionID: 2\r\n' +
            '\r\n' +
            'Event: QueueSummaryComplete\r\n' +
            'ActionID: 2\r\n'

        const msg4 = 'EventList: Complete\r\nListItems: 8\r\n\r\n'

        const cb = jest.fn()

        const delayedResultCollector = new AMIDelayedResultCollector().on(
            AMIDelayedResultCollectorEvents.ActionResult,
            cb
        )

        const reader = new AMIDataReader().on(
            AMIDataReaderEvents.Result,
            (result) => delayedResultCollector.collect(result)
        )
        reader.onNewData(Buffer.from(msg1))
        reader.onNewData(Buffer.from(msg2))
        reader.onNewData(Buffer.from(msg3))
        reader.onNewData(Buffer.from(msg4))

        expect(cb).toHaveBeenCalledTimes(1)
        expect(cb).toHaveBeenCalledWith('2', [
            {
                Event: 'QueueSummary',
                Queue: '6506',
                LoggedIn: '0',
                Available: '0',
                Callers: '0',
                HoldTime: '0',
                TalkTime: '0',
                LongestHoldTime: '0',
                ActionID: '2',
            },
            {
                Event: 'QueueSummary',
                Queue: '6507',
                LoggedIn: '1',
                Available: '1',
                Callers: '0',
                HoldTime: '0',
                TalkTime: '0',
                LongestHoldTime: '0',
                ActionID: '2',
            },
            {
                Event: 'QueueSummary',
                Queue: '6504',
                LoggedIn: '0',
                Available: '0',
                Callers: '0',
                HoldTime: '0',
                TalkTime: '0',
                LongestHoldTime: '0',
                ActionID: '2',
            },
            {
                Event: 'QueueSummary',
                Queue: '6505',
                LoggedIn: '0',
                Available: '0',
                Callers: '0',
                HoldTime: '0',
                TalkTime: '0',
                LongestHoldTime: '0',
                ActionID: '2',
            },
            {
                Event: 'QueueSummary',
                Queue: '6502',
                LoggedIn: '0',
                Available: '0',
                Callers: '0',
                HoldTime: '0',
                TalkTime: '0',
                LongestHoldTime: '0',
                ActionID: '2',
            },
            {
                Event: 'QueueSummary',
                Queue: '6503',
                LoggedIn: '0',
                Available: '0',
                Callers: '0',
                HoldTime: '0',
                TalkTime: '0',
                LongestHoldTime: '0',
                ActionID: '2',
            },
            {
                Event: 'QueueSummary',
                Queue: '6500',
                LoggedIn: '0',
                Available: '0',
                Callers: '0',
                HoldTime: '0',
                TalkTime: '0',
                LongestHoldTime: '0',
                ActionID: '2',
            },
            {
                Event: 'QueueSummary',
                Queue: '6501',
                LoggedIn: '0',
                Available: '0',
                Callers: '0',
                HoldTime: '0',
                TalkTime: '0',
                LongestHoldTime: '0',
                ActionID: '2',
            },
        ])
    })

    test('Emit instantly if no buffering needed', () => {
        const msg1 =
            'Response: Success\r\n' +
            'ActionID: 5\r\n' +
            'Ping: Pong\r\n' +
            'Timestamp: 1705566353.826955\r\n' +
            '\r\n'

        const cb = jest.fn()

        const delayedResultCollector = new AMIDelayedResultCollector().on(
            AMIDelayedResultCollectorEvents.ActionResult,
            cb
        )

        const reader = new AMIDataReader().on(
            AMIDataReaderEvents.Result,
            (result) => delayedResultCollector.collect(result)
        )
        reader.onNewData(Buffer.from(msg1))

        expect(cb).toHaveBeenCalledTimes(1)
        expect(cb).toHaveBeenCalledWith('5', {
            Response: 'Success',
            ActionID: '5',
            Ping: 'Pong',
            Timestamp: '1705566353.826955',
        })
    })

    test(`Don't know how to handle events without ActionID`, () => {
        const msg1 =
            'Response: Success\r\n' +
            'Ping: Pong\r\n' +
            'Timestamp: 1705566353.826955\r\n' +
            '\r\n'

        const cb = jest.fn()

        const delayedResultCollector = new AMIDelayedResultCollector().on(
            AMIDelayedResultCollectorEvents.ActionResult,
            cb
        )

        const reader = new AMIDataReader().on(
            AMIDataReaderEvents.Result,
            (result) => delayedResultCollector.collect(result)
        )
        reader.onNewData(Buffer.from(msg1))

        expect(cb).toHaveBeenCalledTimes(0)
    })

    test('Should read long data', () => {
        const chunks = fs
            .readFileSync(path.join(__dirname, 'raw/gs_agent_raw_data.txt'))
            .toString()
            .split('\n')
            .map((line) => {
                try {
                    return JSON.parse(line).chunk
                } catch (e) {
                    return ''
                }
            })

        const cb = jest.fn().mockImplementation((actionID, payload) => {
            expect(payload).toHaveLength(25)
        })

        const delayedResultCollector = new AMIDelayedResultCollector().on(
            AMIDelayedResultCollectorEvents.ActionResult,
            cb
        )

        const reader = new AMIDataReader().on(
            AMIDataReaderEvents.Result,
            (result) => delayedResultCollector.collect(result)
        )

        chunks.forEach((msg1) => {
            reader.onNewData(Buffer.from(msg1))
        })

        expect(cb).toHaveBeenCalledTimes(1)
    })
})
