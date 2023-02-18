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

import { departmentModel, IDepartmentElement } from '@pages/Dictionary/Company/Department/model';
import { useElementStyles } from '@pages/Dictionary/Universal/styles';
import { clearDictionary } from '@services/dictionaryService';
import { checkFormFullfilled } from '@core/UniversalForm/methods';

interface IDepartmentElementForm {
    deptId: string;
    parentId: string;
    companyId: string;
    onSave: () => void;
    onClose: () => void;
}

const DepartmentElement = ({ deptId, parentId, companyId, onSave, onClose }: IDepartmentElementForm) => {
    const dispatch = useDispatch<AppDispatch>();
    const classes = useElementStyles();

    const [changed, setChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [body, setBody] = useState({} as IDepartmentElement);

    const onFieldChange = (name: string, value: any) => {
        const newBody = { ...body, [name]: value };
        setBody(newBody);
        setChanged(true);
    };

    const handleSubmit = () => {
        const validationErrorMsg = checkFormFullfilled(departmentModel, body);
        if (!validationErrorMsg) {
            setIsLoading(true);
            dispatch(
                editDictionaryElement('Dictionary.DepartmentEdit', !body.ParentId && companyId ? { ...body, ParentId: companyId } : body, {
                    onSuccess: (res) => {
                        dispatch(clearDictionary({ name: 'departments' }));
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
        if (deptId) {
            setIsLoading(true);
            dispatch(
                getDictionaryElement('Dictionary.DepartmentGet', deptId, {
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
            setIsLoading(false);
        }
        if (parentId) {
            setBody({ ...body, ParentId: parentId });
        }
    });

    return (
        <Dialog open={true} onClose={onClose} fullWidth={true} maxWidth="sm">
            <DialogTitle>{body.Id ? 'Редактирование' : 'Добавление'} подразделения</DialogTitle>
            <DialogContent>
                {isLoading || !body ? (
                    <Loader />
                ) : (
                    <UniversalForm data={body} onFieldChange={onFieldChange} model={departmentModel} onSubmit={handleSubmit} />
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

export default DepartmentElement;
