/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

const SettingSelectComponent = (props) => {
    const options = props.options || [];
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        if (props.callBack) props.callBack(value);
    }, [value]);
    return (
        <div className="w-75 mb-3 card flex-row align-items-center p-2 setting-item">
            <div className="col-8">
                <div>{props.name}</div>
            </div>
            <div className="col">
                <select className="form-control" value={value} onChange={(e) => setValue(e.target.value)}>
                    {options.map((option) => (
                        <option key={option[0]} value={option[0]}>
                            {option[1]}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SettingSelectComponent;
