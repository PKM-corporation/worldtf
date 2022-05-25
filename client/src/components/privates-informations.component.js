import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/profil.scss';

const ProfileComponent = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidMessage, setInvalidMessage] = useState();
    let toogleSideBar = true;

    const login = async () => {
        if (!username || !password) return setInvalidMessage(<p className="mb-3 text-center invalid-message">Veuillez remplir les champs</p>);
        try {
            const res = await axios.post(process.env.REACT_APP_BASE_API_URI + '/users/login', { username, password });
            window.localStorage.setItem('access_token', res.data.access_token);
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
        <div className="main-div-content-profile">
            <p>Mes informations</p>
        </div>
    );
};

export default ProfileComponent;
