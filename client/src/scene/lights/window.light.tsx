import { Text, useHelper } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { DirectionalLight, DirectionalLightHelper, Mesh, Object3D } from 'three';
import { IStoreStates } from '../../interfaces/store.interface';

interface IProps {
    position?: [x: number, y: number, z: number];
    rotation?: [x: number, y: number, z: number];
    width?: number;
    height?: number;
    intensity?: number;
}

const WindowLight = ({ position, rotation, width, height, intensity }: IProps) => {
    const [intensityState, setIntensityState] = useState(0.1);
    const scene = useSelector((state: IStoreStates) => state.scene);
    const ref = useRef<DirectionalLight>(null);
    const textRef = useRef<Mesh>(null);

    if (scene.isDebug) useHelper(ref as unknown as MutableRefObject<Object3D<Event> | undefined>, DirectionalLightHelper);

    const getMaxIntensity = () => {
        return -(4 * (intensity ?? 1)) * 0.5 ** 2 + 4 * (intensity ?? 1) * 0.5 + 0.1;
    };

    useEffect(() => {
        if (Math.sign(scene.time) !== -1 && scene.time <= 0.5) {
            setIntensityState(-(4 * (intensity ?? 1)) * scene.time ** 2 + 4 * (intensity ?? 1) * scene.time + 0.1);
        } else if (Math.sign(scene.time) !== -1 && intensityState !== getMaxIntensity()) {
            setIntensityState(getMaxIntensity());
        } else if (Math.sign(scene.time) === -1 && intensityState !== 0.1) {
            setIntensityState(0.1);
        }
    }, [scene.time]);

    useEffect(() => {
        if (ref.current) {
            const target = new Object3D();
            if (position) target.position.set(position[0], 0, position[2] + 20);
            ref.current.target = target;
            ref.current.target.updateMatrixWorld();
        }
    }, []);

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
            <directionalLight
                position={position ? [position[0], 0, position[2] - 1] : [0, 0, 0]}
                ref={ref}
                intensity={intensityState ? intensityState / 80 : 0.1}
            />
            {scene.isDebug && (
                <Text ref={textRef} color="white" anchorX="center" anchorY="middle" position={position}>
                    {`Intensity: ${intensityState}`}
                </Text>
            )}
        </>
    );
};

export default WindowLight;
