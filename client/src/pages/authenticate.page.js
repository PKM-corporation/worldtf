import React from 'react';
import BackgroundComponent from '../components/background.component';
import LoginFormComponent from '../components/login-form.component';
import SignFormComponent from '../components/sign-form.component';

const AuthenticatePage = () => {
    return (
        <div
            className=" AuthPage container-fluid d-flex justify-content-center align-items-center bg-image text-white
        "
        >
            <BackgroundComponent />
            <div className="col-6 p-5 h-75 w-75 borderBlink content" id="pink-background">
                <div className="row">
                    <h1 className="text-center py-2 neonText ">Universe</h1>
                </div>
                <div className="row">
                    <LoginFormComponent />
                    <div className="col-2 ">
                        <span className="vertical-line text-center"></span>
                    </div>
                    <SignFormComponent />
                </div>
            </div>
        </div>
    );
};
export default AuthenticatePage;
