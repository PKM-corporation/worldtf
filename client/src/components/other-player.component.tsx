import React, { Suspense, useEffect, useRef } from 'react';
import Aj from '../models/aj/Aj';
import { useSelector } from 'react-redux';
import { IStoreStates } from '../interfaces/store.interface';
import { BufferGeometry, Material, Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

interface IProps {
    playerId: string;
}

export const OtherPlayerComponent = ({ playerId }: IProps) => {
    const player = useSelector((state: IStoreStates) => state.players.data[playerId]);

    const boxRef = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);
    const textRef = useRef<Mesh>(null);

    useEffect(() => {
        if (!player.position) return;
        if (boxRef.current) {
            boxRef.current.position.x = player.position.x;
            boxRef.current.position.z = player.position.z;
            boxRef.current.position.y = player.position.y - 0.5;
        }
    }, [player.position]);
    useEffect(() => {
        if (!player.rotation) return;
        if (boxRef.current) {
            boxRef.current.rotation.order = 'ZYX';
            boxRef.current.rotation.y = player.rotation.y - Math.PI;
        }
    }, [player.rotation]);

    useFrame(({ camera }) => {
        if (boxRef.current && Math.abs(boxRef.current.position.distanceTo(camera.position)) > 10) {
            if (textRef.current) textRef.current.visible = false;
        } else {
            if (textRef.current) textRef.current.visible = true;
        }
        textRef.current && textRef.current.lookAt(camera.position);
    });
    return (
        <>
            <mesh ref={boxRef}>
                <Suspense fallback={null}>
                    <Aj position={[0, 0, 0]} playerId={playerId} />
                </Suspense>
                <Text ref={textRef} color="black" anchorX="center" anchorY="middle" position={[0, 2, 0]}>
                    {player.pseudo}
                </Text>
            </mesh>
        </>
    );
};
