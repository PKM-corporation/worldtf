import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IStoreStates } from '../../interfaces/store.interface';

const ElementsLoader = () => {
    const { t } = useTranslation();
    const loader = useSelector((state: IStoreStates) => state.scene.loader);

    if (loader.total === loader.progress) return <></>;
    return (
        <div className="loader">
            <div className="container">
                <div className="bar">
                    <div className="progress" style={{ width: (loader.progress * 100) / loader.total }}></div>
                </div>
                <p>{t('loading.elements')}</p>
            </div>
        </div>
    );
};

export default ElementsLoader;
