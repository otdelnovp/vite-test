import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { Box } from '@mui/material';
import { toLiveClockDateFormat, toLiveClockTimeFormat } from '@helpers/dateHelper';
import { sx } from './styles';

let clockInterval: any = undefined;

interface IBaseClock {
    widgetName: string;
}
const BaseClock = ({ widgetName }: IBaseClock) => {
    const [currentTime, setCurrentTime] = useState(moment());

    useEffect(() => {
        clockInterval = setInterval(() => setCurrentTime(moment()), 1000);
        return () => {
            if (clockInterval) clearInterval(clockInterval);
        };
    }, []);

    return (
        <Box sx={sx.container}>
            <Box sx={sx.time}>{toLiveClockTimeFormat(currentTime)}</Box>
            <Box>{toLiveClockDateFormat(currentTime)}</Box>
        </Box>
    );
};

export default BaseClock;
