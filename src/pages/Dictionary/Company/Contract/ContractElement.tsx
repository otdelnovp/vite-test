import React, { useEffect, useState } from 'react';
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

import { alertActions } from '@services/alertService';
import { editDictionaryElement, getDictionaryElement } from '@services/dictionaryEditService';
import { useEffectOnce } from '@hooks/useEffectOnce';

import { contractModel } from '@pages/Dictionary/Company/Contract/model';
import { IContractElement } from '@pages/Dictionary/Company/Contract/model';
import { useElementStyles } from '@pages/Dictionary/Universal/styles';
import { clearDictionary, getCompanies } from '@services/dictionaryService';
import { checkFormFullfilled } from '@core/UniversalForm/methods';

interface IContractElementForm {
    elementId: string;
    companyId: string;
    onSave: () => void;
    onClose: () => void;
}

const ContractElement = ({ elementId, companyId, onSave, onClose }: IContractElementForm) => {
    const dispatch = useDispatch<AppDispatch>();
    const classes = useElementStyles();

    const [changed, setChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [body, setBody] = useState({} as IContractElement);

    const onFieldChange = (name: string, value: any) => {
        const newBody = { ...body, [name]: value };
        setBody(newBody);
        setChanged(true);
    };

    const onDateRangeChange = (newDates: string[]) => {
        const newBody = { ...body, ValidFrom: newDates[0], ValidTo: newDates[1] };
        setBody(newBody);
        setChanged(true);
    };

    const handleSubmit = () => {
        const validationErrorMsg = checkFormFullfilled(contractModel, body, companyId);
        if (!validationErrorMsg) {
            setIsLoading(true);
            dispatch(
                editDictionaryElement('Dictionary.ContractEdit', body, {
                    onSuccess: (res) => {
                        dispatch(clearDictionary({ name: 'contracts' }));
                        dispatch(alertActions.alertSuccess({ message: 'Успешно записано.' }));
                        onSave();
                        setIsLoading(false);
                    },
                    onError: (res) => {
                        setIsLoading(false);
                    },
                }),
            );
        } else {
            dispatch(alertActions.alertError({ message: validationErrorMsg }));
        }
    };

    useEffectOnce(() => {
        if (elementId) {
            setIsLoading(true);
            dispatch(
                getDictionaryElement('Dictionary.ContractGet', elementId, {
                    onSuccess: (res) => {
                        setBody(res);
                        setIsLoading(false);
                    },
                    onError: (res) => {
                        setIsLoading(false);
                    },
                }),
            );
        } else {
            dispatch(getCompanies(null));
            setBody({ ...body, CustomerId: companyId });
            setIsLoading(false);
        }
    });

    return (
        <Dialog open={true} onClose={onClose} fullWidth={true} maxWidth="sm">
            <DialogTitle>{body.Id ? 'Редактирование' : 'Добавление'} договора</DialogTitle>
            <DialogContent>
                {isLoading || !body ? (
                    <Loader />
                ) : (
                    <UniversalForm
                        data={body}
                        onFieldChange={onFieldChange}
                        onDateRangeChange={onDateRangeChange}
                        model={contractModel}
                        onSubmit={handleSubmit}
                    />
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

export default ContractElement;
