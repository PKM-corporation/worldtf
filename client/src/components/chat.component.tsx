import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreStates } from '../interfaces/store.interface';
import { InterfaceSliceActions } from '../store/slices/interface.slice';
import { TMessage } from '../interfaces/chat.interface';
import ChatMessageComponent from './chat/chat-message.component';
import LogMessageComponent from './chat/log-message.component';
import MpMessageComponent from './chat/mp-message.component';
import VerboseMessageComponent from './chat/verbose-message.component';
import WarningMessageComponent from './chat/warning-message.component';
import { websocketEmitData } from '../services/websocket.service';

const ChatComponent = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const messages = useSelector((state: IStoreStates) => state.chat.data);
    const color = useSelector((state: IStoreStates) => state.chat.color);
    const isChatting = useSelector((state: IStoreStates) => state.interface.isChatting);
    const chatRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const getMessageComponentByType = (type: TMessage, id: number): JSX.Element => {
        switch (type) {
            case 'Chat':
                return <ChatMessageComponent id={id} key={id} />;
            case 'Log':
                return <LogMessageComponent id={id} key={id} />;
            case 'Mp':
                return <MpMessageComponent id={id} key={id} />;
            case 'Verbose':
                return <VerboseMessageComponent id={id} key={id} />;
            case 'Warning':
                return <WarningMessageComponent id={id} key={id} />;
        }
    };

    useEffect(() => {
        if (isChatting) {
            inputRef.current && inputRef.current.focus();
        } else {
            inputRef.current && inputRef.current.blur();
        }
    }, [isChatting]);

    useEffect(() => {
        if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages]);
    return (
        <div className="chat-container">
            <div className="chat" id="chat">
                <div className="chatContent" ref={chatRef} id="chatContent">
                    {messages.map((message, i) => getMessageComponentByType(message.type, i))}
                </div>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (text[0] === '/') {
                        websocketEmitData('Command', { type: 'Command', command: text });
                    } else {
                        websocketEmitData('Message', { type: 'Chat', message: text, color });
                    }
                    setText('');
                }}
            >
                <input
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(InterfaceSliceActions.setIsChatting(true));
                    }}
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    ref={inputRef}
                    autoComplete="off"
                    type="text"
                    id="inputChat"
                />
            </form>
        </div>
    );
};
export default ChatComponent;
