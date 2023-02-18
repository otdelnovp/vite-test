import React, { useEffect, useState } from 'react';

import Paper from '@mui/material/Paper';

import { ICustomReportElement, ITableElement } from '../model';
import { sx } from '../styles';
import { TextField } from '@mui/material';
import { getQueryText } from '../methods';

interface IQueryProps {
    body: ICustomReportElement;
    tableList: ITableElement[];
}

const Query = ({ body, tableList }: IQueryProps) => {
    const [queryText, setQueryText] = useState('');

    useEffect(() => {
        setQueryText(getQueryText(body, tableList));
    }, [body]);

    return (
        <React.Fragment>
            <Paper sx={sx.paper}>
                <TextField id="query-text-field" value={queryText} fullWidth multiline rows="20" variant="outlined" />
            </Paper>
        </React.Fragment>
    );
};

export default Query;
