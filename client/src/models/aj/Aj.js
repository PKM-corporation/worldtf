/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import Aj from './Model';

const Ajs = (props) => {
    const group = useRef();
    const ajs = [];
    for (let i = 0; i < 1; i++) {
        ajs.push(<Aj key={'Aj' + i} playerId={props.playerId} />);
    }

    return (
        <group ref={group} {...props} dispose={null}>
            {ajs}
        </group>
    );
};

export default Ajs;
