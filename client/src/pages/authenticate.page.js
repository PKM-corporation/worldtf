import React from 'react';

const AuthenticatePage = () => {
    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center bg-image text-white
        "
            id="AuthPage"
        >
            <div className="col-6 p-5 borderBlink" id="pink-background">
                <div className="row">
                    <h1 className="text-center py-2 neonText ">Universe</h1>
                </div>
                <div className="row">
                    <div className="col-5">
                        <h3 className="p-3 text-center ">Connexion</h3>
                        <div className="row" id="loginForm">
                            <div className="form-floating  mb-3">
                                <input type="text" className="form-control" id="floatingInputLogin" placeholder="E-mail" />
                                <label htmlFor="floatingInputLogin">Adresse mail</label>
                            </div>
                            <div className="form-floating  mb-3">
                                <input type="text" className="form-control" id="floatingPasswordLogin" placeholder="Mot de passe" />
                                <label htmlFor="floatingPasswordLogin">Mot de passe</label>
                            </div>
                            <span className="mt-3 d-flex justify-content-center">
                                <input className="p-3 rounded-circle" type="button" value="test" />
                            </span>
                        </div>
                    </div>
                    <div className="col-2">
                        <span className="vertical-line text-center"></span>
                    </div>
                    <div className="col-5 d-flex justify-content-center">
                        <div className="row" id="registerForm">
                            <h3 className="p-3 text-center ">Inscription</h3>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingPseudo" placeholder="Pseudo" />
                                <label htmlFor="floatingInput">Pseudo</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" placeholder="E-mail" />
                                <label htmlFor="floatingInput">Adresse mail</label>
                            </div>
                            <div className="form-floating ">
                                <input type="text" className="form-control" id="floatingPassword" placeholder="Mot de passe" />
                                <label htmlFor="floatingPassword">Mot de passe</label>
                            </div>
                            <span className="mt-3 d-flex justify-content-center">
                                <input className="p-3 rounded-circle" type="button" value="test" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AuthenticatePage;
