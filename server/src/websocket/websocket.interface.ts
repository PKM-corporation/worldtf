// example :
export type TWebsocketDataType = 'chat' | 'move' | 'jump';

export interface IWebsocketData {
    type: TWebsocketDataType;
    content: any;
}
