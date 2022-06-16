import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { WebsocketSliceActions } from '../store/slices/websocket.slice';
import {
    IWebsocketChatDto,
    IWebsocketDataPlayerActionDto,
    IWebsocketDataPlayersDto,
    IWebsocketErrorDto,
    IWebsocketLogDto,
    IWebsocketMpDto,
    IWebsocketPlayerDto,
    IWebsocketVerboseDto,
    IWebsocketWarningDto,
} from '../interfaces/websocket.interface';
import { IStoreStates } from '../interfaces/store.interface';
import { setNewPlayer, synchronizePlayers } from '../services/player.service';
import { PlayersSliceActions } from '../store/slices/players.slice';
import { ICoordinates, TAnimation } from '../interfaces/player.interface';
import { synchronizeWebsocketError } from '../services/websocket.service';
import { PlayerSliceActions } from '../store/slices/player.slice';
import { pushChatMessage } from '../services/chat.service';

export let server: Socket;

export const useWebsocketServer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userAvailable = useSelector((state: IStoreStates) => state.user.updated > 0);
    const user = useSelector((state: IStoreStates) => state.user);
    useEffect(() => {
        if (!userAvailable) return navigate('/authenticate');

        server = io(process.env.REACT_APP_BASE_WEBSOCKET_SERVER_URI as string, {
            auth: { token: user.data.accessToken },
            extraHeaders: { Authorization: 'Bearer ' + user.data.accessToken },
        });

        server.on('disconnect', () => {
            dispatch(WebsocketSliceActions.setWebsocketConnected(false));
        });
        server.on('connect', () => {
            dispatch(WebsocketSliceActions.setWebsocketConnected(true));
        });
        server.on('Error', (data: IWebsocketErrorDto) => {
            synchronizeWebsocketError(data);
        });
        server.on('Players', (data: IWebsocketDataPlayersDto) => {
            switch (data.type) {
                case 'RemovePlayer':
                    dispatch(PlayersSliceActions.removePlayer(data.player?.id as string));
                    break;
                case 'AddPlayer':
                    setNewPlayer(data.player as IWebsocketPlayerDto);
                    break;
                case 'InitPlayers':
                    synchronizePlayers(data.players as IWebsocketPlayerDto[]);
                    break;
                default:
                    break;
            }
        });
        server.on('PlayerAction', (data: IWebsocketDataPlayerActionDto) => {
            switch (data.type) {
                case 'Move':
                    dispatch(PlayersSliceActions.setPosition({ id: data.id, position: data.position as ICoordinates }));
                    break;
                case 'Rotate':
                    dispatch(PlayersSliceActions.setRotation({ id: data.id, rotation: data.rotation as ICoordinates }));
                    break;
                case 'Anim':
                    dispatch(PlayersSliceActions.setAnimation({ id: data.id, animation: data.animation as TAnimation }));
                    break;
                case 'Tp':
                    dispatch(PlayerSliceActions.setPosition(data.position as ICoordinates));
                    break;
                default:
                    break;
            }
        });
        server.on('Message', (data: IWebsocketChatDto | IWebsocketMpDto | IWebsocketLogDto | IWebsocketVerboseDto | IWebsocketWarningDto) => {
            pushChatMessage(data);
        });

        return () => {
            server.disconnect();
        };
    }, []);
};
