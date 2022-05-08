import React from 'react';
import LoginFormComponent from '../components/login-form.component';
import SignFormComponent from '../components/sign-form.component';

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
                    <LoginFormComponent />
                    <div className="col-2">
                        <span className="vertical-line text-center"></span>
                    </div>
                    <SignFormComponent />
                </div>
            </div>
        </div>
    );
};
export default AuthenticatePage;
