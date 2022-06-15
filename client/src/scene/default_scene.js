import React, { Suspense, useEffect, useRef, useState } from 'react';

// Physics
import { Physics } from '@react-three/cannon';

// Three
import { useThree } from '@react-three/fiber';
import { PointerLockControls, Stats, OrbitControls } from '@react-three/drei';

// Components
import { PlayerComponent } from '../components/player.component';
import SkyboxComponent from '../components/skybox.component';
import PlaneComponent from '../components/plane.component';
import { useSelector } from 'react-redux';
import { OtherPlayerComponent } from '../components/other-player.component';

// Models
import WorldMap from '../models/map/Map';

const DefaultScene = () => {
    const { camera, gl } = useThree();
    const controls = useRef();
    const players = useSelector((state) => state.players.playerList);
    const interfaceStore = useSelector((state) => state.interface);
    const [click, setClick] = useState(false);
    const clickRef = useRef(click);

    useEffect(() => {
        camera.layers.enable(0);
        camera.layers.enable(1);
    }, [camera]);

    useEffect(() => {
        if (interfaceStore.showSettings || interfaceStore.isChatting) {
            controls.current.unlock();
            controls.current.disconnect();
            setTimeout(() => {
                controls.current.unlock();
            }, 10);
        } else {
            controls.current.connect();
            controls.current.lock();
        }
    }, [interfaceStore]);

    useEffect(() => {
        clickRef.current = click;
        if (interfaceStore.showSettings || interfaceStore.isChatting) {
            controls.current.unlock();
            controls.current.disconnect();
            setTimeout(() => {
                controls.current.unlock();
            }, 10);
        } else {
            controls.current.connect();
            controls.current.lock();
        }
    }, [click]);

    useEffect(() => {
        const handleFocus = (e) => {
            e.preventDefault();
            setClick(!clickRef.current);
        };
        document.addEventListener('click', handleFocus);

        return () => {
            document.removeEventListener('click', handleFocus);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            {/** Skybox */}
            <SkyboxComponent />
            {/* Pointer lock */}
            <PointerLockControls ref={controls} args={[camera, gl.domElement]} />
            {/* Lighting */}
            <directionalLight position={[3, 0, 3]} intensity={0.5} castShadow />
            <pointLight position={[0, 0, -3]} intensity={0.6} castShadow />
            <pointLight position={[0, 0, 4]} intensity={0.6} castShadow />
            <ambientLight intensity={0.6} />
            {/** Physic objects */}
            <Physics isPaused={false} gravity={[0, -9.81, 0]} tolerance={0} iterations={50} broadphase={'Naive'}>
                <PlaneComponent />
                <PlayerComponent position={[0, 1, 0]} key="player" />
                <Suspense fallback={null}></Suspense>
                {/* <WorldMap position={[0, 2.35, 0]} /> */}
            </Physics>
            {players.map((player) => {
                return <OtherPlayerComponent playerId={player.id} key={player.id} />;
            })}
            {/* Stats */}
            <Stats />
        </>
    );
};

export default DefaultScene;
