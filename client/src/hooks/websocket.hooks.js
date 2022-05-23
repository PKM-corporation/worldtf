import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { MessageTypes } from '../common/constant';
import { addMessage } from '../store/slices/chat.slice';
import { addPlayer, animPlayer, choiceModelPlayer, initPlayers, movePlayer, removePlayer } from '../store/slices/players.slice';

export let server = null;

export const useWebsocketServer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const players = useSelector((state) => state.players);
    useEffect(() => {
        const accessToken = window.localStorage.getItem('access_token');
        if (!accessToken) return navigate('/authenticate');

        server = io(process.env.REACT_APP_BASE_WEBSOCKET_SERVER_URI, { query: { userId: 'test' }, auth: { token: accessToken } });
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
                default:
                    break;
            }
        });
        server.on('PlayerAction', (data) => {
            switch (data.type) {
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
            dispatch(
                addMessage({
                    type: data.type,
                    content: data.message,
                    sender: data.id,
                }),
            );
        });
        server.on('Warning', (data) => {
            console.log(data);
        });

        return () => {
            server.disconnect();
        };
    }, []);
    useEffect(() => {
        // console.log(players);
    }, [players]);
};
