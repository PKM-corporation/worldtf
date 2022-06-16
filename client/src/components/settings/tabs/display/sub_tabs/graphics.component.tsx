/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import SettingSelectComponent from '../../../select.component';
import SettingSliderComponent from '../../../slider.component';
import SettingToggleComponent from '../../../toggle.component';

const SettingGraphicsComponent = () => {
    const { t } = useTranslation();
    return (
        <>
            <SettingSliderComponent name={t('settings.frameCap')} value={60} min={0} max={1000} step={10} />
            <SettingSliderComponent name={t('settings.resolution')} value={1} min={0.1} max={2} step={0.1} />
            <SettingToggleComponent name={t('settings.aliasing')} value={false} />
            <SettingSliderComponent name={t('settings.fov')} value={70} min={60} max={150} step={5} />
            <SettingSelectComponent
                name={t('settings.precision')}
                options={[
                    ['low', t('settings.low')],
                    ['medium', t('settings.medium')],
                    ['high', t('settings.high')],
                ]}
                value={'high'}
            />
            {/* powerPreference https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.2 */}
            <SettingSelectComponent
                name={t('settings.performance')}
                options={[
                    ['default', t('settings.default')],
                    ['low', t('settings.low')],
                    ['high', t('settings.high')],
                ]}
                value={'default'}
            />
            <SettingSliderComponent name={t('settings.renderDistance')} value={100} min={1} max={100} step={1} />
            <SettingToggleComponent name={t('settings.shadows')} value={true} />
        </>
    );
};

export default SettingGraphicsComponent;
