import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePictureComponent from './profile-picture.component';
import Pencil from '../../assets/Pencil.png';
import ChangeProfileComponent from './change-profile.component';

const PrivatesInformationsComponent = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isOpenForm, setOpenForm] = useState(false);
    const user = useSelector((state) => state.user);
    const [invalidMessage, setInvalidMessage] = useState();
    let toogleSideBar = true;
    console.log(user);
    return (
        <div className="main-div-content-profile">
            <div cl>
                <div className="d-flex p-5 align-items-center">
                    <ProfilePictureComponent />
                </div>
                <div className="d-flex justify-content-between align-items-center mx-5 pt-3">
                    <span className="h2 pr-4 text-white"> Mon pseudo : {user.pseudo}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mx-5 pt-2">
                    <span className="h2 pr-4 text-white"> Mon mail : {user.email}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mx-5">
                    <span className="h2 pr-4 text-white"> Modifier mon mot de passe </span>
                    <button>
                        <img src={Pencil} />
                    </button>
                </div>
            </div>
            <div className="w-100">{isOpenForm ? <ChangeProfileComponent /> : null}</div>
        </div>
    );
};

export default PrivatesInformationsComponent;
