/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IStoreStates } from '../../interfaces/store.interface';
import SettingTabsComponent from './tabs.component';
import SettingDisplayTabsComponent from './tabs/display/display.component';
import SettingGameTabsComponent from './tabs/game/game.component';
import SettingSoundsTabsComponent from './tabs/sounds/sounds.component';
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { InterfaceSliceActions } from '../../store/slices/interface.slice';

const SettingsComponent = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const showSettings = useSelector((state: IStoreStates) => state.interface.showSettings);

    if (!showSettings) return <></>;
    return (
        <div id="settings">
            <div className="position-relative">
                <IoClose className="close-icon" onClick={() => dispatch(InterfaceSliceActions.setShowSettings(false))} />
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
