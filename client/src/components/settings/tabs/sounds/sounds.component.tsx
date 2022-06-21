import React, { useRef, RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import SettingAccordionItem from '../../accordion-item.component';
import SettingAudioComponent from './sub_tabs/audio.component';

const SettingSoundsTabsComponent = () => {
    const audioRef = useRef<HTMLButtonElement>(null);
    const { t } = useTranslation();
    const executeScroll = (ref: RefObject<HTMLButtonElement>) => {
        if (ref.current == undefined) return;
        ref.current.scrollIntoView({
            behavior: 'smooth',
        });
    };
    return (
        <div className="tab-pane fade" id="sounds" role="tabpanel" aria-labelledby="sounds-tab">
            <div className="row w-100">
                <div className="col-3 ps-4 d-flex flex-column">
                    <button onClick={() => executeScroll(audioRef)} className="btn text-white">
                        {t('settings.audio')}
                    </button>
                </div>
                <div className="col">
                    <div className="card text-white p-3 settings-right-side">
                        <div className="accordion">
                            <SettingAccordionItem name={t('settings.audio')} id="audio" refChild={audioRef} component={<SettingAudioComponent />} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingSoundsTabsComponent;
