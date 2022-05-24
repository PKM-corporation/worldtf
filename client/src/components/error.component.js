/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';

const ErrorComponent = () => {
    const error = useSelector((state) => state.websocket.error);
    return (
        <div className="error">
            <h2 className="status">{error.status}</h2>
            <div className="message">{error.message}</div>
        </div>
    );
};

export default ErrorComponent;
