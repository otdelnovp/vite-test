import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import Box from '@mui/material/Box';
import { ITab } from '@core/Tabs/methods';

export interface ITabs {
    root: string;
    list: ITab[];
    active: string;
}

import { useTabsStyles } from '@core/Tabs/styles';

export const Tabs = ({ root, list, active }: ITabs) => {
    const classes = useTabsStyles();
    return (
        <Box className={classes.tabs}>
            {list.map((tab: ITab) => (
                <Link
                    key={tab.value}
                    to={root + tab.value}
                    className={clsx(classes.item, {
                        [classes.active]: tab.value === active,
                    })}
                >
                    {tab.title}
                </Link>
            ))}
        </Box>
    );
};
