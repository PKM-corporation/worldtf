import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './app.router';
import './style/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <AppRouter />
    </Router>,
);
