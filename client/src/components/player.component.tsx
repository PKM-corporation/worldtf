import React, { RefObject, useEffect, useRef } from 'react';
import { useBox } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';
import { BufferGeometry, Material, Mesh, Raycaster, Vector3 } from 'three';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreStates } from '../interfaces/store.interface';
import { websocketEmitData } from '../services/websocket.service';
import { IWebsocketEmitDataPlayerActionDto } from '../interfaces/websocket.interface';
import {
    setAnimationIfNecessary,
    setPlayerPositionIfNecessary,
    setPlayerRotationIfNecessary,
    setPlayerSpeedIfNecessary,
} from '../services/player.service';
import { PlayerSliceActions } from '../store/slices/player.slice';
import { PlayerJumpSpeed } from '../common/constant';

interface IProps {
    position: [x: number, y: number, z: number];
}

export const PlayerComponent = ({ position }: IProps) => {
    const dispatch = useDispatch();
    const player = useSelector((state: IStoreStates) => state.player);
    const isChatting = useSelector((state: IStoreStates) => state.interface.isChatting);
    const { camera, scene } = useThree();
    const [ref, api] = useBox(() => ({
        mass: 10,
        fixedRotation: true,
        args: [0.5, 1, 0.5],
        material: {
            friction: 0,
        },
        position,
    }));
    const velocity = useRef([0, 0, 0]);
    useEffect(() => {
        api.velocity.subscribe((v) => (velocity.current = v));
    }, [api.velocity]);

    useEffect(() => {
        websocketEmitData('PlayerAction', { type: 'Anim', animation: player.currentAnimation } as IWebsocketEmitDataPlayerActionDto);
    }, [player.currentAnimation]);

    useEffect(() => {
        websocketEmitData('PlayerAction', { type: 'Move', position: player.position } as IWebsocketEmitDataPlayerActionDto);
    }, [player.position]);

    useEffect(() => {
        websocketEmitData('PlayerAction', { type: 'Rotate', rotation: player.rotation } as IWebsocketEmitDataPlayerActionDto);
        api.rotation.set(0, player.rotation.y, 0);
    }, [player.rotation]);

    useFrame(() => {
        if (!ref.current) return;
        camera.rotation.order = 'YXZ';

        setAnimationIfNecessary();
        setPlayerSpeedIfNecessary();

        camera.position.set(ref.current.position.x, ref.current.position.y + 0.9, ref.current.position.z);
        const direction = new Vector3();

        if (Math.abs(ref.current.position.distanceTo(new Vector3(player.position.x, player.position.y, player.position.z))) > 1) {
            api.position.set(player.position.x, player.position.y + 0.5, player.position.z);
        }

        if (!isChatting) {
            const frontVector = new Vector3(0, 0, Number(player.isMoveBackward) - Number(player.isMoveForward));
            const sideVector = new Vector3(Number(player.isMoveLeft) - Number(player.isMoveRight), 0, 0);
            direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(player.speed).applyEuler(camera.rotation);
            api.velocity.set(direction.x, velocity.current[1], direction.z);
        }

        ref.current.getWorldPosition(ref.current.position);

        setPlayerPositionIfNecessary(ref.current.position);
        setPlayerRotationIfNecessary(camera.rotation);

        const raycaster = new Raycaster(ref.current.position, new Vector3(0, -1, 0), 0, 1);
        const intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length === 0 && !player.falling) {
            dispatch(PlayerSliceActions.setFalling(true));
        } else if (intersects.length !== 0 && player.falling) {
            dispatch(PlayerSliceActions.setFalling(false));
        }

        if (player.jump) {
            api.velocity.set(direction.x, PlayerJumpSpeed, direction.z);
            dispatch(PlayerSliceActions.setJump(false));
        }
    });

    return (
        <>
            <mesh ref={ref as RefObject<Mesh<BufferGeometry, Material | Material[]>>}></mesh>
        </>
    );
};
