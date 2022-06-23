import React from 'react';
import { useSelector } from 'react-redux';
import { IChatObject } from '../../../class/chat.class';
import { IStoreStates } from '../../../interfaces/store.interface';

interface IProps {
    id: number;
}

const ChatMessageComponent = ({ id }: IProps) => {
    const chat = useSelector((state: IStoreStates) => state.chat.data[id] as IChatObject);
    return (
        <div className={`${chat.type} message`}>
            <span className="me-1">[{chat.date}]</span>
            <span className="sender" style={{ color: chat.color }}>
                {(chat.role === 'Admin' ? ' ADMIN ~ ' : ' ') + chat.sender}:
            </span>
            <span className="content">{chat.content}</span>
        </div>
    );
};

export default ChatMessageComponent;
