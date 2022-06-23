import React, { useEffect, useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
import { Sky, Stars } from '@react-three/drei';
import { AmbientLight, Mesh, ShaderMaterial } from 'three';
import { useSelector } from 'react-redux';
import { IStoreStates } from '../interfaces/store.interface';

type TSky = Mesh & {
    material: ShaderMaterial;
};

const SkyComponent = () => {
    const ambientLightRef = useRef<AmbientLight>(null);
    // const pointLightRef = useRef<PointLight>(null);
    const width = 90;
    const skyRef = useRef<TSky>(null);
    const starsRef = useRef<Mesh>(null);
    const player = useSelector((state: IStoreStates) => state.player);
    const sceneSlice = useSelector((state: IStoreStates) => state.scene);

    useEffect(() => {
        if (ambientLightRef.current) ambientLightRef.current.intensity = Math.max(sceneSlice.time, 0.1) * 0.3;
        // if (pointLightRef.current) pointLightRef.current.position.x = Math.cos(second / 60) * 10;
        // if (pointLightRef.current) pointLightRef.current.position.y = Math.sin(second / 60) * 20;
        if (skyRef.current) skyRef.current.material.uniforms.sunPosition.value.x = sceneSlice.time * 100;
        if (skyRef.current) skyRef.current.material.uniforms.sunPosition.value.y = sceneSlice.time * 50;
    }, [sceneSlice.time]);

    useEffect(() => {
        if (!player.position) return;
        if (starsRef.current) {
            starsRef.current.position.x = player.position.x;
            starsRef.current.position.z = player.position.z;
        }
    }, [player.position]);

    return (
        <>
            <ambientLight ref={ambientLightRef} intensity={0.3} />
            {/* <pointLight ref={pointLightRef} position={[30, 30, 30]} castShadow color="rgb(255, 220, 187)" intensity={0.6} /> */}
            <Sky ref={skyRef} sunPosition={[100, 50, 100]} distance={width * 4} />
            <Stars ref={starsRef} radius={1} depth={width} count={5000} factor={1} saturation={0} fade />
            {/* <Cloud position={[0, width, 0]} speed={0.001} opacity={0.5} /> */}
        </>
    );
};

export default SkyComponent;
