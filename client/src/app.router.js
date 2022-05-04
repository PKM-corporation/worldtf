import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GamePage from './pages/game.page';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<GamePage />} />
        </Routes>
    );
};

export default AppRouter;
