import React from 'react';
import { useSelector } from 'react-redux';
import { IStoreStates } from '../interfaces/store.interface';

const CrosshairComponent = () => {
    const interfaceStore = useSelector((state: IStoreStates) => state.interface);
    if (interfaceStore.showGameMenu || interfaceStore.isChatting) return <></>;
    return <div className="crosshair"></div>;
};

export default CrosshairComponent;
