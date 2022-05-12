/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import Remy from './Model';

const Remys = (props) => {
    const group = useRef();
    const remys = [];
    for (let i = 0; i < 1; i++) {
        remys.push(<Remy key={'Remy' + i} playerId={props.playerId} />);
    }

    return (
        <group ref={group} {...props} dispose={null}>
            {remys}
        </group>
    );
};

export default Remys;
