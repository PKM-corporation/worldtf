import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/profil.scss';
import ProfileComponent from './profile.component';
import PrivatesInformations from './privates-informations.component';
import AvatarComponent from './avatar.component';

const SideBarProfilComponent = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isOpen, setOpen] = useState(true);
    const [isOpenInformations, setOpenInformations] = useState(false);
    const [isOpenAvatar, setOpenAvatar] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState();
    let numbers = 0;
    let profilSelect;
    function ProfilSelected() {
        profilSelect = !profilSelect;
        console.log(profilSelect);
    }

    console.log(profilSelect);

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
        <div className="d-flex main-div-side-bar">
            <nav className="nav flex-column w-25 background-side-bar ">
                <button
                    className={isOpen ? 'show' : 'hidden'}
                    aria-current="page"
                    href="#"
                    onClick={() => {
                        setOpen(true);
                        setOpenInformations(false);
                        setOpenAvatar(false);
                    }}
                >
                    Mon profil
                </button>
                <button
                    className={isOpenInformations ? 'show' : 'hidden'}
                    href="#"
                    onClick={() => {
                        setOpen(false);
                        setOpenInformations(true);
                        setOpenAvatar(false);
                    }}
                >
                    Mes informations personnelles
                </button>
                <button
                    className={isOpenAvatar ? 'show' : 'hidden'}
                    href="#"
                    onClick={() => {
                        setOpen(false);
                        setOpenInformations(false);
                        setOpenAvatar(true);
                    }}
                >
                    Mon avatar
                </button>
            </nav>
            <div className="w-100">
                {isOpen ? <ProfileComponent /> : null}
                {isOpenInformations ? <PrivatesInformations /> : null}
                {isOpenAvatar ? <AvatarComponent /> : null}
            </div>
        </div>
    );
};

export default SideBarProfilComponent;
