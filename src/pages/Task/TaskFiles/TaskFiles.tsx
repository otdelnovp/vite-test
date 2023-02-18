import React, { useEffect } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../index';
import { compose } from 'redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DocsUploader from '@core/DocsUploader/DocsUploader';

import { RootState } from '@services/index';
import { userSelector } from '@services/userService';
import { addTaskFile, delTaskFile, getTaskFileList, taskSelector } from '@services/taskService';

import { useTaskFileStyles } from './styles';

interface ITaskFiles {}

const TaskFiles = ({ user, task, fileList }: TaskFilesReduxProps) => {
    const classes = useTaskFileStyles();
    const dispatch = useDispatch<AppDispatch>();

    const onGetTaskFileList = (newFileId: string) => {
        if (task?.Id) dispatch(getTaskFileList(task?.Id));
    };

    const onAddFile = (newFileId: string) => {
        if (task?.Id && user?.UserId) dispatch(addTaskFile(task?.Id, user?.UserId, newFileId, { onSuccess: onGetTaskFileList }));
    };
    const onDelFile = (fileId: string) => {
        if (task?.Id) dispatch(delTaskFile(task?.Id, fileId, { params: { fileId } }));
    };

    return (
        <Box className={classes.files}>
            <Typography component="h3" variant="h3" gutterBottom>
                Вложения
            </Typography>
            <DocsUploader fileList={fileList} onSave={onAddFile} onDelete={onDelFile} />
        </Box>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { fileList, task } = taskSelector(state);
    return { user, task, fileList };
};

const connector = connect(mapStateToProps);
type TaskFilesReduxProps = ConnectedProps<typeof connector> & ITaskFiles;

export default compose(connector)(TaskFiles);
