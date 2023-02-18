import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';

import Grid from '@mui/material/Grid';

import { getElementFieldsByModel } from './methods';
import { RootState } from '@services/index';
import { userSelector } from '@services/userService';

import { useUniversalFormStyles } from './styles';
import { IFormField } from './models';

interface IUniversalForm extends DictionaryReduxProps {
    model: IFormField[];
    data: any;
    onFieldChange: (name: string, value: any, params?: any) => void;
    onSubmit: () => void;
    onDateRangeChange?: (newDates: string[]) => void;
    onDateRangeBlur?: (newDates: string[]) => void;
}

const UniversalForm = ({ model, data, onFieldChange, onSubmit, user, onDateRangeChange, onDateRangeBlur }: IUniversalForm) => {
    const classes = useUniversalFormStyles();

    const [body, setBody] = useState(data);

    const onChange = (event: any, params?: any) => {
        const { name, value } = event.target;
        onFieldChange(name, value, params);
    };

    const handleSubmit = () => {
        onSubmit();
    };

    useEffect(() => {
        setBody(data);
    }, [data]);

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {getElementFieldsByModel(model, data, onChange, user, onDateRangeChange, onDateRangeBlur)}
            </Grid>
        </form>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    return { user };
};

const connector = connect(mapStateToProps);
type DictionaryReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(UniversalForm);
