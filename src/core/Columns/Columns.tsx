import React from 'react';
import clsx from 'clsx';

import Box from '@mui/material/Box';

export interface IColumns {
    content: any;
    aside: any;
    asideBg?: boolean;
    asideSize?: 'small' | 'big';
    reverse?: boolean;
}

import { useColumnsStyles } from '@core/Columns/styles';

export const Columns = ({ content, aside, asideBg, asideSize, reverse }: IColumns) => {
    const classes = useColumnsStyles();
    return (
        <Box
            className={clsx(classes.container, {
                [classes.reverse]: reverse,
            })}
        >
            <Box
                className={clsx(classes.aside, {
                    [classes.asideBg]: asideBg,
                    [classes.asideSmall]: asideSize === 'small',
                    [classes.asideReverse]: reverse,
                })}
            >
                {aside}
            </Box>
            <Box className={classes.content}>{content}</Box>
        </Box>
    );
};
