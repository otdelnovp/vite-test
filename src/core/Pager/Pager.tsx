import React from 'react';
import clsx from 'clsx';

import Box from '@mui/material/Box';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { usePagerStyles } from './styles';

export interface IPager {
    count: number;
    current: number;
    limit?: number;
    onChange: (i: number) => void;
}

export const Pager = ({ count, current, limit = 1, onChange }: IPager) => {
    const classes = usePagerStyles();

    const total = Math.ceil(count / limit);
    const pages = [...Array(total)].map((item, index) => index + 1);

    const prev =
        current > 3 ? (
            <React.Fragment>
                <div className={classes.arrow} onClick={() => onChange(1)}>
                    <FirstPageIcon />
                </div>
                <div className={classes.arrow} onClick={() => onChange(current - 1)}>
                    <ChevronLeftIcon />
                </div>
                <div className={classes.item} onClick={() => onChange(1)}>
                    1
                </div>
                <div className={classes.divider}>&hellip;</div>
            </React.Fragment>
        ) : null;

    const next =
        total - current >= 3 ? (
            <React.Fragment>
                <div className={classes.divider}>&hellip;</div>
                <div className={classes.item} onClick={() => onChange(total)}>
                    {total}
                </div>
                <div className={classes.arrow} onClick={() => onChange(current + 1)}>
                    <ChevronRightIcon />
                </div>
                <div className={classes.arrow} onClick={() => onChange(total)}>
                    <LastPageIcon />
                </div>
            </React.Fragment>
        ) : null;

    return count ? (
        <Box className={classes.pager}>
            {total && total > 1 ? (
                <Box className={classes.list}>
                    {prev}
                    {pages.map((item) =>
                        Math.abs(current - item) < 3 ? (
                            <Box
                                key={item}
                                className={clsx(classes.item, {
                                    [classes.current]: item === current,
                                })}
                                onClick={() => onChange(item)}
                            >
                                {item}
                            </Box>
                        ) : null,
                    )}
                    {next}
                </Box>
            ) : (
                <Box />
            )}
            <Box className={classes.count}>
                Всего найдено: <b>{count}</b>
            </Box>
        </Box>
    ) : null;
};
