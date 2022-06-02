import React, { useRef } from 'react';
import WhiteClown from './Model';

const WhiteClowns = (props) => {
    const group = useRef();
    const whiteClowns = [];
    // eslint-disable-next-line react/prop-types
    for (let i = 0; i < 1; i++) {
        whiteClowns.push(<WhiteClown key={'WhiteClown' + i} />);
    }

    return (
        <group ref={group} {...props} dispose={null}>
            {whiteClowns}
        </group>
    );
};

export default WhiteClowns;
