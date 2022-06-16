import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import GamePage from './pages/game.page';
import AuthenticatePage from './pages/authenticate.page';
import HomePage from './pages/home.page';
import { useSelector } from 'react-redux';
import { synchronizeUser } from './services/users.service';
import { useTranslation } from 'react-i18next';
import { IStoreStates } from './interfaces/store.interface';

const AppRouter = () => {
    const [invalid, setInvalid] = useState(false);
    const userAvailable = useSelector((state: IStoreStates) => state.user.updated > 0);
    const user = useSelector((state: IStoreStates) => state.user.data);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const getUser = async () => {
        try {
            await synchronizeUser();
            navigate('/');
        } catch (e) {
            setInvalid(true);
            throw e;
        }
    };

    useEffect(() => {
        if (!userAvailable && Object.values(user).length > 0) {
            getUser();
        } else {
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
        </Routes>
    );
};

export default AppRouter;
