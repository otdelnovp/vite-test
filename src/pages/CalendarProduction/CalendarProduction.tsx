import React, { useCallback, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { AppDispatch } from '../../index';
import { compose } from 'redux';
import clsx from 'clsx';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import { PageTitle } from '@core/PageTitle/PageTitle';
import { Loader } from '@core/Loader/Loader';
import { SelectInput } from '@core/UniversalInput/SelectInput';
import AutocompleteInput from '@core/UniversalInput/AutocompleteInput';

import { RootState } from '@services/index';
import { userSelector } from '@services/userService';
import { IUserData } from '@helpers/authHelper';

import { ICalendarProductionFilter, calendarProductionFilterInit, ICalendarProductionDay } from './methods';
import { calendarProductionStates } from '@helpers/dictionariesHelper';

import { getCalendar, setCalendarDay, calendarProductionSelector } from '@services/calendarProductionService';

import { useCalendarProductionStyles } from './styles';
import { weekDayList, monthList, yearList, getRuLocaleWeekDay } from '@helpers/dateHelper';

export interface ICalendarProductionFilterComponent {
    user: IUserData | null;
    onSetFilter: (newFilter: ICalendarProductionFilter) => void;
}
const CalendarProductionFilter = React.memo(({ user, onSetFilter }: ICalendarProductionFilterComponent) => {
    const classes = useCalendarProductionStyles();
    const [filter, changeFilter] = useState<ICalendarProductionFilter>({ ...calendarProductionFilterInit });

    const onFilterChange = (event: any) => {
        const { name, value } = event.target;
        const newFilter = { ...filter, [name]: value };
        changeFilter(newFilter);
        onSetFilter(newFilter);
    };

    return (
        <Box className={classes.filter}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <SelectInput
                        name="Year"
                        label="Год"
                        placeholder="none"
                        value={filter.Year}
                        options={yearList.map((year) => ({
                            id: year.toString(),
                            value: year.toString(),
                            text: year.toString(),
                        }))}
                        onChange={onFilterChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <AutocompleteInput
                        name="CompanyId"
                        label="Компания"
                        placeholder="Выберите компанию"
                        dictionaryName="companies"
                        selectProps={{
                            valueField: 'Id',
                            textField: 'Name',
                        }}
                        value={filter.CompanyId || ''}
                        text={''}
                        onChange={onFilterChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <br />
                    <br />
                    Выберите компанию для редактирования ее календаря
                </Grid>
            </Grid>
        </Box>
    );
});

const CalendarProduction = ({ user, isLoading, isLoadingSet, calendarProduction }: CalendarProductionReduxProps) => {
    const classes = useCalendarProductionStyles();
    const dispatch = useDispatch<AppDispatch>();

    const [filter, setFilter] = useState<ICalendarProductionFilter>({ ...calendarProductionFilterInit });

    const loadCalendarProduction = useCallback(
        (withoutLoader?: boolean) => {
            dispatch(getCalendar(filter, { params: { withoutLoader } }));
        },
        [filter],
    );

    const setCalendarProductionDay = useCallback(
        (newDay: ICalendarProductionDay) => {
            dispatch(
                setCalendarDay(filter.CompanyId || null, newDay, {
                    onSuccess: () => loadCalendarProduction(true),
                }),
            );
        },
        [filter],
    );

    useEffect(() => {
        loadCalendarProduction();
    }, [filter]);

    const daySpacer = (count: number) =>
        [...Array(count)].map((item, index) => (
            <Box key={index} className={classes.day}>
                &nbsp;
            </Box>
        ));
    const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: theme.shadows[15],
            borderRadius: theme.spacing(1),
            maxWidth: 'none',
            padding: theme.spacing(2),
            fontSize: '1.3em',
        },
        [`& .${tooltipClasses.arrow}`]: {
            color: theme.palette.background.paper,
        },
    }));
    const dayTemplate = (currentDay: ICalendarProductionDay) => {
        return (
            <HtmlTooltip
                arrow
                key={currentDay.Date}
                title={
                    <Box>
                        <Typography variant="subtitle1">Выберите тип дня из списка ({new Date(currentDay.Date).toLocaleDateString('ru')})</Typography>
                        <ButtonGroup size="small" color="primary" variant="outlined" style={{ marginTop: 15 }}>
                            {calendarProductionStates?.map((stateItem) => (
                                <Button
                                    key={stateItem.Code}
                                    variant={currentDay.DayType === stateItem.Code ? 'contained' : 'outlined'}
                                    onClick={() => setCalendarProductionDay({ ...currentDay, DayType: stateItem.Code })}
                                >
                                    {stateItem.Name}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Box>
                }
            >
                <Box
                    className={clsx(classes.day, {
                        [classes.dayOff]: currentDay.DayType === 'R',
                        [classes.dayShort]: currentDay.DayType === 'S',
                        [classes.dayHoliday]: currentDay.DayType === 'H',
                    })}
                >
                    {new Date(currentDay.Date).getDate()}
                </Box>
            </HtmlTooltip>
        );
    };
    const monthCalendar = (month: ICalendarProductionDay[], monthIndex: number) => {
        const firstDay = getRuLocaleWeekDay(new Date(month[0].Date).getDay());
        return (
            <Grid item xs={3} key={monthIndex + filter.Year + filter.CompanyId}>
                <Box className={classes.month}>
                    <Box className={classes.monthName}>{monthList[monthIndex]}</Box>
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
                    </Box>
                </Box>
            </Grid>
        );
    };

    return (
        <Box className={classes.root}>
            <PageTitle title="Производственный календарь" />
            <CalendarProductionFilter user={user} onSetFilter={setFilter} />
            {isLoading ? (
                <Loader />
            ) : (
                <Grid container spacing={2}>
                    {calendarProduction.map((item, index) => monthCalendar(item, index))}
                </Grid>
            )}
        </Box>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { isLoading, isLoadingSet, calendarProduction } = calendarProductionSelector(state);
    return { user, isLoading, isLoadingSet, calendarProduction };
};

const connector = connect(mapStateToProps);
type CalendarProductionReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(CalendarProduction);
