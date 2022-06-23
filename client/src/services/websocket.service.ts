import { WebsocketError } from '../class/websocket.class';
import { server } from '../hooks/websocket.hooks';
import {
    IWebsocketEmitDataCommandDto,
    IWebsocketEmitDataMessageDto,
    IWebsocketEmitDataPlayerActionDto,
    IWebsocketErrorDto,
    TWebsocketEvents,
} from '../interfaces/websocket.interface';
import { WebsocketSliceActions } from '../store/slices/websocket.slice';
import store from '../store/store';

export const synchronizeWebsocketError = (errorDto: IWebsocketErrorDto) => {
    const websocketError = new WebsocketError(errorDto);
    store.dispatch(WebsocketSliceActions.setWebsocketError(websocketError.toObject()));
};

export const websocketEmitData = (
    event: TWebsocketEvents,
    data: IWebsocketEmitDataPlayerActionDto | IWebsocketEmitDataMessageDto | IWebsocketEmitDataCommandDto,
) => {
    if (!server.connected) throw new Error('ClientDisconnected');
    server.emit(event, data);
};
