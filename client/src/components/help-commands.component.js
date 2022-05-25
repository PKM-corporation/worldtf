import React from 'react';
import { useTranslation } from 'react-i18next';

const HelpCommandsComponent = () => {
    const { t } = useTranslation();
    return (
        <div className="help-command">
            <span className="sender">{t('command.help')}</span>
            <span className="command">/mp [pseudo] [message]</span>
            <span className="command">/tp [pseudo]</span>
            <span className="command">/help</span>
        </div>
    );
};

export default HelpCommandsComponent;
