import React, { useEffect, useRef } from 'react';
import { useSphere } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';
import { Raycaster, Vector3, Euler } from 'three';
import { useKeyboardControls } from '../hooks/player.hooks';
import { server } from '../hooks/websocket.hooks';

const SPEED = 6;
let speedSprint = SPEED;
const jumpSpeed = 5;
const jumpCoolDown = 1250;
let lastRotation = new Euler();
let currentAnimation = 'Idle';
const Walking_forward = 'Walking_forward';
const Walking_left = 'Walking_left';
const Walking_right = 'Walking_right';
const Walking_backward = 'Walking_backward';
const Running_forward = 'Running_forward';
const Running_backward = 'Running_backward';
const Running_left = 'Running_left';
const Running_right = 'Running_right';
const Jumping = 'Jumping';
const Idle = 'Idle';

function sendSocketAnimation(animationName) {
    server.emit('PlayerAction', {
        type: 'Anim',
        animation: animationName,
    });
    currentAnimation = animationName;
}

export const PlayerComponent = (props) => {
    // eslint-disable-next-line react/prop-types
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

    /** Player state */
    const state = useRef({
        timeTojump: 0,
        jumping: false,
        sprinting: false,
    });

    useFrame(() => {
        speedSprint = SPEED;
        camera.rotation.order = 'YXZ';
        const lastPosition = { ...ref.current.position };
        if (sprint && !state.current.sprinting) {
            state.current.sprinting = true;
            speedSprint = SPEED * 1.5;
        } else if (!sprint && state.current.sprinting) {
            state.current.sprinting = false;
        }

        if (moveBackward) {
            speedSprint = SPEED / 2;
            if (state.current.sprinting) speedSprint *= 1.5;
        }

        if (!state.current.jumping) {
            if (!sprint) {
                if (moveForward && !moveBackward && !moveLeft && !moveRight && currentAnimation !== Walking_forward) {
                    sendSocketAnimation(Walking_forward);
                } else if (!moveForward && !moveBackward && moveLeft && !moveRight && currentAnimation !== Walking_left) {
                    sendSocketAnimation(Walking_left);
                } else if (!moveForward && !moveBackward && !moveLeft && moveRight && currentAnimation !== Walking_right) {
                    sendSocketAnimation(Walking_right);
                } else if (!moveForward && moveBackward && !moveLeft && !moveRight && currentAnimation !== Walking_backward) {
                    sendSocketAnimation(Walking_backward);
                } else if (!moveForward && !moveBackward && !moveLeft && !moveRight && currentAnimation !== Idle) {
                    sendSocketAnimation(Idle);
                }
            } else {
                if (moveForward && !moveBackward && !moveLeft && !moveRight && currentAnimation !== Running_forward) {
                    sendSocketAnimation(Running_forward);
                } else if (!moveForward && !moveBackward && moveLeft && !moveRight && currentAnimation !== Running_left) {
                    sendSocketAnimation(Running_left);
                } else if (!moveForward && !moveBackward && !moveLeft && moveRight && currentAnimation !== Running_right) {
                    sendSocketAnimation(Running_right);
                } else if (!moveForward && moveBackward && !moveLeft && !moveRight && currentAnimation !== Running_backward) {
                    sendSocketAnimation(Running_backward);
                } else if (!moveForward && !moveBackward && !moveLeft && !moveRight && currentAnimation !== Idle) {
                    sendSocketAnimation(Idle);
                }
            }
        } else if (state.current.jumping && currentAnimation !== Jumping) {
            sendSocketAnimation(Jumping);
        }

        camera.position.set(ref.current.position.x, ref.current.position.y + 0.9, ref.current.position.z);
        const direction = new Vector3();

        const frontVector = new Vector3(0, 0, Number(moveBackward) - Number(moveForward));
        const sideVector = new Vector3(Number(moveLeft) - Number(moveRight), 0, 0);
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speedSprint).applyEuler(camera.rotation);
        ref.current.getWorldPosition(ref.current.position);
        api.velocity.set(direction.x, velocity.current[1], direction.z);

        if (state.current.jumping) {
            const raycaster = new Raycaster(ref.current.position, new Vector3(0, -1, 0), 0, 1);
            const intersects = raycaster.intersectObjects(scene.children);
            if (intersects.length !== 0) {
                state.current.jumping = false;
            }
        }

        if (jump && !state.current.jumping) {
            const now = Date.now();
            if (now > state.current.timeTojump) {
                state.current.timeTojump = now + jumpCoolDown;
                state.current.jumping = true;
                api.velocity.set(direction.x, jumpSpeed, direction.z);
            }
        }
        if (ref.current.position.distanceTo(lastPosition) > 0.01 || !camera.rotation.equals(lastRotation)) {
            server.emit('PlayerAction', {
                type: 'Move',
                position: ref.current.position,
                rotation: camera.rotation,
            });
        }
        lastRotation = camera.rotation.clone();
    });

    return (
        <>
            <mesh ref={ref}></mesh>
        </>
    );
};
