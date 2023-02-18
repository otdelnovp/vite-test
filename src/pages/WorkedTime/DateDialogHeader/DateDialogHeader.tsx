import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useStyles } from './styles';

interface IDialogPageProps {
    title: string;
    onClose: () => void;
}

const DateDialogHeader = ({ title, onClose }: IDialogPageProps) => {
    const classes = useStyles();

    return (
        <Box className={classes.header}>
            <Box className={classes.pageTitle}>
                <Typography component="h1" variant="h1">
                    <Link to="/worked-time" onClick={onClose}>
                        Отработанное время
                    </Link>{' '}
                    &#8250; {title}
                </Typography>
            </Box>
            <Box>
                <Button onClick={onClose} variant="outlined">
                    Закрыть
                </Button>
            </Box>
        </Box>
    );
};

export default DateDialogHeader;
