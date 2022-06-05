/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

const SettingToggleComponent = (props) => {
    const [value, setValue] = useState(props.value);

    return (
        <div className="w-75 mb-3 card flex-row align-items-center p-2 setting-item">
            <div className="col-8">
                <div>{props.name}</div>
            </div>
            <div className="col">
                <div className="form-check form-switch form-switch-md d-flex align-items-center justify-content-center">
                    <input className="form-check-input" type="checkbox" role="switch" checked={value} onChange={(e) => setValue(e.target.checked)} />
                </div>
            </div>
        </div>
    );
};

export default SettingToggleComponent;
