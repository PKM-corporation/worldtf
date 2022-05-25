import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../services/auth.service';
import { setUser } from '../store/slices/user.slice';
import { useTranslation } from 'react-i18next';
import '../translations/i18n';

const SignFormComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidMessage, setInvalidMessage] = useState();
    const { t } = useTranslation();

    const sign = async () => {
        if (!username || !password || !email) {
            return setInvalidMessage(<p className="mb-3 text-center invalid-message">{t('warn.empty')}</p>);
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return setInvalidMessage(<p className="mb-3 text-center invalid-message">{t('warn.email')}</p>);
        }
        try {
            const user = await signInUser(username, email, password);
            dispatch(setUser(user));
            setInvalidMessage(null);
            navigate('/');
        } catch (e) {
            if (e.response.status === 409) {
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
                    <button className="btnForm" onClick={sign}>
                        <span>{t('log.signup')}</span>
                    </button>
                </span>
            </div>
        </div>
    );
};

export default SignFormComponent;
