import React from 'react';
import MapModel from './Model';
import { Stool } from '../../prefabs/stool.prefab';
import MapHitbox from './map.hitbox';
import SpotLightDiscoLight from '../../scene/lights/spotlight-disco.light';
import { Table } from '../../prefabs/table.prefab';
import CeilingLight from '../../scene/lights/ceiling.light';
import WindowLight from '../../scene/lights/window.light';

interface IProps {
    position?: [x: number, y: number, z: number];
}

const Map = ({ position }: IProps) => {
    return (
        <group position={position} dispose={null}>
            <Stool position={[-5.5, 0, 3]} rotation={[0, Math.PI / 2, 0]} />
            <Stool position={[-5.5, 0, 4]} rotation={[0, Math.PI / 8, 0]} />
            <Stool position={[-5.5, 0, 5]} rotation={[0, Math.PI / 6, 0]} />
            <Stool position={[-5.5, 0, 6]} rotation={[0, Math.PI / 8, 0]} />
            <Stool position={[-5.5, 0, 7]} rotation={[0, Math.PI / 8, 0]} />
            <Stool position={[-5.5, 0, 8]} rotation={[0, Math.PI / 4, 0]} />
            <Table position={[-7.5, 0, -4]} />
            <Table position={[-6, 0, -7.5]} />
            <Table position={[7.5, 0, -7.5]} />
            <WindowLight position={[-5.25, 2, -11]} rotation={[0, Math.PI, 0]} width={6} height={2} intensity={5} />
            <SpotLightDiscoLight color={'#ff0000'} position={[5, 5, 9]} angle={0.2} distance={10} target={[4, 0, 10]} />
            <SpotLightDiscoLight color={'#00ff00'} position={[0, 5, 9]} angle={0.2} distance={10} target={[3, 0, 5]} />
            {/*<StronboscopeLight position={[10, 5, -10]} target={[-10, 4, 10]} count={20} interval={50} angle={0.8} delay={50} distance={30} />*/}
            <CeilingLight position={[5, 4.9, 5]} width={5} rotation={[Math.PI / 2, Math.PI, 0]} height={2} isAtNight={true} intensity={4} />
            <CeilingLight position={[5, 4.9, -5]} width={5} rotation={[Math.PI / 2, Math.PI, 0]} height={2} isAtNight={true} intensity={4} />
            <CeilingLight position={[-5, 4.9, 5]} width={5} rotation={[Math.PI / 2, Math.PI, 0]} height={2} isAtNight={true} intensity={4} />
            <CeilingLight position={[-5, 4.9, -5]} width={5} rotation={[Math.PI / 2, Math.PI, 0]} height={2} isAtNight={true} intensity={4} />
            <MapHitbox />
            <MapModel />
        </group>
    );
};

export default Map;
