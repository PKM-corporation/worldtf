import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePictureComponent from './profile-picture.component';

const ProfileComponent = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector((state) => state.user);
    const [invalidMessage, setInvalidMessage] = useState();
    let toogleSideBar = true;
    console.log(user);
    return (
        <div className="main-div-content-profile">
            <div>
                <div className="d-flex p-5 align-items-center">
                    <ProfilePictureComponent />
                    <span className="h2 pr-4 text-white">{user.pseudo}</span>
                </div>
                <div className=" d-flex flex-column text-white mx-auto div-statistics w-75">
                    <span className="m-3 fs-4">Mes statistiques</span>
                    <div className="d-flex flex-column ms-5 my-4 fs-5">
                        <span>Temps de jeu</span>
                        <span>Membre depuis</span>
                        <span>Dernière connexion</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileComponent;
