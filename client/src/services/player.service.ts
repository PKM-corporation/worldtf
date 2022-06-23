import { Euler, Vector3 } from 'three';
import { Player } from '../class/player.class';
import { PlayerJumpCooldown, PlayerMovePrecision, PlayerRunSpeed, PlayerSpeed } from '../common/constant';
import { ICoordinates } from '../interfaces/player.interface';
import { IWebsocketPlayerDto } from '../interfaces/websocket.interface';
import { PlayerSliceActions } from '../store/slices/player.slice';
import { PlayersSliceActions } from '../store/slices/players.slice';
import store from '../store/store';

export const synchronizePlayers = (playersDto: IWebsocketPlayerDto[]) => {
    const playersId: string[] = [];

    for (const playerDto of playersDto) {
        playersId.push(playerDto.id);
        store.dispatch(PlayersSliceActions.setPlayer(new Player(playerDto).toObject()));
    }

    store.dispatch(PlayersSliceActions.setPlayersId(playersId));
};

export const setNewPlayer = (player: IWebsocketPlayerDto) => {
    const playersId = store.getState().players.ids.slice();
    playersId.push(player.id);
    store.dispatch(PlayersSliceActions.setPlayersId(playersId));
    store.dispatch(PlayersSliceActions.setPlayer(new Player(player).toObject()));
};

export const setPlayerSpeedIfNecessary = () => {
    const currentSpeed = store.getState().player.speed;
    const sprinting = store.getState().player.sprinting;
    const isMoveBackward = store.getState().player.isMoveBackward;

    if (sprinting) {
        if (isMoveBackward && currentSpeed !== PlayerRunSpeed / 2) {
            store.dispatch(PlayerSliceActions.setSpeed(PlayerRunSpeed / 2));
        } else if (!isMoveBackward && currentSpeed !== PlayerRunSpeed) {
            store.dispatch(PlayerSliceActions.setSpeed(PlayerRunSpeed));
        }
    } else {
        if (isMoveBackward && currentSpeed !== PlayerSpeed / 2) {
            store.dispatch(PlayerSliceActions.setSpeed(PlayerSpeed / 2));
        } else if (!isMoveBackward && currentSpeed !== PlayerSpeed) {
            store.dispatch(PlayerSliceActions.setSpeed(PlayerSpeed));
        }
    }
};

export const setPlayerPositionIfNecessary = (position: Vector3 | ICoordinates) => {
    const currentPosition = store.getState().player.position;
    if (
        Math.round(position.x * PlayerMovePrecision) / PlayerMovePrecision !==
            Math.round(currentPosition.x * PlayerMovePrecision) / PlayerMovePrecision ||
        Math.round(position.y * PlayerMovePrecision) / PlayerMovePrecision !==
            Math.round(currentPosition.y * PlayerMovePrecision) / PlayerMovePrecision ||
        Math.round(position.z * PlayerMovePrecision) / PlayerMovePrecision !==
            Math.round(currentPosition.z * PlayerMovePrecision) / PlayerMovePrecision
    ) {
        store.dispatch(PlayerSliceActions.setPosition({ x: position.x, y: position.y, z: position.z }));
    }
};

export const setPlayerRotationIfNecessary = (rotation: Euler | ICoordinates) => {
    const currentRotation = store.getState().player.rotation;

    if (rotation.x !== currentRotation.x || rotation.y !== currentRotation.y || rotation.z !== currentRotation.z) {
        store.dispatch(PlayerSliceActions.setRotation({ x: rotation.x, y: rotation.y, z: rotation.z }));
    }
};

export const setAnimationIfNecessary = () => {
    const currentAnimation = store.getState().player.currentAnimation;
    const sprinting = store.getState().player.sprinting;

    if (store.getState().player.falling) {
        if (currentAnimation !== 'Falling_idle') {
            return store.dispatch(PlayerSliceActions.setCurrentAnimation('Falling_idle'));
        }
        return;
    }
    if (store.getState().player.isMoveForward) {
        if (sprinting && currentAnimation !== 'Running_forward') {
            return store.dispatch(PlayerSliceActions.setCurrentAnimation('Running_forward'));
        } else if (!sprinting && currentAnimation !== 'Walking_forward') {
            return store.dispatch(PlayerSliceActions.setCurrentAnimation('Walking_forward'));
        }
        return;
    }
    if (store.getState().player.isMoveBackward) {
        if (sprinting && currentAnimation !== 'Running_backward') {
            return store.dispatch(PlayerSliceActions.setCurrentAnimation('Running_backward'));
        } else if (!sprinting && currentAnimation !== 'Walking_backward') {
            return store.dispatch(PlayerSliceActions.setCurrentAnimation('Walking_backward'));
        }
        return;
    }
    if (store.getState().player.isMoveLeft && !store.getState().player.isMoveRight) {
        if (sprinting && currentAnimation !== 'Running_left') {
            return store.dispatch(PlayerSliceActions.setCurrentAnimation('Running_left'));
        } else if (!sprinting && currentAnimation !== 'Walking_left') {
            return store.dispatch(PlayerSliceActions.setCurrentAnimation('Walking_left'));
        }
        return;
    }
    if (store.getState().player.isMoveRight && !store.getState().player.isMoveLeft) {
        if (sprinting && currentAnimation !== 'Running_right') {
            return store.dispatch(PlayerSliceActions.setCurrentAnimation('Running_right'));
        } else if (!sprinting && currentAnimation !== 'Walking_right') {
            return store.dispatch(PlayerSliceActions.setCurrentAnimation('Walking_right'));
        }
        return;
    }
    if (currentAnimation !== 'Idle') {
        return store.dispatch(PlayerSliceActions.setCurrentAnimation('Idle'));
    }
};

export const jumpIfPossible = () => {
    const falling = store.getState().player.falling;
    const timeToJump = store.getState().player.timeToJump;

    if (!falling) {
        const now = Date.now();
        if (now > timeToJump) {
            store.dispatch(PlayerSliceActions.setTimeToJump(now + PlayerJumpCooldown));
            store.dispatch(PlayerSliceActions.setJump(true));
        }
    }
};
