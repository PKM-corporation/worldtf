import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignFormComponent = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidMessage, setInvalidMessage] = useState();

    const sign = async () => {
        if (!username || !password || !email) {
            return setInvalidMessage(<p className="mb-3 text-center invalid-message">Veuillez remplir les champs</p>);
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return setInvalidMessage(<p className="mb-3 text-center invalid-message">Veuillez saisir une adresse email valide</p>);
        }
        try {
            const res = await axios.post(process.env.REACT_APP_BASE_API_URI + '/users/create', { pseudo: username, password, email });
            window.localStorage.setItem('access_token', res.data.access_token);
            setInvalidMessage(null);
            navigate('/');
        } catch (e) {
            if (e.response.status === 409) {
                return setInvalidMessage(<p className="mb-3 text-center invalid-message">Pseudo ou Email déjà pris</p>);
            }
            console.error(e);
            return setInvalidMessage(<p className="mb-3 text-center invalid-message">Une erreur est survenue, veuillez réessayer plus tard</p>);
        }
    };

    return (
        <div className="col-5 d-flex justify-content-center">
            <div className="row" id="registerForm">
                <h3 className="p-3 text-center ">Inscription</h3>
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
                        placeholder="Pseudo"
                    />
                    <label htmlFor="floatingInput">Pseudo</label>
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
                        placeholder="E-mail"
                    />
                    <label htmlFor="floatingInput">Adresse mail</label>
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
                        placeholder="Mot de passe"
                    />
                    <label htmlFor="floatingPassword">Mot de passe</label>
                </div>
                <span className="mt-3 d-flex justify-content-center">
                    <input onClick={sign} className="p-3 rounded-circle" type="button" value="test" />
                </span>
            </div>
        </div>
    );
};

export default SignFormComponent;
