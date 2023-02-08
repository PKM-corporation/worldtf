import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './app.router';
import store from './store/store';
import './style/index.scss';

const root = ReactDOM.createRoot(document.querySelector('#root')!);
root.render(
    <Router>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </Router>,
);
