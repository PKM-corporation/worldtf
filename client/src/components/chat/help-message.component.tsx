import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IStoreStates } from '../../interfaces/store.interface';

const HelpMessageComponent = () => {
    const user = useSelector((state: IStoreStates) => state.user.data);
    const { t } = useTranslation();
    return (
        <div className="help-command">
            <span className="sender">{t('command.help')}</span>
            <span className="description">{t('command.description')}</span>
            <span className="command">
                /mp {'{pseudo}'} {'{message}'}
            </span>
            <span className="command">/tp {'{pseudo}'}</span>
            <span className="command">/help</span>
            {user.role === 'Admin' && <span className="command">/kick {'{pseudo}'} [timeout] [reason]</span>}
            {user.role === 'Admin' && <span className="command">/mute {'{pseudo}'} [timeout] [reason]</span>}
            {user.role === 'Admin' && <span className="command">/ban {'{pseudo}'} [reason]</span>}
            {user.role === 'Admin' && (
                <span className="command">
                    /cancel {'{sanctionType}'} {'{pseudo}'}
                </span>
            )}
        </div>
    );
};

export default HelpMessageComponent;
