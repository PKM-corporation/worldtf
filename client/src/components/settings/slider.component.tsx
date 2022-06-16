/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

interface IProps {
    name: string;
    value: number | string;
    min: number;
    max: number;
    step: number;
}

const SettingSliderComponent = ({ name, value, min, max, step }: IProps) => {
    const [newValue, setValue] = useState(value);

    useEffect(() => {
        if (newValue > max) setValue(max);
        else if (newValue < min) setValue(min);
    }, [newValue]);

    return (
        <div className="w-75 mb-3 card flex-row align-items-center p-2 setting-item">
            <div className="col-8">
                <div>{name}</div>
            </div>
            <div className="col">
                <div className="row align-items-center">
                    <div className="col-6">
                        <input
                            type="range"
                            className="form-range"
                            min={min}
                            max={max}
                            step={step}
                            value={newValue}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            className="form-control text-center fw-bold"
                            min={min}
                            max={max}
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
