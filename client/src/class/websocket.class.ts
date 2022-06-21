import { IWebsocketErrorDto, IWebsocketErrorOptions, TWebsocketError } from '../interfaces/websocket.interface';

export class WebsocketError {
    constructor(error: IWebsocketErrorDto) {
        this.type = error.type;
        if (error.status) this.status = error.status;
        this.options = {
            ...(error.sender && { sender: error.sender }),
            ...(error.time && { time: error.time }),
            ...(error.day && { day: error.day }),
            ...(error.duration && { duration: error.duration }),
            ...(error.message && { reason: error.message }),
        };
    }
    toObject(): IWebsocketErrorObject {
        return {
            type: this.type,
            status: this.status,
            options: this.options,
        };
    }
    type: TWebsocketError;
    status?: number;
    options?: IWebsocketErrorOptions;
}

export interface IWebsocketErrorObject {
    type: TWebsocketError;
    status?: number;
    options?: IWebsocketErrorOptions;
}
