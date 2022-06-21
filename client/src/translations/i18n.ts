import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { TRANSLATION_EN } from './en/translation';
import { TRANSLATION_FR } from './fr/translation';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: TRANSLATION_EN,
        },
        fr: {
            translation: TRANSLATION_FR,
        },
    },
});

i18n.changeLanguage('fr');

export default i18n;
