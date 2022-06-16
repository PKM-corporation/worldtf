export type TMessage = 'Chat' | 'Mp' | 'Log' | 'Verbose' | 'Warning';

export type TVerbose = 'Tp' | 'Cancel' | 'Help';

export type TLog = 'Connection' | 'Disconnection' | 'Kick' | 'Ban' | 'Mute';

export type TWarning =
    | 'Spam'
    | 'IncorrectTarget'
    | 'DisconnectedTarget'
    | 'InsufficientRights'
    | 'Muted'
    | 'UserAlreadySanctioned'
    | 'UserNotSanctioned';
