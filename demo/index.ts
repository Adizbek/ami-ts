/* eslint-disable */
import { config } from 'dotenv'
import AMI from '../src/AMI'
import { AvailableAMIEvents } from '../src/types/ami.events'

config()

const ami = new AMI({
    host: process.env.AMI_HOST ?? '127.0.0.1',
    port: Number(process.env.AMI_PORT) || 5038,
    username: process.env.AMI_USERNAME ?? 'AMI_USER',
    password: process.env.AMI_PASSWORD ?? 'AMI_PASS',
    reconnect: true,
    keepAlive: true,
    listenEvents: true,
    // logger: console,
})

ami.connect()
    .then(async () => {
        ami.on('*', (event) => {
            if (
                !AvailableAMIEvents.includes(event.Event) &&
                // @ts-ignore
                event.Event !== 'Newexten' &&
                // @ts-ignore
                event.Event !== 'Newstate'
            ) {
                console.log('New event: ', event)
            }
        })

        // ami.on('onAgentComplete', (event) => {
        //     console.log('onAgentComplete', event)
        // })

        // ami.on('onQueueMemberStatus', (event) => {
        //     console.log('New event: ', event)
        // })
        // // const queues = await ami.sendAction<unknown>({
        // //     //     @ts-ignore
        // //     Action: 'CoreShowChannels',
        // // })
        // // // Implement Queues
        // // const queues = await ami.sendAction<unknown>({
        // //     // @ts-ignore
        // //     Action: 'ExtensionState',
        // //     Exten: '6500',
        // //     //
        // // })
        //
        // const result = await ami.actionQueuePause('PJSIP/171', false)
        // console.log(result)
        //
        // const result2 = await ami.actionQueuePause('PJSIP/171', false)
        // console.log(result2)
        //
        // const queues = await ami.actionQueueStatus(undefined, 'PJSIP/171')
        // // const queues = await ami.actionQueueStatus('6500')
        // console.log(queues)
        // ami.disconnect()

        // let result = await ami.sendAction({
        //     Action: 'CoreShowChannels',
        // })

        /**
         *   {
         *     Event: 'CoreShowChannel',
         *     ActionID: '2',
         *     Channel: 'PJSIP/173-00003410',
         *     ChannelState: '6',
         *     ChannelStateDesc: 'Up',
         *     CallerIDNum: '173',
         *     CallerIDName: 'Operator-3',
         *     ConnectedLineNum: '936568689',
         *     ConnectedLineName: '',
         *     Language: 'ru',
         *     AccountCode: '',
         *     Context: 'from-internal',
         *     Exten: '6500',
         *     Priority: '1',
         *     Callid: '151e00c0-72c1-4f08-aaf5-a3f735be0116',
         *     Linkedid: '1706190170.44818',
         *     PageFlag: 'false',
         *     Application: 'AppQueue',
         *     Reg_calleenum: '',
         *     Reg_callernum: '',
         *     Reg_callername: '',
         *     Uniqueid: '1706190202.44830',
         *     ApplicationData: '(Outgoing Line)',
         *     Duration: '00:03:31',
         *     BridgeId: '5eda973a-e513-4c11-ae63-217ce5ad03f2'
         *   }
         */

        // let result = await ami.actionCoreShowChannels()

        // console.log(result)
        // ami.disconnect()
    })
    .catch(console.error)
