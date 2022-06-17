import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IWarningObject } from '../../../class/chat.class';
import { IStoreStates } from '../../../interfaces/store.interface';

interface IProps {
    id: number;
}

const WarningMessageComponent = ({ id }: IProps) => {
    const warning = useSelector((state: IStoreStates) => state.chat.data[id] as IWarningObject);
    const { t } = useTranslation();
    return (
        <div className={`${warning.type} ${warning.category} message`}>
            <span className="content">{t(`warning.${warning.category}`)}</span>
        </div>
    );
};

export default WarningMessageComponent;
