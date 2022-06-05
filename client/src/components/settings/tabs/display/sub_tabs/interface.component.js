/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import SettingSelectComponent from '../../../select.component';
import SettingSliderComponent from '../../../slider.component';
import SettingToggleComponent from '../../../toggle.component';

const SettingInterfaceComponent = (props) => {
    const { t } = useTranslation();
    return (
        <>
            <SettingToggleComponent name={t('settings.showFPS')} value={false} defaultValue={false} />
            <SettingToggleComponent name={t('settings.showNameTags')} value={true} defaultValue={true} />
            <SettingSliderComponent name={t('settings.scaleNameTags')} value={1} defaultValue={1} min={0.1} max={1} step={0.1} />
            <SettingSliderComponent name={t('settings.opacityNameTags')} value={1} defaultValue={1} min={0.1} max={1} step={0.1} />
            <SettingSelectComponent
                name={t('settings.listOfPlayers')}
                options={[
                    ['toggle', `${t('settings.press')} (${t('settings.toggle')})`],
                    ['hold', `${t('settings.continuous')} (${t('settings.hold')})`],
                ]}
                value={'toggle'}
            />
            <SettingToggleComponent name={t('settings.hidePlayers')} value={false} defaultValue={false} />
        </>
    );
};

export default SettingInterfaceComponent;
