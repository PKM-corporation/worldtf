import React, { useEffect } from 'react';
import CrosshairComponent from '../components/crosshair.component';
import DefaultScene from '../scene/default_scene';
import ChatComponent from '../components/chat.component';
import PlayerlistComponent from '../components/player-list.component';
import { Canvas } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { useWebsocketServer } from '../hooks/websocket.hooks';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../store/store';
import ErrorComponent from '../components/error.component';
import LoaderComponent from '../components/loader.component';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../store/slices/user.slice';
import { setIsChatting } from '../store/slices/interface.slice';
import { setChatColor } from '../store/slices/chat.slice';
import { useKeyboardHUDControls } from '../hooks/hud.hooks';

const PixelRatioSetting = () => {
    const { gl } = useThree();
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};
const GamePage = () => {
    const dispatch = useDispatch();
    const connected = useSelector((state) => state.websocket.connected);
    const error = useSelector((state) => state.websocket.error);
    const navigate = useNavigate();
    const tabColorsChat = ['#DA0F0F', '#207ACD', '#6ACD3C', '#E8DF0F', '#FFABD8', '#00E392', '#FF186B', '#FFFFFF', '#FD9B08', '#33E9E9'];
    useKeyboardHUDControls();
    useWebsocketServer();

    useEffect(() => {
        if (error.status === 401) {
            dispatch(removeUser());
            navigate('/authenticate');
        }
    }, [error]);

    useEffect(() => {
        let chatColor = window.sessionStorage.getItem('chatColor');
        if (!chatColor) chatColor = tabColorsChat[Math.floor(Math.random() * 9)];
        dispatch(setChatColor(chatColor));
    }, []);

    const play = () => {
        dispatch(setIsChatting(false));
    };

    if (connected) {
        return (
            <div id="canvas-container" onClick={play}>
                <CrosshairComponent />
                <ChatComponent />
                <PlayerlistComponent />
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
    } else if (error.type) {
        return <ErrorComponent />;
    }
    return <LoaderComponent />;
};

export default GamePage;
