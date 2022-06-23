import { useHelper } from '@react-three/drei';
import anime from 'animejs';
import React, { MutableRefObject, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Object3D, SpotLight, SpotLightHelper } from 'three';
import { IStoreStates } from '../../interfaces/store.interface';

interface IProps {
    position?: [x: number, y: number, z: number];
    rotation?: [x: number, y: number, z: number];
    target?: [x: number, y: number, z: number];
    distance?: number;
    angle?: number;
    color?: string;
    animation?: number;
}

const SpotLightDiscoLight = ({ position, rotation, target, distance, angle, color, animation }: IProps) => {
    const targetRef = useRef(new Object3D());
    const spotLightRef = useRef<SpotLight>(null);
    const scene = useSelector((state: IStoreStates) => state.scene);

    function animation1() {
        const tl = anime.timeline({
            targets: targetRef.current.position,
            duration: 3000,
            delay: 0,
            easing: 'linear',
            update: function () {
                spotLightRef.current && spotLightRef.current.target.updateMatrixWorld();
            },
        });

        tl.add({
            x: targetRef.current.position.x,
            z: targetRef.current.position.z,
        })
            .add({
                x: 0,
                z: 0,
            })
            .add({
                x: targetRef.current.position.x - 1,
                z: targetRef.current.position.z - 1,
                changeComplete: () => {
                    setTimeout(() => {
                        tl.restart();
                    });
                },
            });
    }

    useEffect(() => {
        if (target) {
            targetRef.current.position.set(target[0], target[1], target[2]);
            spotLightRef.current && spotLightRef.current.target.updateMatrixWorld();
        }
        animation = animation ?? 1;
        switch (animation) {
            case 1:
                animation1();
                break;
            default:
                break;
        }
        return () => {
            anime.remove(targetRef.current.position);
        };
    }, []);

    if (scene.isDebug) useHelper(spotLightRef as unknown as MutableRefObject<Object3D<Event> | undefined>, SpotLightHelper, 'cyan');

    return (
        <spotLight
            castShadow
            position={position ?? [0, 0, 0]}
            rotation={rotation ?? [0, 0, 0]}
            angle={angle ?? 1}
            distance={distance ?? 20}
            ref={spotLightRef}
            color={color}
            target={targetRef.current}
        />
    );
};

export default SpotLightDiscoLight;
