import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Warning } from '../../class/chat.class';
import { IStoreStates } from '../../interfaces/store.interface';

interface IProps {
    id: number;
}

const WarningMessageComponent = ({ id }: IProps) => {
    const warning = useSelector((state: IStoreStates) => state.chat.data[id] as Warning);
    const { t } = useTranslation();
    return (
        <div className={`${warning.type} ${warning.category} message`}>
            <span className="content">{t(`log.${warning.category}`)}</span>
        </div>
    );
};

export default WarningMessageComponent;
