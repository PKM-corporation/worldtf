/* eslint-disable react/prop-types */
import React, { Suspense, useEffect, useRef } from 'react';

// Physics
import { Physics } from '@react-three/cannon';

// Three
import { useThree } from '@react-three/fiber';
import { PointerLockControls, Stats } from '@react-three/drei';

// Components
import { PlayerComponent } from '../components/player.component';
import SkyboxComponent from '../components/skybox.component';
import PlaneComponent from '../components/plane.component';
import { useDispatch, useSelector } from 'react-redux';
import { OtherPlayerComponent } from '../components/other-player.component';
import { IStoreStates } from '../interfaces/store.interface';
import { PointerLockControls as PointerLockControlsImpl } from 'three-stdlib';
import { InterfaceSliceActions } from '../store/slices/interface.slice';

const DefaultScene = () => {
    const { camera, gl } = useThree();
    const controls = useRef<PointerLockControlsImpl>(null);
    const players = useSelector((state: IStoreStates) => state.players.ids);
    const interfaceStore = useSelector((state: IStoreStates) => state.interface);
    const interfaceStoreRef = useRef(interfaceStore);
    const dispatch = useDispatch();

    const isLocked = () => {
        if (interfaceStoreRef.current.showSettings || interfaceStoreRef.current.isChatting) {
            return false;
        }
        return true;
    };

    useEffect(() => {
        camera.layers.enable(0);
        camera.layers.enable(1);
    }, [camera]);

    useEffect(() => {
        interfaceStoreRef.current = interfaceStore;
        if (!isLocked()) {
            controls.current && controls.current.unlock();
        } else {
            controls.current && controls.current.lock();
        }
    }, [interfaceStore]);

    useEffect(() => {
        const handleFocus = async (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isLocked()) {
                controls.current && controls.current.unlock();
            } else {
                controls.current && controls.current.lock();
            }
        };
        document.addEventListener('click', handleFocus);

        return () => {
            document.removeEventListener('click', handleFocus);
        };
    }, []);

    return (
        <>
            {/** Skybox */}
            <SkyboxComponent />
            {/* Pointer lock */}
            <PointerLockControls
                onLock={() => {
                    if (!isLocked()) {
                        controls.current && controls.current.unlock();
                    }
                }}
                onUnlock={() => {
                    if (isLocked()) {
                        dispatch(InterfaceSliceActions.setShowSettings(true));
                    }
                }}
                ref={controls}
                args={[camera, gl.domElement]}
            />
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
            {players.map((id) => {
                return <OtherPlayerComponent playerId={id} key={id} />;
            })}
            {/* Stats */}
            <Stats />
        </>
    );
};

export default DefaultScene;
