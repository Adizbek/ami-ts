import { AMIExtensionStatusCode } from './enum.extension-status-code'
import { AMIExtensionStatusText } from './enum.extension-status-text'
import { AMIEvents } from './enum.events'

export interface AMIExtensionStatusEvent {
    Event: AMIEvents.ExtensionStatus
    Privilege: string // Privilege level required to receive the event
    Exten: string // The extension number associated with the event
    Context: string // The dial plan context in which the extension exists
    Hint: string // The hint or reference that describes the status of the extension
    Status: AMIExtensionStatusCode // Numeric code representing the current status of the extension
    StatusText: AMIExtensionStatusText // Human-readable text describing the status of the extension
}
