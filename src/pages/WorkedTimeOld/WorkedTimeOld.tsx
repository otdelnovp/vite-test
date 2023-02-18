import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';

import { userSelector } from '@services/userService';
import { RootState } from '@services/index';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import WorkedTimeFilter, { IFilter } from './WorkedTimeFilter/WorkedTimeFilter';
import WorkedTimeUsers from './WorkedTimeUsers/WorkedTimeUsers';
import WorkedTimeCalendar from './WorkedTimeCalendar/WorkedTimeCalendar';
import WorkedTimeTasks from './WorkedTimeTasks/WorkedTimeTasks';

import { IWorkedTimeTaskData, IWorkedTimeDateData, IWorkedTimeUserData, updateDateList, updateTaskList, updateUserList } from './methods';

import { sx, useStyles } from './styles';
import { testData } from './testData';

const WorkedTimeOld = ({ user, workedTimeData }: DictionaryReduxProps) => {
    const classes = useStyles();

    const [filter, setFilter] = useState({} as IFilter);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const [userList, setUserList] = useState([] as IWorkedTimeUserData[]);
    const [dateList, setDateList] = useState([] as IWorkedTimeDateData[]);
    const [taskList, setTaskList] = useState([] as IWorkedTimeTaskData[]);

    useEffect(() => {
        updateUserList(workedTimeData, setUserList);
        if (!selectedUser && userList.length) {
            setSelectedUser(userList[0].UserId);
        }
    }, [workedTimeData]);

    useEffect(() => {
        updateDateList(selectedUser, workedTimeData, setDateList);
    }, [selectedUser]);

    useEffect(() => {
        updateTaskList(selectedUser, selectedDate, workedTimeData, setTaskList);
    }, [selectedUser, selectedDate]);

    useEffect(() => {
        if (!selectedUser && userList.length) {
            setSelectedUser(userList[0].UserId);
        }
        if (!selectedDate && dateList.length) {
            setSelectedDate(dateList[0].Date);
        }
    }, [userList, dateList]);

    return (
        <Box className={classes.boxContainer}>
            <WorkedTimeFilter user={user} filter={filter} setFilter={setFilter} />
            <Box className={classes.boxColumns}>
                <WorkedTimeUsers user={user} userList={userList} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                <Divider sx={sx.divider} orientation="vertical" flexItem />
                <Box className={classes.boxCalendarTime}>
                    <WorkedTimeCalendar
                        user={user}
                        filter={filter}
                        dateList={dateList}
                        setDateList={setDateList}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                    <WorkedTimeTasks
                        user={user}
                        userName={userList.find((user) => user.UserId === selectedUser)?.UserName || ''}
                        date={selectedDate}
                        taskList={taskList}
                        setTaskList={setTaskList}
                    />
                </Box>
            </Box>
        </Box>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const workedTimeData = [...testData];
    return { user, workedTimeData };
};

const connector = connect(mapStateToProps);
type DictionaryReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(WorkedTimeOld);

