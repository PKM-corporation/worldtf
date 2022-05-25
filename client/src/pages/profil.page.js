import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyVideo from '../components/backgroundVid.mp4';
import SideBarProfilComponent from '../components/side-bar-profil.component';

const ProfilPage = () => {
    const navigate = useNavigate();
    const logout = () => {
        window.localStorage.removeItem('access_token');
        navigate('/authenticate');
    };
    const isConnected = window.localStorage.access_token;

    return (
        <div className="main-div-profile">
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
            <div className="content content-profile">
                <span className="text neonTextMenu m-4">Compte</span>
                <hr />
                <div className=" h-75">
                    <div>
                        <span className="mt-3">
                            {isConnected && <SideBarProfilComponent />}
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

export default ProfilPage;
