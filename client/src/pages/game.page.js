import React, { useEffect } from 'react';
import CrosshairComponent from '../components/crosshair.component';
import DefaultScene from '../scene/default_scene';
import ChatComponent from '../components/chat.component';
import { Canvas } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { useWebsocketServer } from '../hooks/websocket.hooks';
import { Provider, useSelector } from 'react-redux';
import store from '../store/store';
import ErrorComponent from '../components/error.component';
import LoaderComponent from '../components/loader.component';
import { useNavigate } from 'react-router-dom';

const PixelRatioSetting = () => {
    const { gl } = useThree();
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};
const GamePage = () => {
    const connected = useSelector((state) => state.websocket.connected);
    const error = useSelector((state) => state.websocket.error);
    const navigate = useNavigate();
    useWebsocketServer();

    useEffect(() => {
        if (error.status === 401) {
            window.localStorage.removeItem('access_token');
            navigate('/authenticate');
        }
    }, [error]);

    if (connected) {
        return (
            <div id="canvas-container">
                <CrosshairComponent />
                <ChatComponent />
                <Canvas
                    shadows={{ type: 'VSMShadowMap' }}
                    camera={{ position: [0, 0, 5], fov: 70, near: 0.01, far: 100, aspect: window.innerWidth / window.innerHeight }}
                >
                    <PixelRatioSetting />
                    <Provider store={store}>
                        <DefaultScene />
                    </Provider>
                </Canvas>
            </div>
        );
    } else if (error.status === 409) {
        return <ErrorComponent />;
    }
    return <LoaderComponent />;
};

export default GamePage;
