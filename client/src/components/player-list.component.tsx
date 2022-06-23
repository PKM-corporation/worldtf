import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IStoreStates } from '../interfaces/store.interface';

const PlayerlistComponent = () => {
    const playersId = useSelector((state: IStoreStates) => state.players.ids);
    const players = useSelector((state: IStoreStates) => state.players.data);
    const showPlayerlist = useSelector((state: IStoreStates) => state.interface.showPlayerlist);
    const { t } = useTranslation();
    if (!showPlayerlist) {
        return null;
    }
    return (
        <>
            <div className="playerList">
                <div className="playerlistContent">
                    <h3>{t('interface.playerList')}</h3>
                    {playersId.map((id) => (
                        <div className="player" key={id}>
                            <div className="playerName">{players[id]?.pseudo}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default PlayerlistComponent;
