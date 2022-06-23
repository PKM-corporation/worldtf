import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Mesh } from 'three';
import { IStoreStates } from '../../interfaces/store.interface';

interface IProps {
    position?: [x: number, y: number, z: number];
    rotation?: [x: number, y: number, z: number];
    width?: number;
    height?: number;
    isAtNight?: boolean;
    intensity?: number;
}
const CeilingLight = ({ position, rotation, width, height, intensity }: IProps) => {
    const [intensityState, setIntensityState] = useState(intensity);
    const scene = useSelector((state: IStoreStates) => state.scene);
    const textRef = useRef<Mesh>(null);

    const getMinIntensity = () => {
        return 2 * (intensity ?? 1) * 0.5 ** 2 - 2 * (intensity ?? 1) * 0.5 + (intensity ?? 1);
    };

    useEffect(() => {
        if (Math.sign(scene.time) !== -1 && scene.time <= 0.5) {
            setIntensityState(2 * (intensity ?? 1) * scene.time ** 2 - 2 * (intensity ?? 1) * scene.time + (intensity ?? 1));
        } else if (Math.sign(scene.time) !== -1 && intensityState !== getMinIntensity()) {
            setIntensityState(getMinIntensity());
        } else if (Math.sign(scene.time) === -1 && intensityState !== 0.1) {
            setIntensityState(intensity ?? 1);
        }
    }, [scene.time]);

    if (scene.isDebug) {
        useFrame(({ camera }) => {
            textRef.current && textRef.current.lookAt(camera.position);
        });
    }

    return (
        <>
            <rectAreaLight
                position={position ?? [0, 0, 0]}
                rotation={rotation ?? [0, 0, 0]}
                width={width ?? 10}
                height={height ?? 1}
                intensity={intensityState}
            />
            {scene.isDebug && (
                <Text ref={textRef} color="white" anchorX="center" anchorY="middle" position={position}>
                    {`Intensity: ${intensityState}`}
                </Text>
            )}
        </>
    );
};

export default CeilingLight;
