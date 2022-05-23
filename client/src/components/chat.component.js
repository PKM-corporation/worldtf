import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { server } from '../hooks/websocket.hooks';

const ChatComponent = () => {
    const [text, setText] = useState('');
    const messages = useSelector((state) => state.chat.chatList);
    const players = useSelector((state) => state.players);
    const chatRef = useRef();

    useEffect(() => {
        console.log('test');
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages]);
    return (
        <>
            <div className="chat" id="chat">
                <div className="chatContent" ref={chatRef} id="chatContent">
                    {messages.map((message, i) => (
                        <div className={`${message.type} message`} key={i}>
                            <span className="sender">[{message.sender}]:</span>
                            <span className="content">{message.content}</span>
                        </div>
                    ))}
                </div>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    server.emit('Chat', { type: 'Chat', message: text });
                    setText('');
                }}
            >
                <input onChange={(e) => setText(e.target.value)} value={text} autoComplete="off" type="text" id="inputChat" />
            </form>
        </>
    );
};
export default ChatComponent;
