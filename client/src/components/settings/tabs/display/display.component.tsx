/* eslint-disable react/no-unescaped-entities */
import React, { RefObject, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SettingAccordionItem from '../../accordion-item.component';
import SettingChatComponent from './sub_tabs/chat.component';
import SettingGraphicsComponent from './sub_tabs/graphics.component';
import SettingInterfaceComponent from './sub_tabs/interface.component';
import SettingLanguageComponent from './sub_tabs/language.component';

const SettingDisplayTabsComponent = () => {
    const { t } = useTranslation();
    const languageRef = useRef<HTMLButtonElement>(null);
    const interfaceRef = useRef<HTMLButtonElement>(null);
    const graphicsRef = useRef<HTMLButtonElement>(null);
    const chatRef = useRef<HTMLButtonElement>(null);

    const executeScroll = (ref: RefObject<HTMLButtonElement>) => {
        if (ref.current == undefined) return;
        ref.current.scrollIntoView({
            behavior: 'smooth',
        });
    };
    return (
        <div className="tab-pane fade show active" id="display" role="tabpanel" aria-labelledby="display-tab">
            <div className="row w-100">
                <div className="col-3 ps-4 d-flex flex-column">
                    <button onClick={() => executeScroll(languageRef)} className="btn text-white">
                        {t('settings.language')}
                    </button>
                    <button onClick={() => executeScroll(chatRef)} className="btn text-white">
                        {t('settings.chat')}
                    </button>
                    <button onClick={() => executeScroll(interfaceRef)} className="btn text-white">
                        {t('settings.interface')}
                    </button>
                    <button onClick={() => executeScroll(graphicsRef)} className="btn text-white">
                        {t('settings.graphics')}
                    </button>
                </div>
                <div className="col">
                    <div className="card text-white p-3 settings-right-side">
                        <div className="accordion">
                            <SettingAccordionItem
                                name={t('settings.language')}
                                id="language"
                                refChild={languageRef}
                                component={<SettingLanguageComponent />}
                            />

                            <SettingAccordionItem name={t('settings.chat')} id="chat" refChild={chatRef} component={<SettingChatComponent />} />
                            <SettingAccordionItem
                                name={t('settings.interface')}
                                id="interface"
                                refChild={interfaceRef}
                                component={<SettingInterfaceComponent />}
                            />

                            <SettingAccordionItem
                                name={t('settings.graphics')}
                                id="graphics"
                                refChild={graphicsRef}
                                component={<SettingGraphicsComponent />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingDisplayTabsComponent;
