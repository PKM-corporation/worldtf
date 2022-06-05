/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import SettingSelectComponent from '../../../select.component';
import i18n from '../../../../../translations/i18n';

const SettingLanguageComponent = (props) => {
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    const { t } = useTranslation();
    return (
        <SettingSelectComponent
            name={t('settings.language')}
            options={[
                ['en', 'English'],
                ['fr', 'Français'],
            ]}
            value={i18n.language}
            callBack={changeLanguage}
        />
    );
};

export default SettingLanguageComponent;
