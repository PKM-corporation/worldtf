import React from 'react';

const SignFormComponent = () => {
    return (
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
    );
};

export default SignFormComponent;
