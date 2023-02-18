import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useGoBackStyles } from './styles';

export interface IGoBackProps {
    title?: string;
    link?: string;
}

export const GoBack = ({ title = 'Назад', link = '/' }: IGoBackProps) => {
    const classes = useGoBackStyles();
    return (
        <Link className={classes.goBack} to={link}>
            <ArrowBackIcon />
            <Box className={classes.title}>{title}</Box>
        </Link>
    );
};
