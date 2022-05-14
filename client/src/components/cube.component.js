/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useBox } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';

export const Cube = (props) => {
    const [cubeRef] = useBox(() => ({
        mass: 5,
        args: [1, 1, 1],
        material: {
            friction: 1,
            restitution: 0,
        },
        ...props,
    }));

    useFrame(() => {
        const lastPosition = cubeRef.current.position;
        cubeRef.current.getWorldPosition(cubeRef.current.position);
        //console.log(cubeRef.current.position);
    });

    return (
        <mesh ref={cubeRef} castShadow layers={props.layers}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshLambertMaterial color={'red'} />
        </mesh>
    );
};
