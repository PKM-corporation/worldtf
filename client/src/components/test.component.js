import React from 'react';
import { useFrame } from '@react-three/fiber';

const TestComponent = () => {
    const myMesh = React.useRef();
    useFrame(({ clock }) => {
        myMesh.current.rotation.x = clock.getElapsedTime();
    });
    return (
        <mesh ref={myMesh}>
            <boxGeometry />
            <meshBasicMaterial color="royalblue" />
        </mesh>
    );
};

export default TestComponent;
