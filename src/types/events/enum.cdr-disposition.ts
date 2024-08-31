export enum AMICdrDisposition {
    NO_ANSWER = 'NO ANSWER', // The channel was not answered
    FAILED = 'FAILED', // The channel attempted to dial but the call failed
    BUSY = 'BUSY', // The channel attempted to dial but the remote party was busy
    ANSWERED = 'ANSWERED', // The channel was answered
    CONGESTION = 'CONGESTION', // The channel attempted to dial but the remote party was congested
}
