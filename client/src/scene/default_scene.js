import React, { Suspense, useEffect, useRef } from 'react';

// Physics
import { Physics } from '@react-three/cannon';

// Three
import { useThree } from '@react-three/fiber';
import { PointerLockControls, Stats, OrbitControls } from '@react-three/drei';

// Prefabs
import Plane from '../prefabs/Plane';
import Skybox from '../prefabs/Skybox';
import { Player } from '../prefabs/Player';

const DefaultScene = () => {
    const { camera, gl } = useThree();
    const controls = useRef();

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
            <Skybox />
            {/* Pointer lock */}
            <PointerLockControls ref={controls} args={[camera, gl.domElement]} />
            {/* Lighting */}
            <directionalLight position={[3, 0, 3]} intensity={0.5} castShadow />
            <pointLight position={[0, 0, -3]} intensity={0.6} castShadow />
            <pointLight position={[0, 0, 4]} intensity={0.6} castShadow />
            <ambientLight intensity={0.6} />
            {/** Physic objects */}
            <Physics isPaused={false} gravity={[0, -9.81, 0]} tolerance={0} iterations={50} broadphase={'Naive'}>
                <Plane />
                <Player position={[0, 1, 0]} key="player" />
                <Suspense fallback={null}></Suspense>
            </Physics>
            {/* Stats */}
            <Stats />
        </>
    );
};

export default DefaultScene;
