import React from 'react';
import { useTranslation } from 'react-i18next';
import SettingSliderComponent from '../../../slider.component';

const SettingAudioComponent = () => {
    const { t } = useTranslation();
    return (
        <>
            <SettingSliderComponent name={t('settings.masterVolume')} value={1} min={0.1} max={1} step={0.1} />
            <SettingSliderComponent name={t('settings.ambientVolume')} value={1} min={0.1} max={1} step={0.1} />
            <SettingSliderComponent name={t('settings.actionVolume')} value={1} min={0.1} max={1} step={0.1} />
        </>
    );
};

export default SettingAudioComponent;
