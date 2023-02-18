import React from 'react';
import moment from 'moment';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { addDaysToDate } from '@helpers/dateHelper';

import { getMonday } from '../WeeklyReportTable/methods';
import { getWeekNumber } from './methods';
import { sx } from "./styles";

interface IWeekChangerProps {
    date: string;
    disabled: boolean;
    changeWeek: (diffWeek: number) => void
}

const WeekChanger = React.memo(({ date, disabled, changeWeek }: IWeekChangerProps) => {

    const mondayDate = new Date(getMonday(date))
    const sundayDate = addDaysToDate(mondayDate, 6)

    const weekStart = moment(mondayDate).format("DD.MM.YYYY");
    const weekEnd = moment(sundayDate).format("DD.MM.YYYY");

    const weekNumber = getWeekNumber(mondayDate)[1]

    return (
        <Box sx={sx.container}>
            <Tooltip title="На неделю назад">
                <IconButton aria-label="prev-week" sx={sx.iconBtn} onClick={() => changeWeek(-1)} disabled={disabled}>
                    <ChevronLeftIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="На неделю вперед">
                <IconButton aria-label="next-week" sx={sx.iconBtn} onClick={() => changeWeek(1)} disabled={disabled}>
                    <ChevronRightIcon />
                </IconButton>
            </Tooltip>
            <Typography sx={sx.description}>{weekNumber} неделя ({weekStart} - {weekEnd})</Typography>
        </Box>
    );
});


export default WeekChanger;