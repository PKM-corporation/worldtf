import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GamePage from './pages/game.page';
import AuthenticatePage from './pages/authenticate.page';
import HomePage from './pages/home.page';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/universe" element={<GamePage />} />
            <Route path="/authenticate" element={<AuthenticatePage />} />
        </Routes>
    );
};

export default AppRouter;
