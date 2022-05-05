import React from 'react';
import { Canvas } from '@react-three/fiber';
import TestComponent from '../components/test.component';

const GamePage = () => {
    return (
        <div id="canvas-container">
            <Canvas>
                <TestComponent />
            </Canvas>
        </div>
    );
};

export default GamePage;
