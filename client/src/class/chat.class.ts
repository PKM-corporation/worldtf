import { TLog, TMessage, TVerbose, TWarning } from '../interfaces/chat.interface';
import { TRole, TSanction } from '../interfaces/user.interface';
import { IWebsocketChatDto, IWebsocketLogDto, IWebsocketMpDto, IWebsocketVerboseDto, IWebsocketWarningDto } from '../interfaces/websocket.interface';

export class Chat {
    constructor(message: IWebsocketChatDto) {
        this.type = 'Chat';
        this.sender = message.sender;
        this.color = message.color;
        this.date = message.date;
        this.role = message.role;
        this.content = message.content;
    }
    toObject(): IChatObject {
        return {
            type: this.type,
            sender: this.sender,
            color: this.color,
            date: this.date,
            role: this.role,
            content: this.content,
        };
    }
    type: TMessage;
    sender: string;
    color: string;
    date: string;
    role: TRole;
    content: string;
}

export interface IChatObject {
    type: TMessage;
    sender: string;
    color: string;
    date: string;
    role: TRole;
    content: string;
}

export class Mp {
    constructor(message: IWebsocketMpDto) {
        this.type = 'Chat';
        this.sender = message.sender;
        this.date = message.date;
        this.content = message.content;
    }

    toObject(): IMpObject {
        return {
            type: this.type,
            sender: this.sender,
            date: this.date,
            content: this.content,
        };
    }
    type: TMessage;
    sender: string;
    date: string;
    content: string;
}

export interface IMpObject {
    type: TMessage;
    sender: string;
    date: string;
    content: string;
}

export class Log {
    constructor(message: IWebsocketLogDto) {
        this.type = 'Log';
        this.category = message.category;
        this.date = message.date;
        if (message.options) this.options = message.options;
    }

    toObject(): ILogObject {
        return {
            type: this.type,
            category: this.category,
            date: this.date,
            options: this.options,
        };
    }
    type: TMessage;
    category: TLog;
    date: string;
    options?: {
        pseudo?: string;
        target?: string;
    };
}

export interface ILogObject {
    type: TMessage;
    category: TLog;
    date: string;
    options?: {
        pseudo?: string;
        target?: string;
    };
}

export class Verbose {
    constructor(message: IWebsocketVerboseDto) {
        this.type = 'Verbose';
        this.category = message.category;
        if (message.options) this.options = message.options;
    }

    toObject(): IVerboseObject {
        return {
            type: this.type,
            category: this.category,
            options: this.options,
        };
    }
    type: TMessage;
    category: TVerbose;
    options?: {
        pseudo?: string;
        target?: string;
        sanction?: TSanction;
    };
}

export interface IVerboseObject {
    type: TMessage;
    category: TVerbose;
    options?: {
        pseudo?: string;
        target?: string;
        sanction?: TSanction;
    };
}

export class Warning {
    constructor(message: IWebsocketWarningDto) {
        this.type = 'Warning';
        this.category = message.category;
    }

    toObject(): IWarningObject {
        return {
            type: this.type,
            category: this.category,
        };
    }

    type: TMessage;
    category: TWarning;
}

export interface IWarningObject {
    type: TMessage;
    category: TWarning;
}
