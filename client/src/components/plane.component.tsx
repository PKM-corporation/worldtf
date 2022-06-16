import React, { RefObject } from 'react';
import { usePlane } from '@react-three/cannon';
import { BufferGeometry, Material, Mesh } from 'three';

const PlaneComponent = () => {
    /** Plane collider */
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -0.25, 0],
        material: {
            friction: 0.1,
        },
    }));

    return (
        <>
            <mesh ref={ref as RefObject<Mesh<BufferGeometry, Material | Material[]>>} receiveShadow={true} scale={[1000, 1000, 1000]}>
                <planeBufferGeometry />
                <meshPhongMaterial color={'skyblue'} />
            </mesh>
        </>
    );
};

export default PlaneComponent;
