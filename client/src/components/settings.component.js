/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import SettingTabsComponent from './settings/tabs.component';
import SettingGameTabsComponent from './settings/tabs/game/game.component';
import SettingDisplayTabsComponent from './settings/tabs/display/display.component';
import SettingSoundsTabsComponent from './settings/tabs/sounds/sounds.component';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const SettingsComponent = () => {
    const { t } = useTranslation();
    const showSettings = useSelector((state) => state.interface.showSettings);

    if (!showSettings) return;
    return (
        <div id="settings">
            <div className="hide-background"></div>
            <div className="position-relative">
                <div className="row align-items-center p-3">
                    <div className="col-3 ps-4">
                        <h5 className="text-white p-1">{t('home.settings')}</h5>
                    </div>
                    <SettingTabsComponent />
                </div>
                <div className="tab-content" id="tabContent">
                    <SettingDisplayTabsComponent />
                    <SettingGameTabsComponent />
                    <SettingSoundsTabsComponent />
                </div>
            </div>
        </div>
    );
};

export default SettingsComponent;
