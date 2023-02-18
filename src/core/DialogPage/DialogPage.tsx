import React from 'react';

import Box from '@mui/material/Box';

import { sx } from './styles';

interface IDialogPageProps {
    children?: JSX.Element | JSX.Element[];
}

const DialogPage = ({ children }: IDialogPageProps) => {
    return (<Box sx={sx.dialogPage}>
        {children}
    </Box>);
};

export default DialogPage;