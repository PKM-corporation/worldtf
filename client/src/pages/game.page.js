import React, { useEffect } from 'react';
import CrosshairComponent from '../components/crosshair.component';
import DefaultScene from '../scene/default_scene';
import { Canvas } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { useWebsocketServer } from '../hooks/websocket.hooks';
import { Provider } from 'react-redux';
import store from '../store/store';

const PixelRatioSetting = () => {
    const { gl } = useThree();
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};
const GamePage = () => {
    useWebsocketServer();
    return (
        <div id="canvas-container">
            <CrosshairComponent />
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
};

export default GamePage;
