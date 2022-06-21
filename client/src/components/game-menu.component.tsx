import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IStoreStates } from '../interfaces/store.interface';
import { InterfaceSliceActions } from '../store/slices/interface.slice';
import SettingsComponent from './settings/settings.component';

const GameMenuComponent = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const interfaceStore = useSelector((state: IStoreStates) => state.interface);

    if (!interfaceStore.showGameMenu) return <></>;
    return (
        <>
            <div className="hide-background"></div>
            <div id="game-menu" style={{ opacity: interfaceStore.showSettings ? 0 : 1 }}>
                <div onClick={() => dispatch(InterfaceSliceActions.setShowGameMenu(false))}>Reprendre</div>
                <div onClick={() => dispatch(InterfaceSliceActions.setShowSettings(true))}>{t('home.settings')}</div>
                <div onClick={() => navigate('/')}>Retour au menu</div>
            </div>
            <SettingsComponent />
        </>
    );
};

export default GameMenuComponent;
