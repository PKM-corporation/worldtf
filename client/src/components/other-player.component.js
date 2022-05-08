/* eslint-disable react/prop-types */
import React, { Suspense, useEffect, useRef } from 'react';
import { useThree, extend } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import WhiteClowns from '../models/whiteclown_n_hallin/Whiteclown_n_hallin';

export const OtherPlayerComponent = (props) => {
    const player = props.player;
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
        boxRef.current.position.x = player.position.x;
        boxRef.current.position.z = player.position.z;
        boxRef.current.position.y = player.position.y - 0.5;
        boxRef.current.rotation.y = -player.rotation.y;
    }, [player.position]);
    return (
        <>
            <mesh ref={boxRef}>
                <Suspense fallback={null}>
                    <WhiteClowns position={[0, 0, 0]} />
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
