import React, { useRef, RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import SettingAccordionItem from '../../accordion-item.component';
import GameMovementComponent from './sub_tabs/movement.component';

const SettingGameTabsComponent = () => {
    const movementRef = useRef<HTMLButtonElement>(null);
    const { t } = useTranslation();
    const executeScroll = (ref: RefObject<HTMLButtonElement>) => {
        if (ref.current == undefined) return;
        ref.current.scrollIntoView({
            behavior: 'smooth',
        });
    };
    return (
        <div className="tab-pane fade" id="game" role="tabpanel" aria-labelledby="game-tab">
            <div className="row w-100">
                <div className="col-3 ps-4 d-flex flex-column">
                    <button onClick={() => executeScroll(movementRef)} className="btn text-white">
                        {t('settings.movement')}
                    </button>
                </div>
                <div className="col">
                    <div className="card text-white p-3 settings-right-side">
                        <div className="accordion">
                            <SettingAccordionItem
                                name={t('settings.movement')}
                                id="movement"
                                refChild={movementRef}
                                component={<GameMovementComponent />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingGameTabsComponent;
