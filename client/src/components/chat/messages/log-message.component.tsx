import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ILogObject } from '../../../class/chat.class';
import { IStoreStates } from '../../../interfaces/store.interface';

interface IProps {
    id: number;
}

const LogMessageComponent = ({ id }: IProps) => {
    const log = useSelector((state: IStoreStates) => state.chat.data[id] as ILogObject);
    const { t } = useTranslation();
    return (
        <div className={`${log.type} ${log.category} message`}>
            <span className="me-1">[{log.date}]</span>
            <span className="content">{t(`log.${log.category}`, log.options)}</span>
        </div>
    );
};

export default LogMessageComponent;
