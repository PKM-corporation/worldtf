import React, { useEffect, useRef } from 'react';
import { useSphere } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';
import { Raycaster, Vector3 } from 'three';
import { useKeyboardControls } from '../hooks/player.hooks';

const SPEED = 6;
var speedSprint = SPEED;
const jumpSpeed = 5;
const jumpCoolDown = 1250;

export const Player = (props) => {
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
        if (sprint && !state.current.sprinting) {
            state.current.sprinting = true;
            speedSprint = SPEED * 1.5;
        } else if (!sprint && state.current.sprinting) {
            speedSprint = SPEED;
            state.current.sprinting = false;
        }
        camera.position.set(ref.current.position.x, ref.current.position.y + 0, ref.current.position.z);
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
    });

    return (
        <>
            <mesh ref={ref} />
        </>
    );
};
