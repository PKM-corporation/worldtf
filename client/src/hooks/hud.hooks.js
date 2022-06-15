import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsChatting, setShowPlayerlist, setShowSettings } from '../store/slices/interface.slice';

export const useKeyboardHUDControls = () => {
    const dispatch = useDispatch();
    const interfaceStore = useSelector((state) => state.interface);
    const [keyDown, setKeyDown] = useState(null);
    const [keyUp, setKeyUp] = useState(null);

    const lockKeys = async () => {
        if ('keyboard' in navigator && 'lock' in navigator.keyboard) {
            await document.documentElement.requestFullscreen();
            if (window.location.pathname !== '/universe') document.exitFullscreen();
            const keys = ['Escape'];
            await navigator.keyboard.lock(keys);
        }
    };

    useEffect(() => {
        lockKeys();
        const handleKeyDown = (e) => {
            if (e.code === 'Tab' || e.code === 'Escape' || e.ctrlKey) {
                e.preventDefault();
            }
            setKeyUp(null);
            setKeyDown(e.code);
        };
        const handleKeyUp = (e) => {
            if (e.code === 'Tab' || e.code === 'Escape' || e.ctrlKey) {
                e.preventDefault();
            }
            setKeyDown(null);
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
                if (!interfaceStore.showSettings && !interfaceStore.isChatting) {
                    dispatch(setShowPlayerlist(true));
                }
                break;
            default:
                break;
        }
    }, [keyDown]);

    useEffect(() => {
        switch (keyUp) {
            case 'Tab':
                dispatch(setShowPlayerlist(false));
                break;
            case 'KeyT':
                if (!interfaceStore.showSettings && !interfaceStore.isChatting) {
                    dispatch(setIsChatting(true));
                }
                break;
            case 'Escape':
                if (!interfaceStore.showSettings) {
                    dispatch(setIsChatting(false));
                    dispatch(setShowSettings(true));
                } else {
                    dispatch(setShowSettings(false));
                }
                break;
            default:
                break;
        }
    }, [keyUp]);
};
