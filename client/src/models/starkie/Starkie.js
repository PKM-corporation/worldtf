/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import Starkie from './Model';

const Starkies = (props) => {
    const group = useRef();
    const starkies = [];
    for (let i = 0; i < 1; i++) {
        starkies.push(<Starkie key={'Starkie' + i} playerId={props.playerId} />);
    }

    return (
        <group ref={group} {...props} dispose={null}>
            {starkies}
        </group>
    );
};

export default Starkies;
