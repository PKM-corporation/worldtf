/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TLanguage } from '../../interfaces/user.interface';

interface IProps {
    callBack?: (value: TLanguage) => unknown;
    name: string;
    value: TLanguage | string | number;
    options?: Array<[value: TLanguage | string | number, label: string | number]>;
}

const SettingSelectComponent = ({ callBack, name, options, value }: IProps) => {
    const [newValue, setValue] = useState(value);

    useEffect(() => {
        if (callBack) callBack(value as TLanguage);
    }, [value]);
    return (
        <div className="w-75 mb-3 card flex-row align-items-center p-2 setting-item">
            <div className="col-8">
                <div>{name}</div>
            </div>
            <div className="col">
                <select className="form-control" value={newValue} onChange={(e) => setValue(e.target.value)}>
                    {options &&
                        options.map((option) => (
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
