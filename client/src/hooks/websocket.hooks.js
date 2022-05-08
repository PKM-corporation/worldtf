import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { addPlayer, animPlayer, choiceModelPlayer, initPlayers, movePlayer, removePlayer } from '../store/slices/players.slice';

export const server = io(process.env.REACT_APP_BASE_WEBSOCKET_SERVER_URI, { query: { userId: 'test' } });

export const useWebsocketServer = () => {
    const dispatch = useDispatch();
    const players = useSelector((state) => state.players.players);
    useEffect(() => {
        server.on('Players', (data) => {
            switch (data.type) {
                case 'RemovePlayer':
                    dispatch(removePlayer(data.id));
                    break;
                case 'AddPlayer':
                    dispatch(addPlayer(data.player));
                    break;
                case 'InitPlayers':
                    dispatch(initPlayers(data.players));
                    break;
                case 'Move':
                    dispatch(movePlayer(data));
                    break;
                case 'Anim':
                    dispatch(animPlayer(data));
                    break;
                case 'Model':
                    dispatch(choiceModelPlayer(data));
                    break;
                default:
                    break;
            }
        });
        server.on('Chat', (data) => {
            console.log(data);
        });
        server.on('Warning', (data) => {
            console.log(data);
        });
    }, []);

    useEffect(() => {
        console.log(players);
    }, [players]);
};
