import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/auth.service';
import { useTranslation } from 'react-i18next';
import '../translations/i18n';
import { AxiosError } from 'axios';

const SignFormComponent = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidMessage, setInvalidMessage] = useState(<></>);
    const { t } = useTranslation();

    const executeSignIn = async () => {
        if (!username || !password || !email) {
            return setInvalidMessage(<p className="mb-3 text-center invalid-message">{t('warn.empty')}</p>);
        }
        if (!/^\w{3,25}$/.test(username)) {
            return setInvalidMessage(<p className="mb-3 text-center invalid-message">{t('warn.invalidName')}</p>);
        }
        if (!/^\S{6,25}$/.test(password)) {
            return setInvalidMessage(<p className="mb-3 text-center invalid-message">{t('warn.invalidPwd')}</p>);
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return setInvalidMessage(<p className="mb-3 text-center invalid-message">{t('warn.email')}</p>);
        }
        try {
            await signIn(username, email, password);
            setInvalidMessage(<></>);
            navigate('/');
        } catch (e) {
            if (e instanceof AxiosError && e.status === '409') {
                return setInvalidMessage(<p className="mb-3 text-center invalid-message">{t('warn.taken')}</p>);
            }
            console.error(e);
            return setInvalidMessage(<p className="mb-3 text-center invalid-message">{t('warn.error')}</p>);
        }
    };

    return (
        <div className="col-sm-5  d-flex col-12 justify-content-center">
            <div className="row " id="registerForm">
                <h3 className="p-3 text-center ">{t('log.signup')}</h3>
                {invalidMessage}
                <div className="form-floating mb-3">
                    <input
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        value={username}
                        type="text"
                        className="form-control"
                        id="floatingPseudo"
                        placeholder={t('log.username')}
                    />
                    <label htmlFor="floatingInput">{t('log.username')}</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder={t('log.email')}
                    />
                    <label htmlFor="floatingInput">{t('log.email')}</label>
                </div>
                <div className="form-floating ">
                    <input
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder={t('log.password')}
                    />
                    <label htmlFor="floatingPassword">{t('log.password')}</label>
                </div>
                <span className="mt-3 d-flex justify-content-center">
                    <button className="btnForm" onClick={executeSignIn}>
                        <span>{t('log.signup')}</span>
                    </button>
                </span>
            </div>
        </div>
    );
};

export default SignFormComponent;
