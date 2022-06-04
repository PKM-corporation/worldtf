import React from 'react';
import { useTranslation } from 'react-i18next';
import loader from '../assets/loader.svg';

const LoaderComponent = () => {
    const { t } = useTranslation();
    return (
        <div className="loader">
            <p className="loader-text">{t('home.loading')}</p>
            <img src={loader} alt="Chargement..." />
        </div>
    );
};

export default LoaderComponent;
