import { describe, test } from '@jest/globals'
import * as fs from 'fs'
import * as path from 'path'
import {
    AMIDataReader,
    AMIDataReaderEvents,
    AMIResultCollector,
    AMIResultCollectorEvents,
} from '../src'

describe('AMI  result collector module', () => {
    test(' event should constructed correctly', () => {
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

        const ResultCollector = new AMIResultCollector().on(
            AMIResultCollectorEvents.ActionResult,
            cb
        )

        const reader = new AMIDataReader().on(
            AMIDataReaderEvents.Result,
            (result) => ResultCollector.collect(result)
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

        const ResultCollector = new AMIResultCollector().on(
            AMIResultCollectorEvents.ActionResult,
            cb
        )

        const reader = new AMIDataReader().on(
            AMIDataReaderEvents.Result,
            (result) => ResultCollector.collect(result)
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

        const ResultCollector = new AMIResultCollector().on(
            AMIResultCollectorEvents.ActionResult,
            cb
        )

        const reader = new AMIDataReader().on(
            AMIDataReaderEvents.Result,
            (result) => ResultCollector.collect(result)
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

        const ResultCollector = new AMIResultCollector().on(
            AMIResultCollectorEvents.ActionResult,
            cb
        )

        const reader = new AMIDataReader().on(
            AMIDataReaderEvents.Result,
            (result) => ResultCollector.collect(result)
        )

        chunks.forEach((msg1) => {
            reader.onNewData(Buffer.from(msg1))
        })

        expect(cb).toHaveBeenCalledTimes(1)
    })

    test('Should collect events with no ActionID', () => {
        const msg =
            'Event: Newexten\r\n' +
            'Privilege: dialplan,all\r\n' +
            'Channel: PJSIP/trunk_1-000073be\r\n' +
            'ChannelState: 6\r\n' +
            'ChannelStateDesc: Up\r\n' +
            'CallerIDNum: 77150722\r\n' +
            'CallerIDName: \r\n' +
            'ConnectedLineNum: 7000\r\n' +
            'ConnectedLineName: \r\n' +
            'Language: ru\r\n' +
            'AccountCode: \r\n' +
            'Context: macro-user-callerid\r\n' +
            'Exten: s\r\n' +
            'Priority: 27\r\n' +
            'Callid: SBC5u96aang3332nn65w43hna59h2ss020a@SoftX3000\r\n' +
            'Linkedid: 1725084324.93266\r\n' +
            'PageFlag: false\r\n' +
            'Application: Set\r\n' +
            'Reg_calleenum: \r\n' +
            'Reg_callernum: \r\n' +
            'Reg_callername: \r\n' +
            'Uniqueid: 1725084324.93266\r\n' +
            'Extension: s\r\n' +
            'Application: Set\r\n' +
            'AppData: TMPUSER=trunk_1-000073be\r\n\r\n'

        const cb = jest.fn().mockImplementation((payload) => {
            expect(payload).toHaveProperty('Event')
            expect(payload).toHaveProperty('CallerIDNum')
            expect(payload.CallerIDNum).toEqual('77150722')
        })

        const ResultCollector = new AMIResultCollector().on(
            AMIResultCollectorEvents.Event,
            cb
        )
        const reader = new AMIDataReader().on(
            AMIDataReaderEvents.Result,
            (result) => {
                ResultCollector.collect(result)
            }
        )
        reader.onNewData(Buffer.from(msg))

        expect(cb).toHaveBeenCalledTimes(1)
    })
})
