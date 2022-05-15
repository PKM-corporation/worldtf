import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyVideo from '../components/backgroundVid.mp4';

const HomePage = () => {
    const navigate = useNavigate();
    const logout = () => {
        window.localStorage.removeItem('access_token');
        navigate('/authenticate');
    };
    const isConnected = window.localStorage.access_token;

    return (
        <div>
            <video
                autoPlay
                muted
                loop
                style={{
                    position: 'absolute',
                    width: '100%',
                    left: '50%',
                    top: '50%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'translate(-50%,-50%)',
                    zZIndex: '-9',
                }}
            >
                <source src={MyVideo} type="video/mp4" />
            </video>
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
                                    <h2 className="navButton">Paramètres</h2>
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
