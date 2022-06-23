import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IStoreStates } from '../../interfaces/store.interface';
import loader from '../../assets/loader.svg';

const ConnectionLoader = () => {
    const { t } = useTranslation();
    const connected = useSelector((state: IStoreStates) => state.websocket.connected);

    if (connected) return <></>;
    return (
        <div className="loader">
            <p className="loader-text">{t('loading.connection')}</p>
            <img src={loader} alt="" />
        </div>
    );
};

export default ConnectionLoader;
