import React from 'react';
import loader from '../assets/loader.svg';

const LoaderComponent = () => {
    return (
        <div className="loader">
            <p className="loader-text">Chargement...</p>
            <img src={loader} alt="Chargement..." />
        </div>
    );
};

export default LoaderComponent;
