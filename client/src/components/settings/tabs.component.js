import React from 'react';
import { useTranslation } from 'react-i18next';

const SettingTabsComponent = () => {
    const { t } = useTranslation();
    return (
        <div className="col">
            <ul className="nav nav-tabs nav-fill" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link p-1 active h5 text-white"
                        id="display-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#display"
                        type="button"
                        role="tab"
                        aria-controls="display"
                        aria-selected="false"
                    >
                        {t('settings.display')}
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link p-1 h5 text-white"
                        id="game-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#game"
                        type="button"
                        role="tab"
                        aria-controls="game"
                        aria-selected="true"
                    >
                        {t('settings.game')}
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link p-1 h5 text-white"
                        id="sounds-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#sounds"
                        type="button"
                        role="tab"
                        aria-controls="sounds"
                        aria-selected="false"
                    >
                        {t('settings.sounds')}
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default SettingTabsComponent;
