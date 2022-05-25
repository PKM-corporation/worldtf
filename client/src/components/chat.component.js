import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../hooks/websocket.hooks';
import { useTranslation } from 'react-i18next';
import HelpCommandsComponent from './help-commands.component';
import { setIsChatting } from '../store/slices/interface.slice';
import { MessageTypes } from '../common/constant';

const ChatComponent = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const messages = useSelector((state) => state.chat.chatList);
    const color = useSelector((state) => state.chat.color);
    const chatRef = useRef();
    const { t } = useTranslation();

    const chat = (e) => {
        e.stopPropagation();
        dispatch(setIsChatting(true));
    };

    const now = new Date();

    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages]);
    return (
        <>
            <div className="chat" id="chat">
                <div className="chatContent" ref={chatRef} id="chatContent">
                    {messages.map((message, i) => (
                        <div className={`${message.type} message`} key={i}>
                            <span className="me-1">{'[' + now.getHours() + ':' + now.getMinutes() + '] '}</span>
                            {message.sender ? (
                                <span className="sender" style={{ color: message.color }}>
                                    {' ' + message.sender}:
                                </span>
                            ) : (
                                ''
                            )}
                            {message.type === MessageTypes.Logs && <span className="content">{t(`log.${message.content}`, message.options)}</span>}
                            {message.type === MessageTypes.Help && <HelpCommandsComponent />}
                            {(message.type === MessageTypes.Chat || message.type === MessageTypes.Mp) && (
                                <span className="content">{message.content}</span>
                            )}
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
                        server.emit('Chat', { type: 'Chat', message: text, color });
                    }
                    setText('');
                }}
            >
                <input
                    onClick={(e) => chat(e)}
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    autoComplete="off"
                    type="text"
                    id="inputChat"
                />
            </form>
        </>
    );
};
export default ChatComponent;
