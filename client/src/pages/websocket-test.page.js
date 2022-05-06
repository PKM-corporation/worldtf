import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const WebsocketTestPage = () => {
    const socket = io('ws://localhost:4000', { query: { userId: 'test' } });
    useEffect(() => {
        socket.on('Players', (data) => {
            console.log(data);
        });
        socket.on('Chat', (data) => {
            console.log(data);
        });
        socket.on('Warning', (data) => {
            console.log(data);
        });
    }, []);
    return (
        <div>
            <div onClick={() => socket.emit('Chat', { type: 'Chat', message: 'salut' })}>test</div>
        </div>
    );
};

export default WebsocketTestPage;
