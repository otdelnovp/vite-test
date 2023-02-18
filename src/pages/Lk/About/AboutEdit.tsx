import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

import UniversalInput from '@core/UniversalInput/UniversalInput';
import { MaskedInput } from '@core/UniversalInput/MaskedInput';

import { useLkStyles } from '@pages/Lk/styles';
import { ICompanyData, findAboutErrors, validate } from '@pages/Lk/methods';

interface IAboutEdit {
    company: ICompanyData;
    onSave: (newAbout: any) => void;
    onClose: () => void;
}

export const AboutEdit = ({ company, onSave, onClose }: IAboutEdit) => {
    const classes = useLkStyles();

    const [changed, setChanged] = useState(false);
    const [body, changeBody] = useState({ ...company });

    const onFieldChange = (event: any) => {
        const { name, value } = event.target;
        setChanged(true);
        changeBody({ ...body, [name]: value });
    };

    const [isErrorMessage, setErrorMessage] = useState(false);
    const [touched, setTouched] = useState({
        CompanyName: false,
        LegalName: false,
        Address: false,
        LegalAddress: false,
        Inn: false,
        Kpp: false,
        Phone: false,
        Comment: false,
    });
    const required = {
        CompanyName: true,
        LegalName: true,
        Address: true,
        LegalAddress: true,
        Inn: true,
        Kpp: false,
        Phone: false,
        Comment: false,
    };

    const handleTouched = (event: any) => {
        setTouched({ ...touched, [event.target.name]: true });
    };

    const validationErrors = findAboutErrors(body, required);
    const isValidForm = validate(validationErrors);

    const handleSubmit = () => {
        if (isValidForm) {
            onSave(body);
        } else {
            setErrorMessage(true);
            setTimeout(() => setErrorMessage(false), 3000);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth={true} maxWidth="md">
            <DialogTitle>Редактирование данных компании</DialogTitle>
            <DialogContent>
                {isErrorMessage && (
                    <DialogContentText id="alert-dialog-description">Заполните правильно все поля</DialogContentText>
                )}
                <form className={classes.editForm}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <UniversalInput
                                name="CompanyName"
                                required={required.CompanyName}
                                label="Наименование"
                                value={body.CompanyName}
                                onChange={onFieldChange}
                                onBlur={handleTouched}
                                error={touched.CompanyName && validationErrors.CompanyName}
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <UniversalInput
                                name="LegalName"
                                required={required.LegalName}
                                label="Наименование для печати"
                                value={body.LegalName}
                                onChange={onFieldChange}
                                onBlur={handleTouched}
                                error={touched.LegalName && validationErrors.LegalName}
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <UniversalInput
                                name="LegalAddress"
                                required={required.LegalAddress}
                                label="Юридический адрес"
                                value={body.LegalAddress}
                                onChange={onFieldChange}
                                onBlur={handleTouched}
                                error={touched.LegalAddress && validationErrors.LegalAddress}
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <UniversalInput
                                name="Address"
                                required={required.Address}
                                label="Фактический адрес"
                                value={body.Address}
                                onChange={onFieldChange}
                                onBlur={handleTouched}
                                error={touched.Address && validationErrors.Address}
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <MaskedInput
                                mode={body.OwnershipType !== 'ИП' ? 'inn' : 'inn12'}
                                name="Inn"
                                required={required.Inn}
                                label="ИНН"
                                value={body.Inn ? body.Inn + '' : ''}
                                onChange={onFieldChange}
                                onBlur={handleTouched}
                                error={touched.Inn && validationErrors.Inn}
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <MaskedInput
                                mode="kpp"
                                name="Kpp"
                                required={required.Kpp}
                                label="КПП"
                                value={body.Kpp || ''}
                                onChange={onFieldChange}
                                onBlur={handleTouched}
                                error={touched.Kpp && validationErrors.Kpp}
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <MaskedInput
                                mode="phone"
                                name="Phone"
                                required={required.Phone}
                                label="Телефон"
                                value={body.Phone ? body.Phone + '' : ''}
                                onChange={onFieldChange}
                                onBlur={handleTouched}
                                error={touched.Phone && validationErrors.Phone}
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <UniversalInput
                                name="Comment"
                                required={required.Comment}
                                label="Комментарий"
                                value={body.Comment}
                                onChange={onFieldChange}
                                onBlur={handleTouched}
                                error={touched.Comment && validationErrors.Comment}
                                variant="filled"
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    Отмена
                </Button>
                <Button onClick={handleSubmit} disabled={!changed} variant="contained">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
};
