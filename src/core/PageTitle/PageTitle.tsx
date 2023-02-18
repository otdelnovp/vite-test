import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { usePageTitleStyles } from './styles';

export interface IPageTitleProps {
    title?: string | JSX.Element | null;
    before?: any;
    after?: any;
    info?: any;
}

export const PageTitle = ({ title, info, before, after }: IPageTitleProps) => {
    const classes = usePageTitleStyles();
    return (
        <Box className={classes.pageTitle}>
            {before}
            <Typography className={classes.title} component="h1" variant="h1">
                {title}
            </Typography>
            {info}
            {after}
        </Box>
    );
};
