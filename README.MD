
# AMI-TS

A Node.js package for interacting with the Asterisk Manager Interface (AMI). This package is fully written in TypeScript, providing robust types and interfaces for AMI actions and events, making it easier to work with Asterisk in a type-safe manner.

## Features

- **TypeScript Support**: Fully typed interfaces for AMI actions and events.
- **Event-Driven Architecture**: Uses event emitters to handle AMI events efficiently.
- **Reconnection Logic**: Automatic reconnection support with configurable intervals.
- **Keep-Alive Support**: Periodic pinging to maintain the connection.
- **Command Buffering**: Handles command buffering for asynchronous AMI responses.

## Installation

Install the package using npm:

```bash
npm install ami-ts
```

Or using yarn:

```bash
yarn add ami-ts
```

## Usage

### Basic Example

Below is a basic example demonstrating how to use the `ami-ts` package to connect to an Asterisk server and handle events:

```typescript
import AMI from 'ami-ts';

const ami = new AMI({
  host: 'localhost',
  port: 5038,
  username: 'admin',
  password: 'secret',
  logger: console, // Optional: provide a logger for debugging
});

ami.connect()
  .then(() => {
    console.log('Connected and authenticated to Asterisk Manager Interface');

    // Listening to all events
    ami.on('*', (event) => {
      console.log('Event received:', event);
    });

    // Listening to specific events
    ami.on('onNewCallerid', (event) => {
      console.log('New Caller ID:', event);
    });

    // Sending an action
    ami.sendAction({
      Action: 'Ping',
    }).then((response) => {
      console.log('Ping response:', response);
    });
  })
  .catch((error) => {
    console.error('Failed to connect:', error);
  });
```

## API Documentation

### AMI Class

#### Constructor

`new AMI(options: AMIOptions)`

- `options` - Configuration options for connecting to the AMI server:
  - `host` (string): The hostname or IP address of the AMI server.
  - `port` (number): The port number of the AMI server (default is `5038`).
  - `username` (string): The AMI username for authentication.
  - `password` (string): The AMI password for authentication.
  - `keepAlive` (boolean): Whether to enable keep-alive pinging (default is `true`).
  - `reconnect` (boolean): Whether to automatically reconnect on connection loss (default is `true`).
  - `reconnectInterval` (number): The interval in milliseconds to wait before attempting to reconnect (default is `2000` ms).
  - `listenEvents` (boolean): Whether to listen for AMI events (default is `true`).
  - `readTimeout` (number): Timeout for reading data from AMI (default is `60000` ms).
  - `pingInterval` (number): Interval for sending keep-alive pings (default is `30000` ms).
  - `logger` (object): Optional logger object for debugging.

#### Methods

- `connect(): Promise<void>`: Connects to the AMI server and handles authentication.
- `disconnect(allowReconnect: boolean = false): void`: Disconnects from the AMI server. Optionally prevents automatic reconnection.
- `sendAction<T>(action: AMIAction): Promise<T>`: Sends an action to the AMI server and returns a promise that resolves with the result.
- `on<TEventName>(eventName: string, handler: (event: AMIEvent) => void): this`: Registers an event handler for a specific AMI event.

### Events

### Events

- *: Wildcard event that captures all events.
- **onQueueMemberStatus**: Fires when the status of a queue member changes.
- **onDeviceStateChange**: Fires when a device's state changes.
- **onHangupRequest**: Fires when a hangup is requested.
- **onExtensionStatus**: Fires when the status of an extension changes.
- **onQueueStatus**: Fires when the status of a queue is updated.
- **onQueueMemberPause**: Fires when a queue member is paused.
- **onCdr**: Fires when a Call Detail Record (CDR) is generated.
- **onHangup**: Fires when a call is hung up.
- **onActiveCount**: Fires when active call counts are updated.
- **onSoftHangupRequest**: Fires when a soft hangup request is made.
- **onDialBegin**: Fires when a call begins to dial.
- **onDialEnd**: Fires when a call finishes dialing.
- **onNewConnectedLine**: Fires when a new connected line is detected.
- **onNewCallerid**: Fires when a new Caller ID is detected.
- **onNewchannel**: Fires when a new channel is created.
- **onQueueVqCallers**: Fires when callers in a queue are updated.
- **onBridgeCreate**: Fires when a bridge is created.
- **onBridgeDestroy**: Fires when a bridge is destroyed.
- **onBridgeEnter**: Fires when a channel enters a bridge.
- **onBridgeLeave**: Fires when a channel leaves a bridge.
- **onQueueCallerJoin**: Fires when a caller joins a queue.
- **onQueueCallerHangup**: Fires when a caller in a queue hangs up.
- **onQueueCallerLeave**: Fires when a caller leaves a queue.
- **onQueueCallerAbandon**: Fires when a caller abandons a queue.
- **onAgentConnect**: Fires when an agent connects to a caller in a queue.
- **onAgentCalled**: Fires when an agent is notified of a caller.
- **onAgentComplete**: Fires when an agent completes a call.
- **onAgentRingNoAnswer**: Fires when an agent's phone rings but is not answered.
- **onMusicOnHoldStart**: Fires when music on hold starts.
- **onMusicOnHoldStop**: Fires when music on hold stops.
- **onDTMFBegin**: Fires when DTMF tone begins.
- **onDTMFEnd**: Fires when DTMF tone ends.


## Development

### Scripts

- `npm run build`: Compiles the TypeScript code to JavaScript.
- `npm run test`: Runs the tests using Jest.
- `npm run lint`: Lints the code using ESLint.
- `npm run format`: Formats the code using Prettier.

### Testing

To run tests, use:

```bash
npm run test
```

### Linting

To check for linting errors, use:

```bash
npm run lint
```

To automatically fix linting errors, use:

```bash
npm run lint:fix
```

### Formatting

To check code formatting, use:

```bash
npm run format:check
```

To format the code, use:

```bash
npm run format:write
```

## Contributing

Contributions are welcome! Please submit issues or pull requests on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Maintainers

- [Adizbek Ergashev](https://github.com/adizbek) (adizbek1998@gmail.com)
