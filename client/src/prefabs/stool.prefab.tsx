import React from 'react';
import { useBox } from '@react-three/cannon';
import { useGLTF } from '@react-three/drei';
import { TStoolGLTF } from '../interfaces/model.interface';

interface IProps {
    position: [x: number, y: number, z: number];
    rotation: [x: number, y: number, z: number];
}

export const Stool = ({ position, rotation }: IProps) => {
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
        position: [position[0], y - (0.5 * y + 0.25), position[2]],
        rotation,
    }));

    const { nodes, materials } = useGLTF('/models/props/stool.glb') as unknown as TStoolGLTF;
    return (
        <group position={position} rotation={rotation} dispose={null} scale={scale} castShadow>
            <mesh geometry={nodes.stool.geometry} material={materials.stool} rotation={[Math.PI / 2, 0, Math.PI / 4]} />
        </group>
    );
};

useGLTF.preload('/models/props/stool.glb');
