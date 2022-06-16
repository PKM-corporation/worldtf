/* eslint-disable react/prop-types */
import React, { ReactNode, RefObject } from 'react';

interface IProps {
    id: string;
    component: ReactNode;
    name: string;
    refChild: RefObject<HTMLButtonElement>;
}

const SettingAccordionItem = ({ id, component, name, refChild }: IProps) => {
    return (
        <div className="accordion-item mb-1">
            <h2 className="accordion-header" id={id}>
                <button
                    ref={refChild}
                    className="accordion-button text-white p-0 pt-1 pb-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${id}`}
                    aria-expanded="true"
                    aria-controls={`collapse-${id}`}
                >
                    {name || 'Name is missing'}
                </button>
            </h2>
            <div id={`collapse-${id}`} className="accordion-collapse collapse show" aria-labelledby={id}>
                <div className="accordion-body ps-0">{component || 'Component is missing'}</div>
            </div>
        </div>
    );
};

export default SettingAccordionItem;
