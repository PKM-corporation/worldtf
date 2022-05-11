import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="login-container">
                <div onClick={() => navigate('/authenticate')}>connexion</div>
                <div onClick={() => navigate('/authenticate')}>inscription</div>
            </div>
            <div className="menu">
                <div onClick={() => navigate('/universe')}>Jouer</div>
            </div>
        </div>
    );
};

export default HomePage;
