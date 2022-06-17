import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IVerboseObject } from '../../../class/chat.class';
import { IStoreStates } from '../../../interfaces/store.interface';
import HelpMessageComponent from './help-message.component';

interface IProps {
    id: number;
}

const VerboseMessageComponent = ({ id }: IProps) => {
    const verbose = useSelector((state: IStoreStates) => state.chat.data[id] as IVerboseObject);
    const { t } = useTranslation();
    if (verbose.category === 'Help') return <HelpMessageComponent />;
    return (
        <div className={`${verbose.type} ${verbose.category} message`}>
            <span className="content">{t(`verbose.${verbose.category}`, verbose.options)}</span>
        </div>
    );
};

export default VerboseMessageComponent;
