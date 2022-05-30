import React, { useEffect, useRef } from 'react';
import CrosshairComponent from '../components/crosshair.component';
import DefaultScene from '../scene/default-scene';
import ChatComponent from '../components/chat/chat.component';
import PlayerlistComponent from '../components/player-list.component';
import { Canvas } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { useWebsocketServer } from '../hooks/websocket.hooks';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../store/store';
import ErrorComponent from '../components/error.component';
import LoaderComponent from '../components/loader.component';
import { useNavigate } from 'react-router-dom';
import { IStoreStates } from '../interfaces/store.interface';
import { useKeyboardControls } from '../hooks/keyboard.hooks';
import { UserSliceActions } from '../store/slices/user.slice';
import { InterfaceSliceActions } from '../store/slices/interface.slice';
import { ChatSliceActions } from '../store/slices/chat.slice';
import GameMenuComponent from '../components/game-menu.component';

const PixelRatioSetting = () => {
    const { gl } = useThree();
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    return <></>;
};

const GamePage = () => {
    const canvasRef = useRef();
    const favicon = document.getElementById('favicon');
    const dispatch = useDispatch();
    const connected = useSelector((state: IStoreStates) => state.websocket.connected);
    const error = useSelector((state: IStoreStates) => state.websocket.error);
    const navigate = useNavigate();
    const tabColorsChat = ['#DA0F0F', '#207ACD', '#6ACD3C', '#E8DF0F', '#FFABD8', '#00E392', '#FF186B', '#FFFFFF', '#FD9B08', '#33E9E9'];
    useKeyboardControls();
    useWebsocketServer();

    useEffect(() => {
        if (error.status === 401) {
            dispatch(UserSliceActions.reset());
            navigate('/authenticate');
        }
    }, [error]);

    useEffect(() => {
        let chatColor = window.sessionStorage.getItem('chatColor');
        if (!chatColor) chatColor = tabColorsChat[Math.floor(Math.random() * 9)];
        dispatch(ChatSliceActions.setChatColor(chatColor));
    }, []);

    const play = () => {
        dispatch(InterfaceSliceActions.setIsChatting(false));
    };

    /*useEffect(() => {
        const interval = setInterval(() => {
            favicon.href = canvasRef.current.toDataURL();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);*/

    if (connected) {
        return (
            <div id="canvas-container" onClick={play}>
                <CrosshairComponent />
                <ChatComponent />
                <GameMenuComponent />
                <PlayerlistComponent />
                <Canvas id="canvas" camera={{ position: [0, 0, 5], fov: 70, near: 0.01, far: 100, aspect: window.innerWidth / window.innerHeight }}>
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
