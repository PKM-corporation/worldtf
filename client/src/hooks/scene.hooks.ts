import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Color, Fog } from 'three';
import { IStoreStates } from '../interfaces/store.interface';
import { SceneSliceActions } from '../store/slices/scene.slice';

export const useFog = () => {
    const { scene } = useThree();
    const dispatch = useDispatch();
    const sceneSlice = useSelector((state: IStoreStates) => state.scene);

    useEffect(() => {
        scene.fog = new Fog(new Color().fromArray(sceneSlice.fog.color as number[]), sceneSlice.fog.near, sceneSlice.fog.far);
    }, []);

    useEffect(() => {
        if (scene.fog) scene.fog.color = new Color().fromArray(sceneSlice.fog.color as number[]);
    }, [sceneSlice.fog.color]);

    useEffect(() => {
        let value: number;
        switch (sceneSlice.period) {
            case 'Afternoon':
            case 'Morning':
                if (sceneSlice.time <= 0.5) {
                    value = -2 * sceneSlice.time ** 2 + 2 * sceneSlice.time + 0.5;
                    dispatch(SceneSliceActions.setFogColor([value, value, value]));
                } else if (sceneSlice.fog.color[0] !== 1) {
                    dispatch(SceneSliceActions.setFogColor([1, 1, 1]));
                }
                break;
            case 'Evening':
            case 'Night':
                if (sceneSlice.time >= -0.5) {
                    value = 2 * sceneSlice.time ** 2 + 2 * sceneSlice.time + 0.5;
                    dispatch(SceneSliceActions.setFogColor([value, value, value]));
                } else if (sceneSlice.fog.color[0] !== 0) {
                    dispatch(SceneSliceActions.setFogColor([0, 0, 0]));
                }
                break;
            default:
                break;
        }
    }, [sceneSlice.time]);

    useEffect(() => {
        scene.fog = new Fog(new Color().fromArray(sceneSlice.fog.color as number[]), sceneSlice.fog.near, sceneSlice.fog.far);
    }, [sceneSlice.fog.far, sceneSlice.fog.near]);
};

export const useClock = () => {
    const oldTime = useRef(Math.floor(Date.now() / 100));
    const dispatch = useDispatch();
    const sceneSlice = useSelector((state: IStoreStates) => state.scene);

    useFrame(() => {
        const time = Math.floor(Date.now() / 100);
        if (time > oldTime.current) {
            const sin = Math.sin(time / 600);
            const oldSin = Math.sin(oldTime.current / 600);

            dispatch(SceneSliceActions.setTime(sin));

            if (Math.sign(sin) === -1) {
                if (sin < oldSin && sceneSlice.period !== 'Evening') {
                    // Evening
                    dispatch(SceneSliceActions.setPeriod('Evening'));
                } else if (sin > oldSin && sceneSlice.period !== 'Night') {
                    // Night
                    dispatch(SceneSliceActions.setPeriod('Night'));
                }
            } else {
                if (sin < oldSin && sceneSlice.period !== 'Afternoon') {
                    // Afternoon
                    dispatch(SceneSliceActions.setPeriod('Afternoon'));
                } else if (sin > oldSin && sceneSlice.period !== 'Morning') {
                    // Morning
                    dispatch(SceneSliceActions.setPeriod('Morning'));
                }
            }
            oldTime.current = time;
        }
    });
};
