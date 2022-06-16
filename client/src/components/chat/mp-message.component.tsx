import React from 'react';
import { useSelector } from 'react-redux';
import { Mp } from '../../class/chat.class';
import { IStoreStates } from '../../interfaces/store.interface';

interface IProps {
    id: number;
}

const MpMessageComponent = ({ id }: IProps) => {
    const mp = useSelector((state: IStoreStates) => state.chat.data[id] as Mp);
    return (
        <div className={`${mp.type} message`}>
            <span className="me-1">[{mp.date}]</span>
            <span className="sender">{mp.sender}:</span>
            <span className="content">{mp.content}</span>
        </div>
    );
};

export default MpMessageComponent;
