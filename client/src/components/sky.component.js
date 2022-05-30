import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Cloud, Sky, Stars } from '@react-three/drei';
import { Clock } from 'three';

const SkyComponent = () => {
    const ambientLightRef = useRef();
    const pointLightRef = useRef();
    const width = 50;
    const skyRef = useRef();
    const starsRef = useRef();
    var oldSecond = 0;
    useFrame(({ clock }) => {
        const second = Math.floor(Date.now() / 1000);
        if (second > oldSecond) {
            ambientLightRef.current.intensity = Math.max(Math.sin(second / 60), 0.1) * 0.3;
            pointLightRef.current.position.x = Math.cos(second / 60) * 10;
            pointLightRef.current.position.y = Math.sin(second / 60) * 20;
            skyRef.current.material.uniforms.sunPosition.value.x = Math.cos(second / 60) * 100;
            skyRef.current.material.uniforms.sunPosition.value.y = Math.sin(second / 60) * 50;
            oldSecond = second;
        }
    });

    return (
        <>
            <ambientLight ref={ambientLightRef} intensity={0.3} />
            <pointLight ref={pointLightRef} position={[10, 15, 10]} castShadow color="rgb(255, 220, 187)" intensity={0.7} />
            <Sky ref={skyRef} sunPosition={[100, 50, 100]} distance={width * 4} />
            <Stars ref={starsRef} radius={1} depth={width} count={5000} factor={1} saturation={0} fade />
            {/* <Cloud position={[0, width, 0]} speed={0.001} opacity={0.5} /> */}
        </>
    );
};

export default SkyComponent;
