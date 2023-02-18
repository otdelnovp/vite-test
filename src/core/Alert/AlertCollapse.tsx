import React from 'react';

import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

interface IAlertCollapse {
    show: boolean;
    useStyle: boolean;
    severity?: 'success' | 'error' | 'warning';
    onClose: () => void;
    message: string;
}

export const AlertCollapse = ({ show, useStyle, severity, message, onClose }: IAlertCollapse) => {
    return (
        <Collapse in={show} style={{ paddingBottom: useStyle ? 10 : 0 }}>
            <Alert variant="outlined" severity={severity} onClose={onClose}>
                {message}
            </Alert>
        </Collapse>
    );
};
