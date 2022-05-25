import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { MessageTypes } from '../common/constant';
import { server } from '../hooks/websocket.hooks';

const ChatComponent = () => {
    const [text, setText] = useState('');
    const messages = useSelector((state) => state.chat.chatList);
    const chatRef = useRef();

    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages]);
    return (
        <>
            <div className="chat" id="chat">
                <div className="chatContent" ref={chatRef} id="chatContent">
                    {messages.map((message, i) => (
                        <div className={`${message.type} message`} key={i}>
                            {message.sender ? <span className="sender">[{message.sender}]:</span> : ''}
                            <span className="content">{message.content}</span>
                        </div>
                    ))}
                </div>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (text[0] === '/') {
                        server.emit('Command', { type: 'Command', command: text });
                    } else {
                        server.emit('Chat', { type: 'Chat', message: text });
                    }
                    setText('');
                }}
            >
                <input onChange={(e) => setText(e.target.value)} value={text} autoComplete="off" type="text" id="inputChat" />
            </form>
        </>
    );
};
export default ChatComponent;
