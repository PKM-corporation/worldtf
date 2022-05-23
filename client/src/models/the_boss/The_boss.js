/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import TheBoss from './Model';

const TheBosses = (props) => {
    const group = useRef();
    const TheBosses = [];
    for (let i = 0; i < 1; i++) {
        TheBosses.push(<TheBoss key={'TheBoss' + i} playerId={props.playerId} />);
    }

    return (
        <group ref={group} {...props} dispose={null}>
            {TheBosses}
        </group>
    );
};

export default TheBosses;
