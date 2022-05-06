import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GamePage from './pages/game.page';
import WebsocketTestPage from './pages/websocket-test.page';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<GamePage />} />
            <Route path="/websocket/test" element={<WebsocketTestPage />} />
        </Routes>
    );
};

export default AppRouter;
