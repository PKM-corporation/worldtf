import React, { useEffect, useRef } from 'react';
import { useSphere } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';
import { Raycaster, Vector3, Euler } from 'three';
import { useKeyboardControls } from '../hooks/player.hooks';
import { server } from '../hooks/websocket.hooks';
import { Animations, PlayerRunSpeed, PlayerSpeed, WebsocketEvent } from '../common/constant';
import {
    playerJump,
    setPlayerCurrentAnimation,
    setPlayerJumping,
    setPlayerPosition,
    setPlayerRotation,
    setPlayerSpeed,
    setPlayerSprinting,
} from '../store/slices/player.slice';
import { useDispatch, useSelector } from 'react-redux';

export const PlayerComponent = (props) => {
    // eslint-disable-next-line react/prop-types
    const dispatch = useDispatch();
    const player = useSelector((state) => state.player);
    const isChatting = useSelector((state) => state.interface.isChatting);
    const { camera, scene } = useThree();
    const { moveForward, moveBackward, moveLeft, moveRight, jump, sprint } = useKeyboardControls();
    const [ref, api] = useSphere(() => ({
        mass: 10,
        fixedRotation: true,
        args: [1],
        material: {
            friction: 0,
        },
        ...props,
    }));
    const velocity = useRef([0, 0, 0]);
    useEffect(() => {
        api.velocity.subscribe((v) => (velocity.current = v));
    }, [api.velocity]);

    useEffect(() => {
        server.emit(WebsocketEvent.PlayerAction, { type: 'Anim', animation: player.currentAnimation });
    }, [player.currentAnimation]);

    useEffect(() => {
        server.emit(WebsocketEvent.PlayerAction, { type: 'Move', position: player.position });
    }, [player.position]);

    useEffect(() => {
        server.emit(WebsocketEvent.PlayerAction, { type: 'Rotate', rotation: player.rotation });
    }, [player.rotation]);

    useFrame(() => {
        camera.rotation.order = 'YXZ';
        if (sprint) {
            if (!player.sprinting) dispatch(setPlayerSprinting(true));
            if (moveBackward) {
                dispatch(setPlayerSpeed(PlayerRunSpeed / 2));
            } else {
                dispatch(setPlayerSpeed(PlayerRunSpeed));
            }
        } else {
            if (player.sprinting) dispatch(setPlayerSprinting(false));
            if (moveBackward) {
                dispatch(setPlayerSpeed(PlayerSpeed / 2));
            } else {
                dispatch(setPlayerSpeed(PlayerSpeed));
            }
        }

        if (!player.jumping) {
            if (isChatting) {
                dispatch(setPlayerCurrentAnimation(Animations.Idle));
            } else {
                if (!sprint && !jump) {
                    if (moveForward && !moveBackward && !moveLeft && !moveRight) {
                        dispatch(setPlayerCurrentAnimation(Animations.WalkingForward));
                    } else if (!moveForward && !moveBackward && moveLeft && !moveRight) {
                        dispatch(setPlayerCurrentAnimation(Animations.WalkingLeft));
                    } else if (!moveForward && !moveBackward && !moveLeft && moveRight) {
                        dispatch(setPlayerCurrentAnimation(Animations.WalkingRight));
                    } else if (!moveForward && moveBackward && !moveLeft && !moveRight) {
                        dispatch(setPlayerCurrentAnimation(Animations.WalkingBackward));
                    } else if (!moveForward && !moveBackward && !moveLeft && !moveRight) {
                        dispatch(setPlayerCurrentAnimation(Animations.Idle));
                    }
                } else if (sprint && !jump) {
                    if (moveForward && !moveBackward && !moveLeft && !moveRight) {
                        dispatch(setPlayerCurrentAnimation(Animations.RunningForward));
                    } else if (!moveForward && !moveBackward && moveLeft && !moveRight) {
                        dispatch(setPlayerCurrentAnimation(Animations.RunningLeft));
                    } else if (!moveForward && !moveBackward && !moveLeft && moveRight) {
                        dispatch(setPlayerCurrentAnimation(Animations.RunningRight));
                    } else if (!moveForward && moveBackward && !moveLeft && !moveRight) {
                        dispatch(setPlayerCurrentAnimation(Animations.RunningBackward));
                    } else if (!moveForward && !moveBackward && !moveLeft && !moveRight) {
                        dispatch(setPlayerCurrentAnimation(Animations.Idle));
                    }
                } else {
                    dispatch(setPlayerCurrentAnimation(Animations.Jumping));
                }
            }
        } else if (player.jumping) {
            dispatch(setPlayerCurrentAnimation(Animations.FallingIdle));
        }

        camera.position.set(ref.current.position.x, ref.current.position.y + 0.9, ref.current.position.z);
        const direction = new Vector3();

        if (Math.abs(ref.current.position.distanceTo(new Vector3(player.position.x, player.position.y, player.position.z)) > 1)) {
            api.position.set(player.position.x, player.position.y + 0.5, player.position.z);
        }

        if (!isChatting) {
            const frontVector = new Vector3(0, 0, Number(moveBackward) - Number(moveForward));
            const sideVector = new Vector3(Number(moveLeft) - Number(moveRight), 0, 0);
            direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(player.speed).applyEuler(camera.rotation);
            api.velocity.set(direction.x, velocity.current[1], direction.z);
        }

        ref.current.getWorldPosition(ref.current.position);

        dispatch(setPlayerPosition({ position: { x: ref.current.position.x, y: ref.current.position.y, z: ref.current.position.z } }));
        dispatch(setPlayerRotation({ rotation: { x: camera.rotation.x, y: camera.rotation.y, z: camera.rotation.z } }));

        if (player.jumping) {
            const raycaster = new Raycaster(ref.current.position, new Vector3(0, -1, 0), 0, 1);
            const intersects = raycaster.intersectObjects(scene.children);
            if (intersects.length !== 0) {
                dispatch(setPlayerJumping(false));
            }
        }

        if (jump && !player.jumping && !isChatting) {
            const now = Date.now();
            if (now > player.timeToJump) {
                dispatch(playerJump(now));
                api.velocity.set(direction.x, player.jumpSpeed, direction.z);
            }
        }
    });

    return (
        <>
            <mesh ref={ref}></mesh>
        </>
    );
};
