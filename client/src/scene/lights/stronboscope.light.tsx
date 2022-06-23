import { useHelper } from '@react-three/drei';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Object3D, SpotLight, SpotLightHelper } from 'three';
import { IStoreStates } from '../../interfaces/store.interface';

interface IProps {
    position?: [x: number, y: number, z: number];
    rotation?: [x: number, y: number, z: number];
    target?: [x: number, y: number, z: number];
    interval?: number;
    count?: number;
    delay?: number;
    distance?: number;
    angle?: number;
}

const StronboscopeLight = ({ position, rotation, interval, count, delay, target, angle, distance }: IProps) => {
    const ref = useRef<SpotLight>(null);
    const targetRef = useRef(new Object3D());
    const [intensity, setIntensity] = useState(0);
    const delayRef = useRef(0);
    const countRef = useRef(0);
    const scene = useSelector((state: IStoreStates) => state.scene);

    if (scene.isDebug) useHelper(ref as unknown as MutableRefObject<Object3D<Event> | undefined>, SpotLightHelper, 'cyan');

    useEffect(() => {
        if (target) {
            targetRef.current.position.set(target[0], target[1], target[2]);
            ref.current && ref.current.target.updateMatrixWorld();
        }
        const intervalId = setInterval(() => {
            if (countRef.current > (count ?? 10)) {
                delayRef.current = delay ?? 20;
                countRef.current = 0;
            }
            if (delayRef.current > 0) {
                if (ref.current?.intensity === 0.8) {
                    setIntensity(0);
                }
                delayRef.current -= 1;
            } else {
                if (ref.current?.intensity !== 0.8) {
                    setIntensity(0.8);
                } else {
                    setIntensity(0);
                }
                countRef.current++;
            }
        }, interval ?? 100);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <spotLight
            ref={ref}
            intensity={intensity}
            position={position ?? [0, 0, 0]}
            rotation={rotation ?? [0, 0, 0]}
            angle={angle ?? 1}
            distance={distance ?? 20}
            target={targetRef.current}
        />
    );
};

export default StronboscopeLight;
