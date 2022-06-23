import { Chat, Log, Mp, Verbose, Warning } from '../class/chat.class';
import { IWebsocketChatDto, IWebsocketLogDto, IWebsocketMpDto, IWebsocketVerboseDto, IWebsocketWarningDto } from '../interfaces/websocket.interface';
import { ChatSliceActions } from '../store/slices/chat.slice';
import store from '../store/store';

export const pushChatMessage = (messageDto: IWebsocketChatDto | IWebsocketMpDto | IWebsocketLogDto | IWebsocketVerboseDto | IWebsocketWarningDto) => {
    let message: Chat | Mp | Log | Warning | Verbose;

    switch (messageDto.type) {
        case 'Chat':
            message = new Chat(messageDto as IWebsocketChatDto);
            break;
        case 'Mp':
            message = new Mp(messageDto as IWebsocketMpDto);
            break;
        case 'Log':
            message = new Log(messageDto as IWebsocketLogDto);
            break;
        case 'Verbose':
            message = new Verbose(messageDto as IWebsocketVerboseDto);
            break;
        case 'Warning':
            message = new Warning(messageDto as IWebsocketWarningDto);
            break;
    }

    if (message) store.dispatch(ChatSliceActions.push(message.toObject()));
};
