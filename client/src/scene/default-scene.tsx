/* eslint-disable react/prop-types */
import React, { Suspense, useEffect, useRef } from 'react';

// Physics
import { Physics, Debug } from '@react-three/cannon';

// Three
import { useThree } from '@react-three/fiber';
import { PointerLockControls, Stats } from '@react-three/drei';

// Components
import { PlayerComponent } from '../components/player.component';
import PlaneComponent from '../components/plane.component';
import { useSelector } from 'react-redux';
import { OtherPlayerComponent } from '../components/other-player.component';
import { IStoreStates } from '../interfaces/store.interface';
import { PointerLockControls as PointerLockControlsImpl } from 'three-stdlib';
import { useDispatch } from 'react-redux';
import { InterfaceSliceActions } from '../store/slices/interface.slice';
import { Stool } from '../prefabs/stool.prefab';
import SkyComponent from '../components/sky.component';
import Map from '../models/map/Map';

const DefaultScene = () => {
    const dispatch = useDispatch();
    const { camera, gl } = useThree();
    const controls = useRef<PointerLockControlsImpl>(null);
    const players = useSelector((state: IStoreStates) => state.players.ids);
    const interfaceStore = useSelector((state: IStoreStates) => state.interface);
    const interfaceStoreRef = useRef(interfaceStore);

    useEffect(() => {
        camera.layers.enable(0);
        camera.layers.enable(1);
    }, [camera]);

    useEffect(() => {
        interfaceStoreRef.current = interfaceStore;
        if (controls.current?.isLocked && (interfaceStore.showGameMenu || interfaceStore.isChatting)) {
            controls.current && controls.current.unlock();
        } else if (controls.current && !controls.current.isLocked && !interfaceStore.showGameMenu && !interfaceStore.isChatting) {
            controls.current && controls.current.lock();
        }
    }, [interfaceStore]);

    return (
        <>
            {/** Skybox */}
            <SkyComponent />
            {/* Pointer lock */}
            <PointerLockControls
                onUnlock={() => {
                    if (!interfaceStoreRef.current.showGameMenu && !interfaceStoreRef.current.isChatting) {
                        dispatch(InterfaceSliceActions.setShowGameMenu(true));
                    }
                }}
                selector="#canvas"
                ref={controls}
                args={[camera, gl.domElement]}
            />
            {/** Physic objects */}
            <Physics isPaused={false} gravity={[0, -9.81, 0]} tolerance={0} iterations={50} broadphase={'Naive'}>
                <Debug color="#ff0000">
                    <PlaneComponent />
                    <Stool position={[-5, -0.25, 5]} rotation={[0, Math.PI / 8, 0]} />
                    <PlayerComponent position={[0, 1, 0]} key="player" />
                    <Suspense fallback={null}></Suspense>
                    <Map position={[0, -0.25, 0]} />
                </Debug>
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
