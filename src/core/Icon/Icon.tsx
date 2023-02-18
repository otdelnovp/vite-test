import React from 'react';

import { useIconStyles } from './styles';

import weight from '@images/icons/weight.png';
import volume from '@images/icons/volume.png';
import pallets from '@images/icons/pallets.png';
import temp from '@images/icons/temp.png';

export interface IIconProps {
    name?: string;
    //size?: 'small' | 'large';
}

export const Icon = ({ name }: IIconProps) => {
    const classes = useIconStyles();
    switch (name) {
        case 'weight':
            return <img src={weight} className={classes.icon} />;
        case 'volume':
            return <img src={volume} className={classes.icon} />;
        case 'pallets':
            return <img src={pallets} className={classes.icon} />;
        case 'temp':
            return <img src={temp} className={classes.icon} />;
        default:
            return null;
    }
};
