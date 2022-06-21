import React, { useRef } from 'react';
import { Group } from 'three';
import MapModel from './Model';

interface IProps {
    position?: [x: number, y: number, z: number];
}

const Map = ({ position }: IProps) => {
    const group = useRef<Group>(null);
    const maps = [];
    for (let i = 0; i < 1; i++) {
        maps.push(<MapModel key={'Map' + i} />);
    }

    return (
        <group ref={group} position={position} dispose={null}>
            {maps}
        </group>
    );
};

export default Map;
