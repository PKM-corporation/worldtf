import React, { Suspense, useEffect, useRef } from 'react';
import { Html } from '@react-three/drei';
import Aj from '../models/aj/Aj';
import { useSelector } from 'react-redux';
import { IStoreStates } from '../interfaces/store.interface';
import { BufferGeometry, Material, Mesh } from 'three';

interface IProps {
    playerId: string;
}

export const OtherPlayerComponent = ({ playerId }: IProps) => {
    const player = useSelector((state: IStoreStates) => state.players.data[playerId]);

    const boxRef = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);
    const textRef = useRef<HTMLDivElement>(null);

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
    return (
        <>
            <mesh ref={boxRef}>
                <Suspense fallback={null}>
                    <Aj position={[0, 0, 0]} playerId={playerId} />
                </Suspense>
                <Html distanceFactor={10} style={{ transform: 'translate(-50%,-800%)' }}>
                    <div ref={textRef} className="pseudo-label">
                        {player.pseudo}
                    </div>
                </Html>
            </mesh>
        </>
    );
};
