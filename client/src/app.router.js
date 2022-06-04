import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import GamePage from './pages/game.page';
import AuthenticatePage from './pages/authenticate.page';
import HomePage from './pages/home.page';
import ProfilPage from './pages/profil.page';
import SettingsPage from './pages/settings.page';
import { useDispatch } from 'react-redux';
import { removeUser, setUser } from './store/slices/user.slice';
import { getUserById } from './services/users.service';
import { useTranslation } from 'react-i18next';

const AppRouter = () => {
    const [invalid, setInvalid] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const getUserAndStore = async (id, accessToken) => {
        try {
            const user = await getUserById(id);
            user.accessToken = accessToken;
            dispatch(setUser(user));
            navigate('/');
        } catch (e) {
            if (e.status === 401 || e.response.status === 401) {
                dispatch(removeUser());
                navigate('/');
            } else {
                setInvalid(true);
                throw e;
            }
        }
    };

    useEffect(() => {
        const accessToken = window.localStorage.getItem('accessToken');
        const userId = window.localStorage.getItem('userId');
        if (accessToken && userId) {
            getUserAndStore(userId, accessToken);
        } else {
            dispatch(removeUser());
            navigate('/');
        }
    }, []);

    if (invalid) {
        return (
            <div className="error">
                <div>{t('warn.error')}</div>
            </div>
        );
    }
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/universe" element={<GamePage />} />
            <Route path="/authenticate" element={<AuthenticatePage />} />
            <Route path="/account" element={<ProfilPage />} />
            <Route path="/settings" element={<SettingsPage />} />
        </Routes>
    );
};
/*<Route path="/account/profile" element={<ProfileComponent />} />
            <Route path="/account/informations" element={<PrivatesInformationsComponent />} />
            <Route path="/account/avatar" element={<AvatarComponent />} />*/
export default AppRouter;
