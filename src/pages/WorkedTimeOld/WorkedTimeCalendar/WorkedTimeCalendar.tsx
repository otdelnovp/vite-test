import React from 'react';
import clsx from 'clsx';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { IUserData } from '@helpers/authHelper';
import { getRuLocaleWeekDay, monthList, weekDayList } from '@helpers/dateHelper';

import { IFilter } from '../WorkedTimeFilter/WorkedTimeFilter';
import { IWorkedTimeDateData } from '../methods';
import { getCalendarData, ICalendarDay } from './methods';

import { useStyles } from './styles';
import { sx } from '../styles';


interface IWorkedTimeCalendar {
    user: IUserData | null;
    filter: IFilter;
    dateList: IWorkedTimeDateData[];
    setDateList: (newDateList: IWorkedTimeDateData[]) => void;
    selectedDate: string;
    setSelectedDate: (newSelectedDate: string) => void
}
const WorkedTimeCalendar = ({ user, filter, dateList, setDateList, selectedDate, setSelectedDate }: IWorkedTimeCalendar) => {
    const classes = useStyles();

    const handleClick = (date: string) => {
        setSelectedDate(date)
    }

    const daySpacer = (count: number) =>
        [...Array(count)].map((item, index) => (
            <Box key={index} className={classes.day}>
                &nbsp;
            </Box>
        ));

    const dayTemplate = (currentDay: ICalendarDay) => {
        return (
            <Box
                className={clsx(classes.day, {
                    [classes.dayOff]: currentDay.DayType === 'R',
                    [classes.dayShort]: currentDay.DayType === 'S',
                    [classes.dayHoliday]: currentDay.DayType === 'H',
                    [classes.daySelected]: currentDay.Date === selectedDate,
                })}
                onClick={() => handleClick(currentDay.Date)}
            >
                <p className={classes.dater}>{new Date(currentDay.Date).getDate()}</p>
                <p className={classes.hours}>{currentDay.Hours ? currentDay.Hours : ''}</p>
            </Box>
        );
    };

    const monthCalendar = (month: ICalendarDay[], monthIndex: number) => {
        const firstDay = getRuLocaleWeekDay(new Date(month[0].Date).getDay());
        const lastDay = getRuLocaleWeekDay(new Date(month[month.length - 1].Date).getDay());
        return (
            <Grid item xs={3} key={monthIndex + filter.year + (filter.companyId || "null")}>
                <Typography variant='h6' sx={sx.h6}>{monthList[monthIndex+1]} {filter.year} года</Typography>
                <Box className={classes.month}>
                    <Box className={classes.weekDays}>
                        {weekDayList.map((weekDayName, index) => (
                            <Box key={weekDayName} className={clsx(classes.weekDay, { [classes.weekDayOff]: index === 5 || index === 6 })}>
                                {weekDayName}
                            </Box>
                        ))}
                    </Box>
                    <Box className={classes.days}>
                        {firstDay !== 0 ? daySpacer(firstDay) : null}
                        {month.map((day) => dayTemplate(day))}
                        {lastDay !== 6 ? daySpacer(6 - lastDay) : null}
                    </Box>
                </Box>
            </Grid>
        );
    };

    return (
        <Box>
            {monthCalendar(getCalendarData(2022, 8, dateList), 7)}
        </Box>
    );
};

export default WorkedTimeCalendar;