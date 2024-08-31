import { describe, test } from '@jest/globals'
import { AMIDataReader, AMIDataReaderEvents } from '../src'

describe('AMI data reader module', () => {
    test('Should read multiple events', () => {
        const msg =
            'Event: Newexten\r\n' +
            'Privilege: dialplan,all\r\n' +
            'Channel: PJSIP/trunk_1-0000000e\r\n' +
            'ChannelState: 4\r\n' +
            'ChannelStateDesc: Ring\r\n' +
            'CallerIDName: \r\n' +
            'ConnectedLineNum: \r\n' +
            'ConnectedLineName: \r\n' +
            'Language: ru\r\n' +
            'AccountCode: \r\n' +
            'Context: ext-did-1\r\n' +
            'Priority: 1\r\n' +
            'Callid: SBC5234zz1w9h45swzs1wag49us64n2934u@SoftX3000\r\n' +
            'Linkedid: 1705512769.103\r\n' +
            'PageFlag: false\r\n' +
            'Application: Set\r\n' +
            'Reg_calleenum: \r\n' +
            'Reg_callernum: \r\n' +
            'Reg_callername: \r\n' +
            'Uniqueid: 1705512769.103\r\n' +
            'Application: Set\r\n' +
            'AppData: tmp_callerid_name=\r\n' +
            '\r\n' +
            'Event: Newexten\r\n' +
            'Privilege: dialplan,all\r\n' +
            'Channel: PJSIP/trunk_1-0000000e\r\n' +
            'ChannelState: 4\r\n' +
            'ChannelStateDesc: Ring\r\n' +
            'CallerIDNum: 936568689\r\n' +
            'CallerIDName: \r\n' +
            'ConnectedLineNum: \r\n' +
            'ConnectedLineName: \r\n' +
            'Language: ru\r\n' +
            'AccountCode: \r\n' +
            'Context: ext-did-1\r\n' +
            'Priority: 2\r\n' +
            'Callid: SBC5234zz1w9h45swzs1wag49us64n2934u@SoftX3000\r\n' +
            'Linkedid: 1705512769.103\r\n' +
            'PageFlag: false\r\n' +
            'Application: Set\r\n' +
            'Reg_calleenum: \r\n' +
            'Reg_callernum: \r\n' +
            'Reg_callername: \r\n' +
            'Uniqueid: 1705512769.103\r\n' +
            'Application: Set\r\n' +
            'AppData: blocking_this_did_collect_calls=no\r\n' +
            '\r\n' +
            'Event: Newexten\r\n' +
            'Privilege: dialplan,all\r\n' +
            'Channel: PJSIP/trunk_1-0000000e\r\n' +
            'ChannelState: 4\r\n' +
            'ChannelStateDesc: Ring\r\n' +
            'CallerIDNum: 936568689\r\n' +
            'CallerIDName: \r\n' +
            'ConnectedLineNum: \r\n' +
            'ConnectedLineName: \r\n' +
            'Language: ru\r\n' +
            'AccountCode: \r\n' +
            'Context: ext-did-1\r\n' +
            'Priority: 3\r\n' +
            'Callid: SBC5234zz1w9h45swzs1wag49us64n2934u@SoftX3000\r\n' +
            'Linkedid: 1705512769.103\r\n' +
            'PageFlag: false\r\n' +
            'Application: ExecIf\r\n' +
            'Reg_calleenum: \r\n' +
            'Reg_callernum: \r\n' +
            'Reg_callername: \r\n' +
            'Uniqueid: 1705512769.103\r\n' +
            'Application: ExecIf\r\n' +
            'AppData: 1?Set(__CF_REASON=7)\r\n' +
            '\r\n'

        const reader = new AMIDataReader()

        const cb = jest.fn()

        reader.on(AMIDataReaderEvents.Result, cb)

        reader.onNewData(Buffer.from(msg))

        expect(cb).toHaveBeenCalledTimes(3)
    })

    test('One event can be sent in multiple packets', () => {
        const msg1 = 'Response: Success\r\nActionID: 1\r\n'
        const msg2 = 'Message: Authentication accepted\r\n\r\n'

        const reader = new AMIDataReader()

        const cb = jest.fn()

        reader.on(AMIDataReaderEvents.Result, cb)

        reader.onNewData(Buffer.from(msg1))
        reader.onNewData(Buffer.from(msg2))

        expect(cb).toHaveBeenCalledTimes(1)
    })

    test('One event can be sent in multiple packets in arbitary format', () => {
        const msg1 = 'Response: Success\r\nAct'
        const msg2 = 'ionID: 1\r\nMessage: Authentication accepted\r\n\r\n'

        const reader = new AMIDataReader()

        const cb = jest.fn()

        reader.on(AMIDataReaderEvents.Result, cb)

        reader.onNewData(Buffer.from(msg1))
        reader.onNewData(Buffer.from(msg2))

        expect(cb).toHaveBeenCalledTimes(1)
        expect(cb).toHaveBeenCalledWith({
            Response: 'Success',
            ActionID: '1',
            Message: 'Authentication accepted',
        })
    })

    test('Read if event value contains multiple :', () => {
        const msg1 =
            'ConfbridgeList: List participants in a conference.  (Priv: reporting,all)\r\n' +
            'ConfbridgeListRooms: List active conferences.  (Priv: reporting,all)\r\n\r\n'

        const reader = new AMIDataReader()

        const cb = jest.fn()

        reader.on(AMIDataReaderEvents.Result, cb)

        reader.onNewData(Buffer.from(msg1))

        expect(cb).toHaveBeenCalledTimes(1)
        expect(cb).toHaveBeenCalledWith({
            ConfbridgeList:
                'List participants in a conference.  (Priv: reporting,all)',
            ConfbridgeListRooms:
                'List active conferences.  (Priv: reporting,all)',
        })
    })

    test('Read special welcome message', () => {
        const msg = 'Asterisk Call Manager/2.7.0\r\n'
        const msg2 = 'Asterisk Call Manager/5.7.0\r\n'

        const reader = new AMIDataReader()

        const cb = jest.fn()

        reader.on(AMIDataReaderEvents.Welcome, cb)

        reader.onNewData(Buffer.from(msg))
        reader.onNewData(Buffer.from(msg2))

        expect(cb).toHaveBeenCalledTimes(2)
    })

    test('Should read null properties', () => {
        const msg =
            'Response: Success\r\n' +
            'ActionID: 2\r\n' +
            'AMIversion: 5.0.1\r\n' +
            'AsteriskVersion: 16.7.0\r\n' +
            'SystemName: \r\n' +
            'CoreMaxCalls: 0\r\n' +
            'CoreMaxLoadAvg: 0.000000\r\n' +
            'CoreRunUser: \r\n' +
            'CoreRunGroup: \r\n' +
            'CoreMaxFilehandles: 0\r\n' +
            'CoreRealTimeEnabled: No\r\n' +
            'CoreCDRenabled: Yes\r\n' +
            'CoreHTTPenabled: No\r\n' +
            '\r\n'

        const reader = new AMIDataReader()

        const cb = jest.fn().mockImplementation((result) => {
            expect(result).toEqual({
                Response: 'Success',
                ActionID: '2',
                AMIversion: '5.0.1',
                AsteriskVersion: '16.7.0',
                SystemName: '',
                CoreMaxCalls: '0',
                CoreMaxLoadAvg: '0.000000',
                CoreRunUser: '',
                CoreRunGroup: '',
                CoreMaxFilehandles: '0',
                CoreRealTimeEnabled: 'No',
                CoreCDRenabled: 'Yes',
                CoreHTTPenabled: 'No',
            })
        })

        reader.on(AMIDataReaderEvents.Result, cb)

        reader.onNewData(Buffer.from(msg))

        expect(cb).toHaveBeenCalledTimes(1)
    })
})
