import React from 'react';
import SettingKeybindsComponent from '../../../keybinds.component';
import { useTranslation } from 'react-i18next';

const GameMovementComponent = () => {
    const { t } = useTranslation();
    return (
        <>
            <SettingKeybindsComponent name={t('settings.forward')} keybinds={'z'} keybindsDefault={'z'} />
            <SettingKeybindsComponent name={t('settings.backward')} keybinds={'s'} keybindsDefault={'s'} />
            <SettingKeybindsComponent name={t('settings.left')} keybinds={'q'} keybindsDefault={'q'} />
            <SettingKeybindsComponent name={t('settings.right')} keybinds={'d'} keybindsDefault={'d'} />
            <SettingKeybindsComponent name={t('settings.jump')} keybinds={t('settings.space')} keybindsDefault={t('settings.space')} />
        </>
    );
};

export default GameMovementComponent;
