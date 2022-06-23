import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import { TTableGLTF } from '../interfaces/model.interface';

interface IProps {
    position: [x: number, y: number, z: number];
    rotation?: [x: number, y: number, z: number];
}

export const Table = ({ position, rotation }: IProps) => {
    const { nodes, materials } = useGLTF('/models/props/table.glb') as unknown as TTableGLTF;
    const scale = 1;
    const y = scale * 0.81;
    useBox(() => ({
        mass: 1,
        type: 'Static',
        args: [scale * 2, y, scale * 2],
        material: {
            friction: 0,
            restitution: 0,
        },
        position: [position[0], y - (0.5 * y + 0.25), position[2]],
        rotation,
    }));
    return (
        <group position={position} rotation={rotation ?? [0, 0, 0]} dispose={null} scale={scale}>
            <mesh geometry={nodes.Circle.geometry} material={materials.Wood} />
        </group>
    );
};

useGLTF.preload('/models/props/table.glb');
