import React from 'react';
import { useSelector } from 'react-redux';

const PlayerlistComponent = () => {
    const playerList = useSelector((state) => state.players.playerList);
    const showPlayerlist = useSelector((state) => state.interface.showPlayerlist);
    if (!showPlayerlist) {
        return null;
    }
    return (
        <>
            <div className="playerList">
                <div className="playerlistContent">
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
