import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

import { Loader } from '@core/Loader/Loader';
import UniversalForm from '@core/UniversalForm/UniversalForm';
import { IFormField } from '@core/UniversalForm/models';

import { alertActions } from '@services/alertService';
import { IDictionaryListElement } from '@helpers/dictionaryEditHelper';
import { editDictionaryElement } from '@services/dictionaryEditService';

import { useElementStyles } from './styles';
import { clearDictionary } from '@services/dictionaryService';

interface IUniversalElement {
    elementData: IDictionaryListElement;
    elementModel: IFormField[];
    apiEditFunction: string;
    clearDictionaryName?: string | undefined;
    onSave: () => void;
    onClose: () => void;
}

const UniversalElement = ({ elementData, elementModel, onSave, onClose, apiEditFunction, clearDictionaryName }: IUniversalElement) => {
    const dispatch = useDispatch<AppDispatch>();
    const classes = useElementStyles();

    const [changed, setChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [body, setBody] = useState({ ...elementData } as IDictionaryListElement);
    const [isErrorMessage, setErrorMessage] = useState(false);

    const onFieldChange = (name: string, value: any) => {
        const newBody = { ...body, [name]: value };
        setBody(newBody);
        setChanged(true);
    };

    const handleSubmit = () => {
        const isValidForm = true;
        if (isValidForm) {
            setIsLoading(true);
            dispatch(
                editDictionaryElement(apiEditFunction, body, {
                    onSuccess: (res) => {
                        if (clearDictionaryName) {
                            dispatch(clearDictionary({ name: clearDictionaryName }));
                        }
                        dispatch(alertActions.alertSuccess({ message: 'Успешно записано.' }));
                        onClose();
                        onSave();
                        setIsLoading(false);
                    },
                    onError: (res) => {
                        setIsLoading(false);
                    },
                }),
            );
        } else {
            setErrorMessage(true);
            setTimeout(() => setErrorMessage(false), 3000);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth={true} maxWidth="sm">
            <DialogTitle>{('Id' in body && body.Id) || ('id' in body && body.id) ? 'Редактирование' : 'Добавление'}</DialogTitle>
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
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UniversalElement;
