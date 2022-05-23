import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyVideo from '../components/backgroundVid.mp4';

const SettingsPage = () => {
    const navigate = useNavigate();
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
                                    <h2 className="text-large">Langues</h2>
                                    <div className="language">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <span className="text-small navButton" onClick={() => changeLanguage('fr')}>
                                                            FR
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-small navButton" onClick={() => changeLanguage('en')}>
                                                            EN
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <h2 className="navButton" onClick={() => navigate('/')}>
                                        Retour
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

export default SettingsPage;
