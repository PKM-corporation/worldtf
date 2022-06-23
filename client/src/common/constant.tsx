export const MessageTypes = {
    Chat: 'Chat',
    Mp: 'Mp',
    Logs: 'Logs',
    Warning: 'Warning',
    Help: 'Help',
    Verbose: 'Verbose',
    Sanction: 'Sanction',
};

export const WebsocketEvent = {
    PlayerAction: 'PlayerAction',
    Chat: 'Chat',
    Logs: 'Logs',
    Warning: 'Warning',
    Players: 'Players',
    Command: 'Command',
};

export const WebsocketErrorMessages = {
    AlreadyLogin: 'AlreadyLogin',
    IncorrectToken: 'IncorrectToken',
    Kicked: 'Kicked',
    Banned: 'Banned',
};

export const Animations = {
    WalkingForward: 'Walking_forward',
    WalkingLeft: 'Walking_left',
    WalkingRight: 'Walking_right',
    WalkingBackward: 'Walking_backward',
    RunningForward: 'Running_forward',
    RunningBackward: 'Running_backward',
    RunningLeft: 'Running_left',
    RunningRight: 'Running_right',
    Jumping: 'Jumping',
    FallingIdle: 'Falling_idle',
    FallingToLanding: 'Falling_to_landing',
    Idle: 'Idle',
};

export const PlayerSpeed = 4;
export const PlayerRunSpeed = 8;
export const PlayerJumpSpeed = 5;
export const PlayerJumpCooldown = 1250;

export const PlayerMovePrecision = 10;
