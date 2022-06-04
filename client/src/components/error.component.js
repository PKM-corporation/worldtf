/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { WebsocketErrorMessages } from '../common/constant';

const ErrorComponent = () => {
    const error = useSelector((state) => state.websocket.error);
    const [message, setMessage] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        switch (error.type) {
            case WebsocketErrorMessages.AlreadyLogin:
                setMessage(t('error.alreadyLogin'));
                break;
            case WebsocketErrorMessages.IncorrectToken:
                setMessage(t('error.incorrectToken'));
                break;
            case WebsocketErrorMessages.Kicked:
                setMessage(t('error.kicked', { sender: error.sender }));
                break;
            case WebsocketErrorMessages.Banned:
                setMessage(t('error.banned', { sender: error.sender }));
                break;
        }
    }, [error]);

    return (
        <div className="error">
            {error.status && <h2 className="status">{error.status}</h2>}
            <div className="message">{message}</div>
            {error.day && error.time && <div className="date">{t('error.date', { day: error.day, time: error.time })}</div>}
            {error.duration && error.type !== WebsocketErrorMessages.Banned ? <div className="duration">timeout: {error.duration}s</div> : ''}
            {error.message && <div className="reason">{t('error.reason', { reason: error.message })}</div>}
        </div>
    );
};

export default ErrorComponent;
