import React, { useEffect, useState } from 'react';
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
import { IFormField } from '@core/UniversalForm/models';

import { IUserData } from '@helpers/authHelper';
import { addWeeklyReportState, getWeeklyReportElement } from '@services/weeklyReportService';

import { IStateHistoryElement } from './model';

interface IStateHistoryElementProps {
    user: IUserData | null;
    weeklyReportId: string;
    elementModel: IFormField[];
    elementData: IStateHistoryElement;
    onClose: () => void;
}

const StateHistoryElement = ({ user, weeklyReportId, elementData, elementModel, onClose }: IStateHistoryElementProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const [changed, setChanged] = useState(false);
    const [body, setBody] = useState({ ...elementData });

    const [isLoading, setIsLoading] = useState(false);
    const [isErrorMessage, setErrorMessage] = useState(false);

    const onFieldChange = (name: string, value: any) => {
        const newBody = { ...body, [name]: value };
        setBody(newBody);
        setChanged(true);
    };

    useEffect(() => {
        if (body.State && !changed) {
            setChanged(true);
        }
    }, [body.State]);

    const handleSubmit = () => {
        if (weeklyReportId !== 'new') {
            setIsLoading(true);
            const addBody = {
                WeeklyReportId: weeklyReportId,
                Comment: body.Comment,
                State: body.State,
                UserId: user?.UserId || '',
            };
            dispatch(
                addWeeklyReportState(addBody, {
                    onSuccess: () => {
                        dispatch(getWeeklyReportElement(weeklyReportId));
                        setIsLoading(false);
                        onClose();
                    },
                    onError: () => {
                        setIsLoading(false);
                    },
                }),
            );
        }
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth={true} maxWidth="sm">
            <DialogTitle>Добавление</DialogTitle>
            <DialogContent>
                {isErrorMessage && <DialogContentText id="alert-dialog-description">Заполните правильно все поля</DialogContentText>}
                {isLoading || !body ? (
                    <Loader />
                ) : (
                    <UniversalForm data={body} onFieldChange={onFieldChange} model={elementModel} onSubmit={handleSubmit} />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    Закрыть
                </Button>
                <Button onClick={handleSubmit} disabled={!changed} variant="contained">
                    Добавить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default StateHistoryElement;
