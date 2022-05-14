/* eslint-disable react/prop-types */
import React, { Suspense, useEffect, useRef } from 'react';
import { Html } from '@react-three/drei';
import Aj from '../models/aj/Aj';
import { useSelector } from 'react-redux';

export const OtherPlayerComponent = (props) => {
    const player = useSelector((state) => state.players[props.playerId]);

    const boxRef = useRef();
    const textRef = useRef();

    useEffect(() => {
        if (!player.position) return;
        boxRef.current.position.x = player.position.x;
        boxRef.current.position.z = player.position.z;
        boxRef.current.position.y = player.position.y - 0.5;
    }, [player.position]);
    useEffect(() => {
        if (!player.rotation) return;
        boxRef.current.rotation.order = 'ZYX';
        boxRef.current.rotation.y = player.rotation.y - Math.PI;
    }, [player.rotation]);
    return (
        <>
            <mesh ref={boxRef}>
                <Suspense fallback={null}>
                    <Aj position={[0, 0, 0]} playerId={props.playerId} />
                </Suspense>
                <Html distanceFactor={10} style={{ transform: 'translate(-50%,-800%)' }}>
                    <div ref={textRef} className="pseudo-label">
                        {player.username}
                    </div>
                </Html>
            </mesh>
        </>
    );
};
