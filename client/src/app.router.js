import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GamePage from './pages/game.page';
import AuthenticatePage from './pages/authenticate.page';
import HomePage from './pages/home.page';
import ProfilPage from './pages/profil.page';
import ProfileComponent from './components/profile.component';
import PrivatesInformationsComponent from './components/privates-informations.component';
import AvatarComponent from './components/avatar.component';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/universe" element={<GamePage />} />
            <Route path="/authenticate" element={<AuthenticatePage />} />
            <Route path="/account" element={<ProfilPage />} />
        </Routes>
    );
};
/*<Route path="/account/profile" element={<ProfileComponent />} />
            <Route path="/account/informations" element={<PrivatesInformationsComponent />} />
            <Route path="/account/avatar" element={<AvatarComponent />} />*/
export default AppRouter;
