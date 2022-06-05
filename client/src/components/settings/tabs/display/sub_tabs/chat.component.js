/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import SettingSliderComponent from '../../../slider.component';
import SettingToggleComponent from '../../../toggle.component';

const SettingChatComponent = (props) => {
    const { t } = useTranslation();
    return (
        <>
            <SettingToggleComponent name={t('settings.showChat')} value={true} defaultValue={true} />
            <SettingSliderComponent name={t('settings.scaleChat')} value={1} defaultValue={1} min={0.1} max={1} step={0.1} />
            <SettingSliderComponent name={t('settings.opacityChat')} value={1} defaultValue={1} min={0.1} max={1} step={0.1} />
            <SettingToggleComponent name={t('settings.showPlayerMessage')} value={true} defaultValue={true} />
            <SettingToggleComponent name={t('settings.showEventPlayersMessage')} value={true} defaultValue={true} />
        </>
    );
};

export default SettingChatComponent;
