import React from 'react';

import Grow from '@mui/material/Grow';

interface IGrowItem {
    children: any;
    timeout?: number;
}

export const GrowTransition: React.FC<IGrowItem> = ({ children, timeout }) => {
    const [checked, setChecked] = React.useState(false);

    React.useEffect(() => {
        setChecked(true);
    }, []);

    React.useEffect(() => {
        return () => {
            setChecked(false);
        };
    }, []);

    return (
        <Grow in={checked} timeout={timeout ? timeout : 1000}>
            {children}
        </Grow>
    );
};
