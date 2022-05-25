import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/user.slice';
import { useTranslation } from 'react-i18next';
import '../translations/i18n';

const LoginFormComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidMessage, setInvalidMessage] = useState();
    const { t } = useTranslation();

    const login = async () => {
        if (!username || !password) return setInvalidMessage(<p className="mb-3 text-center invalid-message">{t('warn.empty')}</p>);
        try {
            const user = await loginUser(username, password);
            dispatch(setUser(user));
            setInvalidMessage(null);
            navigate('/');
        } catch (e) {
            if (e.response.status === 401) {
                return setInvalidMessage(<p className="mb-3 text-center invalid-message">{t('warn.log')}</p>);
            }
            throw e;
        }
    };

    return (
        <div className="col-sm-5  col-12 ">
            <h3 className="p-3 text-center ">{t('home.login')}</h3>
            {invalidMessage}
            <div className="row" id="loginForm">
                <div className="form-floating  mb-3">
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        type="text"
                        className="form-control"
                        id="floatingInputLogin"
                        placeholder={t('log.username')}
                    />
                    <label htmlFor="floatingInputLogin">{t('log.email')}</label>
                </div>
                <div className="form-floating  mb-3">
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        className="form-control"
                        id="floatingPasswordLogin"
                        placeholder={t('log.password')}
                    />
                    <label htmlFor="floatingPasswordLogin">{t('log.password')}</label>
                </div>
                <span className="mt-3 d-flex justify-content-center">
                    <button className="btnForm" onClick={login}>
                        <span>{t('home.login')}</span>
                    </button>
                </span>
            </div>
        </div>
    );
};

export default LoginFormComponent;
