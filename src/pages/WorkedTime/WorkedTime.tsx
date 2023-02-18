import React, { useCallback, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch } from 'src';
import { compose } from 'redux';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import { PageTitle } from '@core/PageTitle/PageTitle';
import { Loader } from '@core/Loader/Loader';

import { RootState } from '@services/index';
import { userSelector } from '@services/userService';
import { getCalendarWeeks, ICalendarWeek, getDaysInMonth, getHoursMaskByMinutes } from '@helpers/dateHelper';
import { IWeeklyReportStateDictOption, weeklyReportStates } from '@helpers/dictionariesHelper';
import { getWorkedTime, setWorkedTimeRequest, workedTimeSelector } from '@services/workedTimeService';

import {
    IWorkedTimeFilter,
    workedTimeFilterInit,
    IWorkedTimeSelectedDate,
    IWorkedTimeUserInfo,
    IWorkedTimeUser,
    IWorkedTime,
    IExecutionTime,
    IWorkedTimeWeeklyReport,
} from './methods';
import WorkedTimeFilter from './WorkedTimeFilter';
import DateDialogPage from './DateDialogPage';
import { sx, useStyles } from './styles';

import { addWeeklyReportState } from '@services/weeklyReportService';

import lightPalette from '@theme/lightPalette';
import darkPalette from '@theme/darkPalette';

const WorkedTime = ({ user, darkMode, isLoading, isLoadingSet, workedTime }: WorkedTimeReduxProps) => {
    const classes = useStyles();
    const dispatch = useDispatch<AppDispatch>();

    const [filter, setFilter] = useState<IWorkedTimeFilter>({ ...workedTimeFilterInit });
    const [calendarWeeks, setCalendarWeeks] = useState<ICalendarWeek[]>([]);

    const [selectedDate, setSelectedDate] = useState<IWorkedTimeSelectedDate | null>(null);

    const loadWorkException = useCallback(
        (withoutLoader?: boolean) => {
            if (filter.CompanyId) {
                dispatch(getWorkedTime(filter, { params: { withoutLoader } }));
                setCalendarWeeks(getCalendarWeeks(`${filter.Year}-${filter.Month}-01`));
            }
        },
        [filter],
    );

    const handleSelectDate = (
        currentDate: string,
        time: number,
        executionTimes: IExecutionTime[],
        currentUserInfo: IWorkedTimeUserInfo,
        DepartmentId: string,
        DepartmentName: string,
    ) => {
        setSelectedDate({
            Date: currentDate,
            Time: time,
            ExecutionTimes: executionTimes,
            UserInfo: currentUserInfo,
            DepartmentId: DepartmentId,
            DepartmentName: DepartmentName,
        });
    };

    const onChangeDate = (newDate: IWorkedTimeSelectedDate | null) => {
        if (newDate) {
            dispatch(setWorkedTimeRequest({ changedDate: { ...newDate } }));
        }
    };

    useEffect(() => {
        loadWorkException();
        setSelectedDate(null);
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
                <TableCell rowSpan={2} style={{ minWidth: 20, background: !darkMode ? lightPalette.extraLight : darkPalette.background.paper }}>
                    Часы
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

    const calendarWeekHeadDays = () => (
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

    const onAgreementWeeklyReport = (WeeklyReportId: string, nonAgreement?: boolean) => {
        const addBody = {
            WeeklyReportId,
            Comment: 'Быстрое согласование через месячный отчет отработанного времени',
            State: nonAgreement ? 'N' : 'A',
            UserId: user?.UserId || '',
        };
        dispatch(
            addWeeklyReportState(addBody, {
                onSuccess: () => {
                    loadWorkException(true);
                },
            }),
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
    const workedTimeDateTemplate = (
        currentDay: number,
        currentDateStr: string,
        currentUser: IWorkedTimeUser,
        currentDepartment: IWorkedTime,
        currentWeeklyReport: IWorkedTimeWeeklyReport | null,
        currentWeeklyReportStateDict?: IWeeklyReportStateDictOption | null,
    ) => {
        const currentWorkedTimeDay = currentUser.Dates?.find((item) => new Date(item.Date).getDate() === currentDay);
        const dayCell = (
            <TableCell
                key={currentDay}
                sx={sx.dayCell}
                style={
                    currentWeeklyReportStateDict ? { backgroundColor: `#${currentWeeklyReportStateDict.Color}`, color: lightPalette.dark } : undefined
                }
                onClick={() => {
                    handleSelectDate(
                        currentDateStr,
                        currentWorkedTimeDay?.Time || 0,
                        currentWorkedTimeDay?.ExecutionTimes || [],
                        {
                            UserId: currentUser.UserId,
                            UserName: currentUser.LastName + ' ' + currentUser.FirstName,
                            DepartmentName: currentDepartment.DepartmentName,
                        },
                        currentDepartment.DepartmentId,
                        currentDepartment.DepartmentName,
                    );
                }}
            >
                {currentWorkedTimeDay?.Time ? getHoursMaskByMinutes(currentWorkedTimeDay.Time) : ''}
            </TableCell>
        );
        return currentWeeklyReport && currentWeeklyReportStateDict && currentWeeklyReportStateDict.Code === 'R' ? (
            <HtmlTooltip
                key={currentDay}
                arrow
                TransitionProps={{ timeout: 0 }}
                enterTouchDelay={1500}
                title={
                    <Box component="div">
                        <Typography variant="subtitle1" gutterBottom>
                            Недельный отчет требующий согласования
                        </Typography>
                        <Box sx={{ marginBottom: 2 }}>
                            <Button
                                variant="outlined"
                                color="success"
                                onClick={() => onAgreementWeeklyReport(currentWeeklyReport.WeeklyReportId)}
                                size="small"
                            >
                                Согласовать
                            </Button>{' '}
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => onAgreementWeeklyReport(currentWeeklyReport.WeeklyReportId, true)}
                                size="small"
                            >
                                Отклонить
                            </Button>
                        </Box>
                        <Typography variant="subtitle2">
                            Нажимая подтвердить, вы подтверждаете{' '}
                            <Link to={`/weeklyreport/${currentWeeklyReport.WeeklyReportId}`}>весь отчет за неделю</Link>,
                            <br /> включая дни, которые могут попасть на другую часть недели соседнего месяца
                        </Typography>
                    </Box>
                }
            >
                {dayCell}
            </HtmlTooltip>
        ) : currentWeeklyReport && currentWeeklyReportStateDict ? (
            <Tooltip key={currentDay} arrow disableInteractive title={`Состояние недельного отчета: ${currentWeeklyReportStateDict?.Name}`}>
                {dayCell}
            </Tooltip>
        ) : (
            dayCell
        );
    };

    const workedTimeDates = () => {
        const daysInMonth = getDaysInMonth(`${filter.Year}-${filter.Month}-01`);
        return workedTime?.map((currentDepartment: IWorkedTime) => (
            <TableBody key={currentDepartment.DepartmentId}>
                <TableRow key={currentDepartment.DepartmentId + currentDepartment.DepartmentName}>
                    <TableCell colSpan={calendarWeeks.length * 7 + 2} className={classes.departmentCell}>
                        {currentDepartment.DepartmentName}
                    </TableCell>
                </TableRow>
                {currentDepartment.Users?.map((currentUser: IWorkedTimeUser) => {
                    let currentWeeklyReportIndex = currentUser.WeeklyReports?.length ? 0 : -1;
                    let currentWeeklyReport =
                        currentWeeklyReportIndex >= 0 && currentUser.WeeklyReports?.length
                            ? currentUser.WeeklyReports[currentWeeklyReportIndex]
                            : null;
                    let currentWeeklyReportStateDict = weeklyReportStates.find((item) => item.Code === currentWeeklyReport?.State);
                    let currentWeeklyReportDate = currentWeeklyReport ? new Date(currentWeeklyReport.Date) : new Date();
                    let currentWeeklyReportEndDate = currentWeeklyReport ? new Date(currentWeeklyReport.Date) : new Date();
                    currentWeeklyReportEndDate.setDate(currentWeeklyReportDate.getDate() + 7);
                    return (
                        <TableRow key={currentDepartment.DepartmentId + currentUser.UserId}>
                            <TableCell>{currentUser.LastName + ' ' + currentUser.FirstName}</TableCell>
                            <TableCell>{getHoursMaskByMinutes(currentUser.Time)}</TableCell>
                            {calendarTableSpacer(7 - calendarWeeks[0].Days.length)}
                            {[...Array(daysInMonth)].map((day, index) => {
                                const currentDateStr =
                                    filter.Year + '-' + String(filter.Month).padStart(2, '0') + '-' + String(index + 1).padStart(2, '0');
                                const currentDate = new Date(currentDateStr);
                                if (
                                    currentWeeklyReportIndex >= 0 &&
                                    currentDate >= currentWeeklyReportEndDate &&
                                    currentWeeklyReportIndex < (currentUser.WeeklyReports?.length || 0)
                                ) {
                                    currentWeeklyReportIndex = currentWeeklyReportIndex + 1;
                                    currentWeeklyReport = currentUser.WeeklyReports?.length
                                        ? currentUser.WeeklyReports[currentWeeklyReportIndex]
                                        : null;
                                    currentWeeklyReportStateDict = weeklyReportStates.find((item) => item.Code === currentWeeklyReport?.State);
                                    currentWeeklyReportDate = currentWeeklyReport ? new Date(currentWeeklyReport.Date) : new Date();
                                    currentWeeklyReportEndDate = currentWeeklyReport ? new Date(currentWeeklyReport.Date) : new Date();
                                    currentWeeklyReportEndDate.setDate(currentWeeklyReportDate.getDate() + 7);
                                }
                                const isActualWeeklyReport =
                                    currentWeeklyReport && currentDate >= currentWeeklyReportDate && currentDate < currentWeeklyReportEndDate;
                                return workedTimeDateTemplate(
                                    index + 1,
                                    currentDateStr,
                                    currentUser,
                                    currentDepartment,
                                    isActualWeeklyReport ? currentWeeklyReport : null,
                                    isActualWeeklyReport ? currentWeeklyReportStateDict : null,
                                );
                            })}
                            {calendarTableSpacer(7 - calendarWeeks[calendarWeeks.length - 1].Days.length)}
                        </TableRow>
                    );
                })}
            </TableBody>
        ));
    };

    return (
        <Box component="div" className={classes.root}>
            <PageTitle title="Отработанное время" />
            <WorkedTimeFilter user={user} onSetFilter={setFilter} />
            {isLoading ? (
                <Loader />
            ) : calendarWeeks?.length && workedTime?.length ? (
                <>
                    <TableContainer className={classes.calendarTable}>
                        <Table stickyHeader>
                            <TableHead>
                                {calendarWeekHeadWeeks()}
                                {calendarWeekHeadDays()}
                            </TableHead>
                            {workedTimeDates()}
                        </Table>
                    </TableContainer>
                    {selectedDate && (
                        <DateDialogPage
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            onChangeDate={(newDate) => onChangeDate(newDate)}
                            taskFinderFilter={{
                                CompanyId: filter.CompanyId,
                                CompanyName: filter.CompanyName,
                                DepartmentId: selectedDate.DepartmentId,
                                DepartmentName: selectedDate.DepartmentName,
                                UserId: selectedDate.UserInfo.UserId,
                                UserName: selectedDate.UserInfo.UserName,
                            }}
                        />
                    )}
                </>
            ) : (
                'Выберите компанию в которой есть сотрудники'
            )}
        </Box>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user, darkMode } = userSelector(state);
    const { isLoading, isLoadingSet, workedTime } = workedTimeSelector(state);
    return { user, darkMode, isLoading, isLoadingSet, workedTime };
};

const connector = connect(mapStateToProps);
type WorkedTimeReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(WorkedTime);

