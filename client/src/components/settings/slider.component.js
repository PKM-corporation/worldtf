/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

const SettingSliderComponent = (props) => {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        if (value > props.max) setValue(props.max);
        else if (value < props.min) setValue(props.min);
    }, [value]);

    return (
        <div className="w-75 mb-3 card flex-row align-items-center p-2 setting-item">
            <div className="col-8">
                <div>{props.name}</div>
            </div>
            <div className="col">
                <div className="row align-items-center">
                    <div className="col-6">
                        <input
                            type="range"
                            className="form-range"
                            min={props.min}
                            max={props.max}
                            step={props.step}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            className="form-control text-center fw-bold"
                            min={props.min}
                            max={props.max}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingSliderComponent;
