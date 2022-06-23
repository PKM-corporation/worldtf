import { useBox } from '@react-three/cannon';
import React from 'react';

const MapHitbox = () => {
    // Bar
    useBox(() => ({
        mass: 1,
        type: 'Static',
        args: [9, 1.56, 0.8],
        material: {
            friction: 0,
            restitution: 0,
        },
        position: [-6.3, 0, 5.8],
        rotation: [0, Math.PI / 2, 0],
    }));
    useBox(() => ({
        mass: 1,
        type: 'Static',
        args: [4, 1.56, 0.8],
        material: {
            friction: 0,
            restitution: 0,
        },
        position: [-8.3, 0, 1.6],
    }));

    // Walls
    useBox(() => ({
        mass: 1,
        type: 'Static',
        args: [20, 6, 0.5],
        material: {
            friction: 0,
            restitution: 0,
        },
        position: [0, 2.5, 10.2],
    }));
    useBox(() => ({
        mass: 1,
        type: 'Static',
        args: [20, 6, 0.5],
        material: {
            friction: 0,
            restitution: 0,
        },
        position: [0, 2.5, -10.2],
    }));
    useBox(() => ({
        mass: 1,
        type: 'Static',
        args: [20, 6, 0.5],
        material: {
            friction: 0,
            restitution: 0,
        },
        position: [10.2, 2.5, 0],
        rotation: [0, Math.PI / 2, 0],
    }));
    useBox(() => ({
        mass: 1,
        type: 'Static',
        args: [20, 6, 0.5],
        material: {
            friction: 0,
            restitution: 0,
        },
        position: [-10.2, 2.5, 0],
        rotation: [0, Math.PI / 2, 0],
    }));

    // Platform
    useBox(() => ({
        mass: 1,
        type: 'Static',
        args: [10, 0.3, 6.2],
        material: {
            friction: 0,
            restitution: 0,
        },
        position: [2.5, -0.09, 5.55],
        rotation: [0, Math.PI / 2, 0],
    }));

    //floor
    useBox(() => ({
        mass: 1,
        type: 'Static',
        args: [20, 0.3, 20],
        material: {
            friction: 0,
            restitution: 0,
        },
        position: [0, -0.4, 0],
        rotation: [0, Math.PI / 2, 0],
    }));
    return <></>;
};

export default MapHitbox;
