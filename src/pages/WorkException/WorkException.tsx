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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { PageTitle } from '@core/PageTitle/PageTitle';
import { Loader } from '@core/Loader/Loader';
import { SelectInput } from '@core/UniversalInput/SelectInput';
import AutocompleteInput from '@core/UniversalInput/AutocompleteInput';

import { RootState } from '@services/index';
import { userSelector } from '@services/userService';
import { IUserData } from '@helpers/authHelper';

import {
    IWorkExceptionFilter,
    workExceptionFilterInit,
    IWorkException,
    IWorkExceptionUser,
    IWorkExceptionUserInfo,
    IWorkExceptionInterval,
} from './methods';

import { getWorkException, setWorkExceptionDay, workExceptionSelector } from '@services/workExceptionService';
import { dictSelectors, getDepartments, getWorkExceptionTypes } from '@services/dictionaryService';

import { useWorkExceptionStyles } from './styles';
import { monthList, yearList, getCalendarWeeks, ICalendarWeek, getDaysInMonth } from '@helpers/dateHelper';
import { primaryColor } from '@theme/main';
import lightPalette from '@theme/lightPalette';
import darkPalette from '@theme/darkPalette';

export interface IWorkExceptionFilterComponent {
    user: IUserData | null;
    onSetFilter: (newFilter: IWorkExceptionFilter) => void;
}
const WorkExceptionFilter = React.memo(({ user, onSetFilter }: IWorkExceptionFilterComponent) => {
    const classes = useWorkExceptionStyles();
    const dispatch = useDispatch<AppDispatch>();

    const [filter, changeFilter] = useState<IWorkExceptionFilter>({ ...workExceptionFilterInit });

    const onFilterChange = (event: any) => {
        const { name, value } = event.target;
        const newFilter = { ...filter, [name]: value };
        if (name === 'CompanyId') {
            newFilter.DepartmentId = null;
            if (value) dispatch(getDepartments({ CompanyId: value }));
        }
        changeFilter(newFilter);
        onSetFilter(newFilter);
    };

    return (
        <Box component="div" className={classes.filter}>
            <Grid container spacing={2}>
                <Grid item xs={1}>
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
                <Grid item xs={2}>
                    <SelectInput
                        name="Month"
                        label="Месяц"
                        placeholder="none"
                        value={filter.Month}
                        options={monthList.map((month, index) => ({
                            id: (index + 1).toString(),
                            value: (index + 1).toString(),
                            text: month.toString(),
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
                        onChange={onFilterChange}
                    />
                </Grid>
                {filter.CompanyId ? (
                    <Grid item xs={5}>
                        <AutocompleteInput
                            name="DepartmentId"
                            label="Подразделение"
                            placeholder="Выберите подразделение"
                            dictionaryName="departments"
                            selectProps={{
                                valueField: 'Id',
                                textField: 'Name',
                            }}
                            value={filter.DepartmentId || ''}
                            onChange={onFilterChange}
                            filters={{ CompanyId: filter.CompanyId }}
                        />
                    </Grid>
                ) : null}
            </Grid>
        </Box>
    );
});

const WorkException = ({ user, darkMode, isLoading, isLoadingSet, workException, workExceptionTypes }: WorkExceptionReduxProps) => {
    const classes = useWorkExceptionStyles();
    const dispatch = useDispatch<AppDispatch>();

    const [filter, setFilter] = useState<IWorkExceptionFilter>({ ...workExceptionFilterInit });
    const [calendarWeeks, setCalendarWeeks] = useState<ICalendarWeek[]>([]);

    const [selectedInterval, setSelectedInterval] = useState<IWorkExceptionInterval | null>(null);

    const loadWorkException = useCallback(
        (withoutLoader?: boolean) => {
            if (filter.CompanyId) {
                dispatch(getWorkExceptionTypes({ CompanyId: filter.CompanyId }));
                dispatch(getWorkException(filter, { params: { withoutLoader } }));
                setCalendarWeeks(getCalendarWeeks(`${filter.Year}-${filter.Month}-01`));
            }
        },
        [filter],
    );

    const saveWorkExceptionDay = useCallback(
        (interval: IWorkExceptionInterval) => {
            dispatch(
                setWorkExceptionDay(interval, {
                    onSuccess: () => {
                        setSelectedInterval(null);
                        loadWorkException(true);
                    },
                }),
            );
        },
        [selectedInterval],
    );

    const handleSelectDate = (currentDate: string, currentUserInfo: IWorkExceptionUserInfo) => {
        if (!selectedInterval || selectedInterval.UserInfo.UserId !== currentUserInfo.UserId) {
            setSelectedInterval({
                DateFrom: currentDate,
                DateTo: currentDate,
                UserInfo: { ...currentUserInfo },
            });
        } else {
            const currentDay = new Date(currentDate).getDate();
            const dayFrom = new Date(selectedInterval.DateFrom).getDate();
            const dayTo = new Date(selectedInterval.DateTo).getDate();
            if (currentDay < dayFrom) {
                setSelectedInterval({ ...selectedInterval, DateFrom: currentDate });
            } else if (currentDay > dayTo) {
                setSelectedInterval({ ...selectedInterval, DateTo: currentDate });
            } else if (dayTo - dayFrom === 1 && (currentDay === dayFrom || currentDay === dayTo)) {
                setSelectedInterval({ ...selectedInterval, DateFrom: currentDate, DateTo: currentDate });
            } else {
                if (currentDay - dayFrom <= (dayTo - dayFrom) / 2) setSelectedInterval({ ...selectedInterval, DateFrom: currentDate });
                else setSelectedInterval({ ...selectedInterval, DateTo: currentDate });
            }
        }
    };

    useEffect(() => {
        loadWorkException();
        setSelectedInterval(null);
    }, [filter]);

    const calendarTableSpacer = (count: number, isHeader?: boolean) =>
        [...Array(count)].map((day, index) => (
            <TableCell
                key={index}
                className={classes.spacerCell}
                style={isHeader ? { background: !darkMode ? lightPalette.extraLight : darkPalette.background.paper } : undefined}
            >
                &nbsp;
            </TableCell>
        ));

    const calendarWeekHeadWeeks = () => {
        const getDateStr = (date: number | string) => (+date < 10 ? `0${date}` : `${date}`);
        return (
            <TableRow>
                <TableCell
                    rowSpan={2}
                    style={{ minWidth: 300, textAlign: 'left', background: !darkMode ? lightPalette.extraLight : darkPalette.background.paper }}
                >
                    ФИО сотрудника
                </TableCell>
                {calendarWeeks.map((week: ICalendarWeek) => (
                    <TableCell
                        key={week.WeekStartDay}
                        colSpan={7}
                        style={{ background: !darkMode ? lightPalette.extraLight : darkPalette.background.paper }}
                    >
                        Неделя {getDateStr(week.WeekStartDay)}.{getDateStr(filter.Month)} - {getDateStr(week.WeekEndDay)}.{getDateStr(filter.Month)}
                    </TableCell>
                ))}
            </TableRow>
        );
    };
    const calendarWeekHeadDays = () => {
        return (
            <TableRow>
                {calendarTableSpacer(7 - calendarWeeks[0].Days.length, true)}
                {calendarWeeks.map((week: ICalendarWeek) =>
                    week.Days.map((day) => (
                        <TableCell
                            key={day.Date.getDate()}
                            style={{ minWidth: 30, background: !darkMode ? lightPalette.extraLight : darkPalette.background.paper }}
                        >
                            {day.Date.getDate()}
                        </TableCell>
                    )),
                )}
                {calendarTableSpacer(7 - calendarWeeks[calendarWeeks.length - 1].Days.length, true)}
            </TableRow>
        );
    };

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
    const workExceptionDayTemplate = (currentDay: number, currentUser: IWorkExceptionUser, currentDepartment: IWorkException) => {
        const currentExceptionDay = currentUser.WorkExceptions?.find((item) => new Date(item.Date).getDate() === currentDay);
        const currentExceptionType =
            !!currentExceptionDay && workExceptionTypes?.find((type) => type.Id === currentExceptionDay?.WorkExceptionTypeId);
        const isSelectedDay =
            selectedInterval &&
            selectedInterval.UserInfo.UserId === currentUser.UserId &&
            currentDay >= new Date(selectedInterval?.DateFrom).getDate() &&
            currentDay <= new Date(selectedInterval?.DateTo).getDate();
        const dayCell = (
            <TableCell
                key={currentDay}
                className={clsx({ [classes.activeCell]: !!currentExceptionDay && !isSelectedDay, [classes.selectedCell]: !!isSelectedDay })}
                style={
                    !!isSelectedDay
                        ? { background: lightPalette.dark, color: lightPalette.white }
                        : currentExceptionType
                        ? { background: `#${currentExceptionType.ColorCode}`, color: lightPalette.dark }
                        : undefined
                }
                onClick={() =>
                    handleSelectDate(`${filter.Year}-${filter.Month}-${currentDay}`, {
                        UserId: currentUser.UserId,
                        UserName: currentUser.UserName,
                        DepartmentName: currentDepartment.DepartmentName,
                    })
                }
            >
                {currentExceptionType ? currentExceptionType.Code : `•`}
            </TableCell>
        );
        return isSelectedDay ? (
            <HtmlTooltip
                key={currentDay}
                arrow
                TransitionProps={{ timeout: 0 }}
                enterTouchDelay={1500}
                title={
                    <Box component="div">
                        <Typography variant="subtitle1">Установить вид отсутствия на весь выделенный период?</Typography>
                        {!!currentExceptionDay ? (
                            <Typography variant="subtitle1">
                                Или{' '}
                                <span
                                    style={{ cursor: 'pointer', color: primaryColor }}
                                    onClick={() => saveWorkExceptionDay({ ...selectedInterval, WorkExceptionTypeId: null })}
                                >
                                    Сбросить тип
                                </span>
                            </Typography>
                        ) : null}
                        <ButtonGroup size="small" color="primary" variant="outlined" style={{ marginTop: 15 }}>
                            {workExceptionTypes?.map((typeItem) => (
                                <Button
                                    key={typeItem.Id}
                                    variant={currentExceptionType && currentExceptionType.Id === typeItem.Id ? 'contained' : 'outlined'}
                                    // style={{ backgroundColor: `#${currentExceptionType && currentExceptionType.ColorCode} !important` }}
                                    onClick={() => saveWorkExceptionDay({ ...selectedInterval, WorkExceptionTypeId: typeItem.Id })}
                                >
                                    {typeItem.Name}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Box>
                }
            >
                {dayCell}
            </HtmlTooltip>
        ) : currentExceptionDay && currentExceptionType ? (
            <Tooltip key={currentDay} arrow disableInteractive title={currentExceptionType.Name}>
                {dayCell}
            </Tooltip>
        ) : (
            dayCell
        );
    };

    const workExceptionList = () => {
        const daysInMonth = getDaysInMonth(`${filter.Year}-${filter.Month}-01`);
        return workException?.map((currentDepartment: IWorkException) => (
            <TableBody key={currentDepartment.DepartmentId}>
                <TableRow key={currentDepartment.DepartmentId + currentDepartment.DepartmentName}>
                    <TableCell colSpan={calendarWeeks.length * 7 + 1} className={classes.departmentCell}>
                        {currentDepartment.DepartmentName}
                    </TableCell>
                </TableRow>
                {currentDepartment.Users?.map((currentUser: IWorkExceptionUser) => (
                    <TableRow key={currentDepartment.DepartmentId + currentUser.UserId}>
                        <TableCell>{currentUser.UserName}</TableCell>
                        {calendarTableSpacer(7 - calendarWeeks[0].Days.length)}
                        {[...Array(daysInMonth)].map((day, index) => workExceptionDayTemplate(index + 1, currentUser, currentDepartment))}
                        {calendarTableSpacer(7 - calendarWeeks[calendarWeeks.length - 1].Days.length)}
                    </TableRow>
                ))}
            </TableBody>
        ));
    };

    return (
        <Box component="div" className={classes.root}>
            <PageTitle title="Табельный календарь" />
            <WorkExceptionFilter user={user} onSetFilter={setFilter} />
            {isLoading ? (
                <Loader />
            ) : calendarWeeks?.length && workException?.length ? (
                <TableContainer className={classes.calendarTable}>
                    <Table stickyHeader>
                        <TableHead>
                            {calendarWeekHeadWeeks()}
                            {calendarWeekHeadDays()}
                        </TableHead>
                        {workExceptionList()}
                    </Table>
                </TableContainer>
            ) : (
                'Выберите компанию в которой есть сотрудники'
            )}
        </Box>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user, darkMode } = userSelector(state);
    const { isLoading, isLoadingSet, workException } = workExceptionSelector(state);
    const { workExceptionTypes } = dictSelectors.workExceptionTypes(state);
    return { user, darkMode, isLoading, isLoadingSet, workException, workExceptionTypes };
};

const connector = connect(mapStateToProps);
type WorkExceptionReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(WorkException);
