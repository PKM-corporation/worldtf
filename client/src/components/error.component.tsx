import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { WebsocketErrorMessages } from '../common/constant';
import { IStoreStates } from '../interfaces/store.interface';

const ErrorComponent = () => {
    const error = useSelector((state: IStoreStates) => state.websocket.error);
    const { t } = useTranslation();

    return (
        <div className="error">
            {error.status && <h2 className="status">{error.status}</h2>}
            <div className="message">{t(`error.${error.type}`, { ...error.options })}</div>
            {error.options?.day && error.options?.time && (
                <div className="date">{t('error.date', { day: error.options.day, time: error.options.time })}</div>
            )}
            {error.options?.duration && error.type !== WebsocketErrorMessages.Banned ? (
                <div className="duration">timeout: {error.options.duration}s</div>
            ) : (
                ''
            )}
            {error.options?.reason && <div className="reason">{t('error.reason', { reason: error.options?.reason })}</div>}
        </div>
    );
};

export default ErrorComponent;
