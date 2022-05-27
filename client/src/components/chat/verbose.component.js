/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const VerboseComponent = (props) => {
    const [text, setText] = useState('');
    const { t } = useTranslation();
    useEffect(() => {
        switch (props.verbose.verboseType) {
            case 'Tp':
                setText(t('verbose.tp', props.verbose.options));
                break;
            case 'Cancel':
                setText(t('verbose.cancel', props.verbose.options));
                break;
        }
    }, [props.verbose]);
    return <span className="verbose">{text}</span>;
};

export default VerboseComponent;
