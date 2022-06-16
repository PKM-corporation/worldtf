import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackgroundComponent from '../components/background.component';
import { useTranslation } from 'react-i18next';
import '../translations/i18n';
import { getConnectedPlayers } from '../services/users.service';
import SettingsComponent from '../components/settings.component';
import { IStoreStates } from '../interfaces/store.interface';
import { InterfaceSliceActions } from '../store/slices/interface.slice';
import { logout } from '../services/auth.service';

const HomePage = () => {
    const navigate = useNavigate();
    const userAvailable = useSelector((state: IStoreStates) => state.user.updated > 0);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [connectedPlayers, setConnectedPlayers] = useState();
    useEffect(() => {
        getConnectedPlayers().then((data) => {
            setConnectedPlayers(data.onlineClients);
        });
    }, []);

    return (
        <div className="home">
            <BackgroundComponent />
            <SettingsComponent />
            <div className="content">
                <div className="playersOnline">
                    {Number.isInteger(connectedPlayers) ? (
                        <p className="textOnlinePlayer">{t('home.onlinePlayers', { onlinePlayers: connectedPlayers })}</p>
                    ) : (
                        ''
                    )}
                </div>
                <h1 className="text-center neonText pt-4">Universe</h1>
                <div className="h-75 d-flex justify-content-center justify-content-xl-end  align-items-center ">
                    <div className="row w-25">
                        <span className="mt-3">
                            {userAvailable && (
                                <div className="menu">
                                    <h2 className="navButton" onClick={() => navigate('/universe')}>
                                        {t('home.play')}
                                    </h2>
                                    <h2 className="navButton" onClick={() => dispatch(InterfaceSliceActions.setShowSettings(true))}>
                                        {t('home.settings')}
                                    </h2>
                                    <h2 className="navButton">{t('home.credits')}</h2>
                                    <h2
                                        className="navButton py-5"
                                        onClick={async () => {
                                            logout();
                                        }}
                                    >
                                        {t('home.logout')}
                                    </h2>
                                </div>
                            )}
                            {!userAvailable && (
                                <div className="menu">
                                    <h2 className="navButton homePageConnexion" onClick={() => navigate('/authenticate')}>
                                        {t('home.login')}
                                    </h2>
                                </div>
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
