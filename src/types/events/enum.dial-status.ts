export enum AMIDialStatus {
    ABORT = 'ABORT', // The call was aborted.
    ANSWER = 'ANSWER', // The caller answered.
    BUSY = 'BUSY', // The caller was busy.
    CANCEL = 'CANCEL', // The caller cancelled the call.
    CHANUNAVAIL = 'CHANUNAVAIL', // The requested channel is unavailable.
    CONGESTION = 'CONGESTION', // The called party is congested.
    CONTINUE = 'CONTINUE', // The dial completed, but the caller elected to continue in the dialplan.
    GOTO = 'GOTO', // The dial completed, but the caller jumped to a dialplan location.
    NOANSWER = 'NOANSWER', // The called party failed to answer.
}
