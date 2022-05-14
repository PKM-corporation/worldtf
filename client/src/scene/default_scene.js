import React, { Suspense, useEffect, useRef } from 'react';

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
import { Cube } from '../components/cube.component';
import { OtherPlayerComponent } from '../components/other-player.component';

// Models
import WorldMap from '../models/map/Map';

const DefaultScene = () => {
    const { camera, gl } = useThree();
    const controls = useRef();
    const players = useSelector((state) => state.players.playerList);
    useEffect(() => {
        camera.layers.enable(0);
        camera.layers.enable(1);
    }, [camera]);

    useEffect(() => {
        const handleFocus = () => {
            controls.current.lock();
        };
        document.addEventListener('click', handleFocus);

        return () => {
            document.removeEventListener('click', handleFocus);
        };
    }, [gl]);

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
                <Cube position={[10, 0, 10]} />
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
