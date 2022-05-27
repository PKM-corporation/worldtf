import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const PlayerlistComponent = () => {
    const playerList = useSelector((state) => state.players.playerList);
    const showPlayerlist = useSelector((state) => state.interface.showPlayerlist);
    const { t } = useTranslation();
    if (!showPlayerlist) {
        return null;
    }
    return (
        <>
            <div className="playerList">
                <div className="playerlistContent">
                    <h3>{t('interface.playerList')}</h3>
                    {playerList.map((player) => (
                        <div className="player" key={player.id}>
                            <div className="playerName">{player.username}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default PlayerlistComponent;
