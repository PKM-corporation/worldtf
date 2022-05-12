/* eslint-disable react/prop-types */
import React, { Suspense, useEffect, useRef } from 'react';
import { useThree, extend } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import Remy from '../models/remy/Remy';
import { useSelector } from 'react-redux';
import { Euler } from 'three';

export const OtherPlayerComponent = (props) => {
    const player = useSelector((state) => state.players[props.playerId]);
    const { camera, scene } = useThree();

    const boxRef = useRef();
    const textRef = useRef();

    /** Player state */
    const state = useRef({
        timeTojump: 0,
        jumping: false,
        sprinting: false,
    });

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
                    <Remy position={[0, 0, 0]} playerId={props.playerId} />
                </Suspense>
                <Html distanceFactor={10} style={{ transform: 'translate(-50%,-500%)' }}>
                    <div ref={textRef} className="pseudo-label">
                        {player.username}
                    </div>
                </Html>
            </mesh>
        </>
    );
};
