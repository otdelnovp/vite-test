import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useDashboardTileStyles } from './styles';

import logo from '@images/logo_outstroked.svg';

import { globalThemeMUI } from '@theme/main';

const buttonStyle = {
    margin: globalThemeMUI.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    padding: globalThemeMUI.spacing(1.5),
    alignItems: 'start',
    textAlign: 'left',
    border: `${globalThemeMUI.spacing(0.3)} solid #ddd`,
    lineHeight: 1.4,
    '&:hover': {
        border: `${globalThemeMUI.spacing(0.3)} solid #ddd`,
    },
};

interface IDashboardTile {
    title: string;
}
const DashboardTile = ({ title }: IDashboardTile) => {
    const classes = useDashboardTileStyles();

    return (
        <Button variant="outlined" sx={buttonStyle}>
            <h3 className={classes.tileTitle}>{title}</h3>
            <Box className={classes.boxHorizontal}>
                <div className={classes.verticalLine} />
                <Box className={classes.boxValue}>
                    <h1 className={classes.value}>0</h1>
                    <p className={classes.description}>актуальные</p>
                </Box>
                <div className={classes.divider} />
                <div className={classes.verticalLine} />
                <Box className={classes.boxValue}>
                    <h1 className={classes.value}>0</h1>
                    <p className={classes.description}>планируемые</p>
                </Box>
            </Box>
        </Button>
    );
};

export default DashboardTile;

