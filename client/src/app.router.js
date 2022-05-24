import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import GamePage from './pages/game.page';
import AuthenticatePage from './pages/authenticate.page';
import HomePage from './pages/home.page';
import SettingsPage from './pages/settings.page';
import { useDispatch } from 'react-redux';
import { removeUser, setUser } from './store/slices/user.slice';
import { getUserById } from './services/users.service';

const AppRouter = () => {
    const [invalid, setInvalid] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUserAndStore = async (id, accessToken) => {
        try {
            const user = await getUserById(id);
            user.accessToken = accessToken;
            dispatch(setUser(user));
            navigate('/');
        } catch (e) {
            if (e.status === 401) {
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
                <div>Une erreur est survenue, revenez plus tard...</div>
            </div>
        );
    }
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/universe" element={<GamePage />} />
            <Route path="/authenticate" element={<AuthenticatePage />} />
            <Route path="/settings" element={<SettingsPage />} />
        </Routes>
    );
};

export default AppRouter;
