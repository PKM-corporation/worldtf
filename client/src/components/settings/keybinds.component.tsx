/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRedo, FaTrash } from 'react-icons/fa';

interface IProps {
    keybinds: string | null;
    name: string;
    keybindsDefault: string;
}
const SettingKeybindsComponent = ({ name, keybinds, keybindsDefault }: IProps) => {
    const input = useRef(null);
    const [keybind, setKeybind] = useState(keybinds);
    const [edit, setEdit] = useState(false);
    const { t } = useTranslation();

    const handleKeybind = (e: KeyboardEvent) => {
        e.preventDefault();
        let key = e.key;
        if (e.key.toLowerCase() === ' ') {
            key = t('settings.space');
        }
        setKeybind(key);
        removeEdit();
    };

    const removeEdit = () => {
        setEdit(false);
        document.removeEventListener('keydown', handleKeybind);
        document.removeEventListener('click', removeEdit);
    };

    useEffect(() => {
        if (edit) {
            setTimeout(() => {
                document.addEventListener('click', removeEdit);
            }, 0);

            document.addEventListener('keydown', handleKeybind);
        }
    }, [edit]);

    return (
        <div className="w-75 mb-3 card flex-row align-items-center p-2 setting-item">
            <div className="col-8">
                <div>{name}</div>
            </div>
            <div className="col">
                <div className="row">
                    <div className="col-6">
                        <div
                            ref={input}
                            onClick={() => {
                                if (!edit) setEdit(true);
                            }}
                            className="rounded input-keybind text-center p-2"
                        >
                            {edit || keybind == null ? 'unbound' : keybind}
                        </div>
                    </div>
                    <div className="col d-flex justify-between">
                        <button className="btn p-0 w-100" onClick={() => setKeybind(null)}>
                            <FaTrash className="text-white h5" />
                        </button>
                        <button className="btn p-0 w-100" onClick={() => setKeybind(keybindsDefault)}>
                            <FaRedo className="text-white h5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingKeybindsComponent;
