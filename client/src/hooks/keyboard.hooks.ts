import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreStates } from '../interfaces/store.interface';
import { jumpIfPossible } from '../services/player.service';
import { InterfaceSliceActions } from '../store/slices/interface.slice';
import { PlayerSliceActions } from '../store/slices/player.slice';

declare global {
    interface Navigator {
        keyboard?: {
            lock: (keys: string[]) => unknown;
        };
    }
}

export const useKeyboardControls = () => {
    const dispatch = useDispatch();
    const interfaceStore = useSelector((state: IStoreStates) => state.interface);
    const player = useSelector((state: IStoreStates) => state.player);
    const [keyDown, setKeyDown] = useState('');
    const [keyUp, setKeyUp] = useState('');

    const lockKeys = async () => {
        if (navigator.keyboard) {
            await document.documentElement.requestFullscreen();
            if (window.location.pathname !== '/universe') document.exitFullscreen();
            const keys = ['Escape'];
            await navigator['keyboard'].lock(keys);
        }
    };

    useEffect(() => {
        lockKeys();
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Tab' || e.code === 'Escape' || e.ctrlKey) {
                e.preventDefault();
            }
            setKeyUp('');
            setKeyDown(e.code);
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === 'Tab' || e.code === 'Escape' || e.ctrlKey) {
                e.preventDefault();
            }
            setKeyDown('');
            setKeyUp(e.code);
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        switch (keyDown) {
            case 'Tab':
                if (!interfaceStore.showGameMenu && !interfaceStore.isChatting) {
                    dispatch(InterfaceSliceActions.setShowPlayerlist(true));
                }
                break;
            case 'KeyW':
                if (player.isMoveForward || interfaceStore.isChatting) break;
                dispatch(PlayerSliceActions.setIsMoveForward(true));
                break;
            case 'KeyA':
                if (player.isMoveLeft || interfaceStore.isChatting) break;
                dispatch(PlayerSliceActions.setIsMoveLeft(true));
                break;
            case 'KeyD':
                if (player.isMoveRight || interfaceStore.isChatting) break;
                dispatch(PlayerSliceActions.setIsMoveRight(true));
                break;
            case 'KeyS':
                if (player.isMoveBackward || interfaceStore.isChatting) break;
                dispatch(PlayerSliceActions.setIsMoveBackward(true));
                break;
            case 'ShiftLeft':
                if (player.sprinting || interfaceStore.isChatting) break;
                dispatch(PlayerSliceActions.setSprinting(true));
                break;
            case 'Space':
                if (player.jumping || interfaceStore.isChatting) break;
                jumpIfPossible();
                break;
            default:
                break;
        }
    }, [keyDown]);

    useEffect(() => {
        switch (keyUp) {
            case 'Tab':
                dispatch(InterfaceSliceActions.setShowPlayerlist(false));
                break;
            case 'KeyT':
                if (!interfaceStore.showGameMenu && !interfaceStore.isChatting) {
                    dispatch(InterfaceSliceActions.setIsChatting(true));
                }
                break;
            case 'Escape':
                if (interfaceStore.isChatting) {
                    dispatch(InterfaceSliceActions.setIsChatting(false));
                    break;
                }
                if (!interfaceStore.showGameMenu) {
                    dispatch(InterfaceSliceActions.setShowGameMenu(true));
                } else {
                    dispatch(InterfaceSliceActions.setShowGameMenu(false));
                    dispatch(InterfaceSliceActions.setShowSettings(false));
                }
                break;
            case 'KeyW':
                player.isMoveForward && dispatch(PlayerSliceActions.setIsMoveForward(false));
                break;
            case 'KeyA':
                player.isMoveLeft && dispatch(PlayerSliceActions.setIsMoveLeft(false));
                break;
            case 'KeyD':
                player.isMoveRight && dispatch(PlayerSliceActions.setIsMoveRight(false));
                break;
            case 'KeyS':
                player.isMoveBackward && dispatch(PlayerSliceActions.setIsMoveBackward(false));
                break;
            case 'ShiftLeft':
                player.sprinting && dispatch(PlayerSliceActions.setSprinting(false));
                break;
            default:
                break;
        }
    }, [keyUp]);
};
