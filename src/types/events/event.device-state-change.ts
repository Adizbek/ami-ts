import { AMIDeviceState } from './enum.device-state'
import { AMIEvents } from './enum.events'

export interface AMIDeviceStateChangeEvent {
    Event: AMIEvents.DeviceStateChange
    Privilege: string
    // The name of the device whose state has changed
    // e.g: 'PJSIP/171', 'Queue:6500', 'PJSIP/trunk_1'
    Device: string
    State: AMIDeviceState
}
