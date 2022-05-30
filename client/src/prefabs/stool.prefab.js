/* eslint-disable react/prop-types */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from 'react';
import { useBox } from '@react-three/cannon';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export const Stool = (props) => {
    const scale = 0.02;
    const y = scale * 37.7;
    useBox(() => ({
        mass: 1,
        type: 'Static',
        args: [scale * 20, y, scale * 20],
        material: {
            friction: 0,
            restitution: 0,
        },
        ...props,
        position: [props.position[0], y - (0.5 * y + 0.25), props.position[2]],
    }));

    const { nodes, materials } = useGLTF('/models/props/stool.glb');
    return (
        <group {...props} dispose={null} scale={scale} castShadow>
            <mesh geometry={nodes.stool.geometry} material={materials.stool} rotation={[Math.PI / 2, 0, Math.PI / 4]} />
        </group>
    );
};

useGLTF.preload('/models/props/stool.glb');
