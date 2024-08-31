import { AMICdrDisposition } from './enum.cdr-disposition'
import { AMAFlags } from './enum.ama-flags'
import { AMIEvents } from './enum.events'

export interface AMICdrEvent {
    Event: AMIEvents.Cdr // The event type, indicating a call detail record
    Privilege: string // Privilege level required to receive the event
    AccountCode: string // Account code associated with the call, often used for billing
    Source: string // The source extension or number that initiated the call
    Destination: string // The destination number or extension being called
    DestinationContext: string // The context in which the destination is handled in the dial plan
    CallerID: string // Caller ID information of the source, including name and number
    Channel: string // The originating channel of the call
    DestinationChannel: string // The channel associated with the destination
    LastApplication: string // The last application executed on the channel (e.g., 'Dial')
    LastData: string // Arguments or data passed to the last application
    StartTime: string // The start time of the call in the format 'YYYY-MM-DD HH:MM:SS'
    AnswerTime: string // The time when the call was answered, in the same format
    EndTime: string // The time when the call ended
    Duration: string // The total duration of the call in seconds, from start to end
    BillableSeconds: string // The number of seconds that are billable (talk time)
    Disposition: AMICdrDisposition // The result of the call (e.g., 'ANSWERED', 'NO ANSWER', 'BUSY', 'FAILED')
    AMAFlags: AMAFlags // AMA (Automated Message Accounting) flags, indicating billing status
    UniqueID: string // A unique identifier for the call
    UserField: string // A custom user-defined field associated with the call
}
