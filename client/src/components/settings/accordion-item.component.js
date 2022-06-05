/* eslint-disable react/prop-types */
import React from 'react';

const SettingAccordionItem = (props) => {
    return (
        <div className="accordion-item mb-1">
            <h2 className="accordion-header" id={props.id}>
                <button
                    ref={props.refChild}
                    className="accordion-button text-white p-0 pt-1 pb-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${props.id}`}
                    aria-expanded="true"
                    aria-controls={`collapse-${props.id}`}
                >
                    {props.name || 'Name is missing'}
                </button>
            </h2>
            <div id={`collapse-${props.id}`} className="accordion-collapse collapse show" aria-labelledby={props.id}>
                <div className="accordion-body ps-0">{props.component || 'Component is missing'}</div>
            </div>
        </div>
    );
};

export default SettingAccordionItem;
