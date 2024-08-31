/* eslint-disable */
import { config } from 'dotenv'
import AMI, { AvailableAMIEvents } from '../src'

config()

const ami = new AMI({
    host: process.env.AMI_HOST ?? '127.0.0.1',
    port: Number(process.env.AMI_PORT) || 5038,
    username: process.env.AMI_USERNAME ?? 'AMI_USER',
    password: process.env.AMI_PASSWORD ?? 'AMI_PASS',
    reconnect: true,
    keepAlive: true,
    listenEvents: true,
    logger: console,
})

ami.connect()
    .then(async () => {
        ami.on('*', (event) => {
            if (!AvailableAMIEvents.includes(event.Event)) {
                console.log('New event: ', event)
            } else {
                console.log(`New event: ${event.Event}`, event)
            }
        })
    })
    .catch(console.error)
