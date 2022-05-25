import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/user.slice';

const LoginFormComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidMessage, setInvalidMessage] = useState();

    const login = async () => {
        if (!username || !password) return setInvalidMessage(<p className="mb-3 text-center invalid-message">Veuillez remplir les champs</p>);
        try {
            const user = await loginUser(username, password);
            dispatch(setUser(user));
            setInvalidMessage(null);
            navigate('/');
        } catch (e) {
            if (e.response.status === 401) {
                return setInvalidMessage(<p className="mb-3 text-center invalid-message">Mot de passe ou login incorrects</p>);
            }
            throw e;
        }
    };

    return (
        <div className="col-sm-5  col-12">
            <h3 className="p-3 text-center ">Connexion</h3>
            {invalidMessage}
            <div className="row" id="loginForm">
                <div className="form-floating  mb-3">
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        type="text"
                        className="form-control"
                        id="floatingInputLogin"
                        placeholder="E-mail"
                    />
                    <label htmlFor="floatingInputLogin">Adresse mail</label>
                </div>
                <div className="form-floating  mb-3">
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        className="form-control"
                        id="floatingPasswordLogin"
                        placeholder="Mot de passe"
                    />
                    <label htmlFor="floatingPasswordLogin">Mot de passe</label>
                </div>
                <span className="mt-3 d-flex justify-content-center">
                    <button className="btnForm" onClick={login}>
                        <span>Connexion</span>
                    </button>
                </span>
            </div>
        </div>
    );
};

export default LoginFormComponent;
