import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundComponent from '../components/background.component';

const HomePage = () => {
    const navigate = useNavigate();
    const logout = () => {
        window.localStorage.removeItem('access_token');
        navigate('/authenticate');
    };
    const isConnected = window.localStorage.access_token;

    return (
        <div className="home">
            <BackgroundComponent />
            <div className="content">
                <h1 className="text-center neonText pt-4">Universe</h1>
                <div className=" h-75 d-flex justify-content-end align-items-center">
                    <div className="row w-25">
                        <span className="mt-3">
                            {isConnected && (
                                <div className="menu">
                                    <h2 className="navButton" onClick={() => navigate('/universe')}>
                                        Jouer
                                    </h2>
                                    <h2 className="navButton" onClick={() => navigate('/settings')}>
                                        Paramètres
                                    </h2>
                                    <h2 className="navButton">Crédits</h2>
                                    <h2 className="navButton py-5" onClick={logout}>
                                        Déconnexion
                                    </h2>
                                </div>
                            )}
                            {!isConnected && (
                                <div className="menu">
                                    <h2 className="navButton" onClick={() => navigate('/authenticate')}>
                                        Connexion
                                    </h2>
                                </div>
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
