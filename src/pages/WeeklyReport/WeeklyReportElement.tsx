import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AppDispatch } from 'src';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DialogContentText from '@mui/material/DialogContentText';
import Box from '@mui/material/Box';

import { Loader } from '@core/Loader/Loader';
import { MuiTabs } from '@core/Tabs/MuiTabs';
import { IMuiTab } from '@core/Tabs/methods';
import AutocompleteInput from '@core/UniversalInput/AutocompleteInput';
import { DatePickerInput } from '@core/DatePicker/DatePicker';

import { RootState } from '@services/index';
import { userSelector } from '@services/userService';
import { alertActions } from '@services/alertService';
import {
    getWeeklyReportElement,
    weeklyReportElementSelector,
    clearWeeklyReportElement,
    addWeeklyReportElement,
    getWorkerData,
} from '@services/weeklyReportService';
import { addDaysToDate, momentToFormatString, startOfDay } from '@helpers/dateHelper';
import { getCompanyUsers } from '@services/dictionaryService';
import { useEffectOnce } from '@hooks/useEffectOnce';

import { useElementStyles } from '@pages/Dictionary/Universal/styles';
import StateHistoryList from './StateHistory/StateHistoryList';
import WeeklyReportTable from './WeeklyReportTable/WeeklyReportTable';
import { getMonday } from './WeeklyReportTable/methods';
import WeekChanger from './WeekChanger/WeekChanger';
import { getNextStates } from './methods';
import StateHistoryElement from './StateHistory/StateHistoryElement';
import { initStateHistoryElement, IStateHistoryElement, stateHistoryModel } from './StateHistory/model';
import { sx } from './styles';
import { IUserElement } from '@pages/Dictionary/User/model';

interface IWeeklyReportElementProps extends DictionaryReduxProps {
    weeklyReportId: string;
}

const WeeklyReportElement = ({ weeklyReportId, weeklyReportElement, isLoading, user }: IWeeklyReportElementProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const classes = useElementStyles();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const [changed, setChanged] = useState(false);
    const [body, setBody] = useState({ ...weeklyReportElement, org_id: searchParams.get('org_id'), WorkerId: searchParams.get('worker_id') });
    const [currentTab, setCurrentTab] = useState(0);

    const [isErrorMessage, setErrorMessage] = useState(false);

    const [nextStates, setNextStates] = useState([] as { Name: string; Code: string }[]);
    const [stateDialogVisible, setStateDialogVisible] = useState(false);
    const [stateDialogData, setStateDialogData] = useState({} as IStateHistoryElement);

    const [workerData, setWorkerData] = useState({} as IUserElement);

    const onFieldChange = (name: string, value: any) => {
        let newBody = { ...body, [name]: value };
        if (name === 'Date') {
            newBody.Date = getMonday(value).toString();
        }
        setBody(newBody);
        setChanged(true);
    };

    useEffectOnce(() => {
        if (weeklyReportId !== 'new') {
            reloadWeeklyReport();
        } else {
            dispatch(clearWeeklyReportElement());
            dispatch(getCompanyUsers({ org_id: body.org_id }));
        }
    });

    useEffect(() => {
        if (weeklyReportId !== 'new') {
            setBody({ ...weeklyReportElement });
        } else {
            const newDate = getMonday(moment(new Date()).format('YYYY-MM-DD'));
            setBody({ ...weeklyReportElement, org_id: searchParams.get('org_id'), WorkerId: searchParams.get('worker_id'), Date: newDate });
        }
        if (weeklyReportElement.StateHistory) {
            let sortedStates = [...weeklyReportElement.StateHistory];
            sortedStates.sort((a, b) => {
                return a.Date > b.Date ? -1 : 1;
            });
        }
    }, [weeklyReportElement]);

    const reloadWeeklyReport = () => {
        dispatch(getWeeklyReportElement(weeklyReportId));
    };

    useEffect(() => {
        if (body.WorkerId)
            dispatch(
                getWorkerData(body.WorkerId, {
                    onSuccess: (res) => {
                        if (res.id) {
                            setWorkerData(res);
                        }
                    },
                }),
            );
    }, [body.WorkerId]);

    const handleSubmit = () => {
        if (body.WorkerId && body.Date) {
            dispatch(
                addWeeklyReportElement(body.WorkerId, body.Date, {
                    onSuccess: (res) => {
                        if (res && res.Created) {
                            navigate(`/weeklyreport/${res.Created}`);
                            dispatch(getWeeklyReportElement(res.Created));
                        } else if (res.Created === null) {
                            dispatch(
                                alertActions.alertError({
                                    message: 'Не удалось записать отчет (возможно уже существует отчет с такими параметрами).',
                                }),
                            );
                        }
                    },
                }),
            );
        } else {
            dispatch(alertActions.alertError({ message: 'Выберите работника и дату.' }));
        }
    };

    const onChangeWeek = (diffWeek: number) => {
        const newDate = new Date(body.Date);
        setBody({ ...body, Date: moment(addDaysToDate(newDate, diffWeek * 7)).format('YYYY-MM-DD') });
    };

    const tabList: IMuiTab[] = [
        {
            index: 0,
            label: 'Основное',
            children: (
                <Paper>
                    <Box className={classes.formBox}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <AutocompleteInput
                                    name="WorkerId"
                                    label="Работник"
                                    placeholder="Выберите работника"
                                    dictionaryName="companyUsers"
                                    selectProps={{
                                        valueField: 'id',
                                        textField: 'full_name',
                                    }}
                                    value={body.WorkerId || ''}
                                    text={body.WorkerName}
                                    onChange={(event) => onFieldChange(event.target.name, event.target.value)}
                                    required={true}
                                    disabled={weeklyReportId !== 'new'}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <DatePickerInput
                                    name="Date"
                                    value={body.Date}
                                    label="Дата отчета (понедельник)"
                                    views={['day']}
                                    onChange={(date: any, fieldName: string) => onFieldChange(fieldName, momentToFormatString(startOfDay(date)))}
                                    error={!body.Date}
                                    required={true}
                                    disabled={weeklyReportId !== 'new'}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <WeekChanger date={body.Date} changeWeek={onChangeWeek} disabled={weeklyReportId !== 'new'} />
                            </Grid>
                        </Grid>
                        {weeklyReportId !== 'new' && (
                            <WeeklyReportTable
                                weeklyReportId={weeklyReportId}
                                user={user}
                                workerId={body?.WorkerId ? body?.WorkerId : ''}
                                workerData={workerData}
                                date={body?.Date}
                                executionTimeList={body?.ExecutionTimes}
                                workExceptionTimeList={body?.WorkExceptionTimes}
                                onChange={reloadWeeklyReport}
                            />
                        )}
                    </Box>
                </Paper>
            ),
        },
        {
            index: 1,
            label: 'Состояния отчета',
            children: (
                <StateHistoryList
                    user={user}
                    weeklyReportId={body?.Id}
                    listData={body?.StateHistory}
                    onChange={(newListData) => reloadWeeklyReport()}
                />
            ),
        },
    ];

    const onNewStateClick = (newState: { Name: string; Code: string }) => {
        setStateDialogData({
            ...initStateHistoryElement,
            UserId: user?.Id || '',
            State: newState.Code,
            StateName: newState.Name,
        });
        setStateDialogVisible(true);
    };

    useEffect(() => {
        setNextStates(getNextStates(weeklyReportElement.State));
    }, [weeklyReportElement.State]);

    return (
        <React.Fragment>
            <Box className={classes.header}>
                <Box className={classes.pageTitle}>
                    <Typography component="h1" variant="h1">
                        <Link to="/weeklyreport">Еженедельные отчеты</Link> &#8250;{' '}
                        {weeklyReportId !== 'new' ? 'Редактирование отчета' : 'Добавление отчета'}
                    </Typography>
                </Box>
                <Box className={classes.buttonPanel}>
                    {weeklyReportId !== 'new' && !isLoading && (
                        <>
                            <Typography variant={'h4'} sx={sx.stateHeader} onClick={() => setCurrentTab(1)}>
                                Cостояние: {weeklyReportElement.StateName || 'Состояние не записано'}
                            </Typography>
                            {nextStates[0] && (
                                <Button sx={sx.stateChangeButton} onClick={() => onNewStateClick(nextStates[0])} variant="outlined">
                                    {nextStates[0].Name}
                                </Button>
                            )}
                            {nextStates[1] && (
                                <Button sx={sx.stateChangeButton} onClick={() => onNewStateClick(nextStates[1])} variant="outlined">
                                    {nextStates[1].Name}
                                </Button>
                            )}
                        </>
                    )}
                    {weeklyReportId === 'new' && (
                        <Button sx={{ marginRight: '8px' }} onClick={handleSubmit} variant="contained">
                            Сохранить
                        </Button>
                    )}
                </Box>
            </Box>
            <Box className={classes.tabBox}>
                {isErrorMessage && <DialogContentText id="alert-dialog-description">Заполните правильно все поля</DialogContentText>}
                {isLoading || !body ? (
                    <Loader />
                ) : (
                    <form className={classes.editForm}>
                        <MuiTabs list={tabList} gutterBottom={true} externalTabControl extTabValue={currentTab} setExtTabValue={setCurrentTab} />
                    </form>
                )}
            </Box>
            {stateDialogVisible && (
                <StateHistoryElement
                    user={user}
                    weeklyReportId={weeklyReportId}
                    elementData={stateDialogData}
                    elementModel={stateHistoryModel}
                    onClose={() => setStateDialogVisible(false)}
                />
            )}
        </React.Fragment>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    // const { weeklyReportElement, worker, isLoading } = weeklyReportElementSelector(state);
    const { weeklyReportElement, isLoading } = weeklyReportElementSelector(state);
    // return { user, weeklyReportElement, isLoading, worker };
    return { user, weeklyReportElement, isLoading };
};

const connector = connect(mapStateToProps);
type DictionaryReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(WeeklyReportElement);
