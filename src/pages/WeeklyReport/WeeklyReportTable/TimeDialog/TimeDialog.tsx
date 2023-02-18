import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src';

import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Loader } from '@core/Loader/Loader';
import UniversalForm from '@core/UniversalForm/UniversalForm';

import { alertActions } from '@services/alertService';

import { executionTimeEdit } from '@pages/WorkedTime/methods';
import { useElementStyles } from '@pages/Dictionary/Universal/styles';
import { ITimeDialog, timeDialogModel } from './model';

interface ITimeDialogProps {
    data: ITimeDialog;
    onSave: (newData: ITimeDialog) => void;
    onClose: () => void;
}

const TimeDialog = ({ data, onSave, onClose }: ITimeDialogProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const classes = useElementStyles();

    const [changed, setChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [body, setBody] = useState({ ...data });
    const [isErrorMessage, setErrorMessage] = useState(false);

    const onFieldChange = (name: string, value: any) => {
        const newBody = { ...body, [name]: value };
        setBody(newBody);
        setChanged(true);
    };

    const handleSubmit = () => {
        const editBody = {
            Id: body.Id ? body.Id : '',
            Comment: body.Comment,
            Time: body.Time,
            TaskId: body.TaskId,
            TaskTitle: '',
            TaskNumber: '',
        };
        executionTimeEdit(setIsLoading, body.UserId, body.Date, editBody)
            .catch((error) => {
                dispatch(alertActions.alertError({ message: `Ошибка при записи: ${JSON.stringify(error)}` }));
            })
            .then((response) => {
                onSave(body);
                onClose();
            });
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth={true} maxWidth="sm">
            <DialogTitle>{body.Id ? 'Редактирование' : 'Добавление'}</DialogTitle>
            <DialogContent>
                {isErrorMessage && <DialogContentText id="alert-dialog-description">Заполните правильно все поля</DialogContentText>}
                {isLoading || !body ? (
                    <Loader />
                ) : (
                    <UniversalForm data={body} onFieldChange={onFieldChange} model={timeDialogModel} onSubmit={handleSubmit} />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    Закрыть
                </Button>
                <Button onClick={handleSubmit} disabled={!changed} variant="contained">
                    {body.Id ? 'Сохранить' : 'Добавить'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TimeDialog;
