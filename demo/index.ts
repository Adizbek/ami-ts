/* eslint-disable */
import { config } from 'dotenv'
import AMI from '../src/AMI'

config()

const ami = new AMI({
    host: process.env.AMI_HOST ?? '127.0.0.1',
    port: Number(process.env.AMI_PORT) || 5038,
    username: process.env.AMI_USERNAME ?? 'AMI_USER',
    password: process.env.AMI_PASSWORD ?? 'AMI_PASS',
    reconnect: false,
    keepAlive: false,
    listenEvents: false,
    // logger: console
})

ami.connect()
    .then(async () => {
        // const queues = await ami.sendAction<unknown>({
        // @ts-ignore
        // Action: 'PJSIPShowEndpoints'
        // })
        const queues = await ami.actionQueueSummary()
        console.log(queues)

        ami.disconnect()
    })
    .catch(console.error)
