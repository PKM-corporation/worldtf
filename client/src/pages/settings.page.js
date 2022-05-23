import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BackgroundComponent from '../components/background.component';
import i18n from '../translations/i18n';

const SettingsPage = () => {
    const navigate = useNavigate();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    const { t } = useTranslation();

    return (
        <div>
            <BackgroundComponent />
            <div className="content">
                <h1 className="text-center neonText pt-4">Universe</h1>
                <div className=" h-75 d-flex justify-content-end align-items-center">
                    <div className="row w-25">
                        <span className="mt-3">
                            <div className="menu">
                                <h2 className="text-large">{t('home.language')}</h2>
                                <div className="language">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span className="text-small navButton" onClick={() => changeLanguage('fr')}>
                                                        FR
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="text-small navButton" onClick={() => changeLanguage('en')}>
                                                        EN
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <h2 className="navButton" onClick={() => navigate('/')}>
                                    {t('home.back')}
                                </h2>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
