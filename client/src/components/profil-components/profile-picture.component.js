import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MyProfilePicture from '../../assets/profile-picture.png';

const ProfilePictureComponent = () => {
    return (
        <div className="picture-profile-div p-1 m-2 mx-5 ">
            <img src={MyProfilePicture} />
        </div>
    );
};

export default ProfilePictureComponent;
