import React, { useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../index';
import { compose } from 'redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { RootState } from '@services/index';
import { userSelector } from '@services/userService';
import { getCompany, editCompany, lkSelector } from '@services/lkService';
import { phoneMask } from '@helpers/methods';

import { AboutEdit } from './AboutEdit';

import { useLkStyles } from '@pages/Lk/styles';

const About = ({ user, company }: AboutReduxProps) => {
    const classes = useLkStyles();
    const dispatch = useDispatch<AppDispatch>();

    const onLoadCompany = () => {
        dispatch(getCompany(user?.CompanyId));
        closeEditDialog();
    };

    const onSaveAbout = (newCompany: any) => {
        dispatch(editCompany(newCompany, { onSuccess: onLoadCompany }));
        closeEditDialog();
    };

    const [editVisible, setEditVisible] = useState(false);
    const showEditDialog = () => setEditVisible(true);
    const closeEditDialog = () => setEditVisible(false);

    const aboutItem = (title: string, value: string | number | null) =>
        !value ? null : (
            <Grid item xs={4}>
                <Typography component="h3" variant="h3" gutterBottom>
                    {title}
                </Typography>
                {value}
            </Grid>
        );

    return !company ? (
        <Box>Данные компании не загружены</Box>
    ) : (
        <React.Fragment>
            <Grid container alignItems="center" spacing={5}>
                {aboutItem('Форма собственности', company?.OwnershipType)}
                {aboutItem('Наименование', company?.CompanyName)}
                {aboutItem('Наименование для печати', company?.LegalName)}
                {aboutItem('Юридический адрес', company?.LegalAddress)}
                {aboutItem('Фактический адрес', company?.Address)}
                {aboutItem('ИНН', company?.Inn)}
                {aboutItem('КПП', company?.Kpp)}
                {aboutItem('Телефон', phoneMask(company?.Phone))}
                {aboutItem('Комментарий', company?.Comment)}
            </Grid>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.editButton}
                onClick={showEditDialog}
            >
                Редактировать данные
            </Button>
            {editVisible && <AboutEdit onSave={onSaveAbout} onClose={closeEditDialog} company={company} />}
        </React.Fragment>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { company } = lkSelector(state);
    return { user, company };
};

const connector = connect(mapStateToProps);
type AboutReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(About);
