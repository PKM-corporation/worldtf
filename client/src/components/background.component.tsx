import React from 'react';
import MyVideo from '../assets/backgroundVid.mp4';

const BackgroundComponent = () => {
    return (
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
                zIndex: '-9',
            }}
        >
            <source src={MyVideo} type="video/mp4" />
        </video>
    );
};

export default BackgroundComponent;
