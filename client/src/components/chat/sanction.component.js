/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SanctionComponent = (props) => {
    const [text, setText] = useState('');
    const { t } = useTranslation();
    useEffect(() => {
        switch (props.sanction.sanction) {
            case 'Ban':
                setText(t('sanction.ban', props.sanction.options));
                break;
            case 'Kick':
                setText(t('sanction.kick', props.sanction.options));
                break;
        }
    }, [props.verbose]);
    return <span className="sanction">{text}</span>;
};

export default SanctionComponent;
