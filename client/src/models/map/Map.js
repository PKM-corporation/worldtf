import React, { useRef } from 'react';
import WorldMap from './Model';

const WorldMaps = (props) => {
    const group = useRef();
    const worldMaps = [];
    // eslint-disable-next-line react/prop-types
    for (let i = 0; i < 1; i++) {
        worldMaps.push(<WorldMap key={'WorldMap' + i} />);
    }

    return (
        <group ref={group} {...props} dispose={null}>
            {worldMaps}
        </group>
    );
};

export default WorldMaps;
