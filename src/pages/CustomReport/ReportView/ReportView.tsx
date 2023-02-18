import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { getCustomReportData } from '@services/customReportService';

import TableReport from './TableReport';

import { ICustomReportElement } from '../model';
import { onFieldChange } from './methods';
import { sx } from '../styles';
import HistogramReport from './HistogramReport';

interface IReportViewProps {
    body: ICustomReportElement;
    setBody: (newBody: ICustomReportElement) => void;
    customReportData: any[];
}

const ReportView = ({ body, setBody, customReportData }: IReportViewProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const getParameters = (body: ICustomReportElement) => {
        return body.conditionParameters && body.conditionParameters.map((item) => {
            return (
                <Grid item xs={3}>
                    <TextField
                        sx={{ width: '100%' }}
                        variant="filled"
                        label={item.parameter}
                        value={(item && item.value) || ''}
                        onChange={(e: any) => {
                            onFieldChange(item.parameter, e.target.value, body, setBody);
                        }}
                    />
                </Grid>
            );
        });
    };

    const onPlayClick = () => {
        dispatch(getCustomReportData(body.id));
    };

    return (
        <React.Fragment>
            <Paper sx={sx.reportPaper}>
                <Grid container spacing={2}>
                    {getParameters(body)}
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Button sx={sx.playBtn} variant="outlined" startIcon={<PlayArrowIcon />} onClick={onPlayClick}>
                            Сформировать
                        </Button>
                    </Grid>
                </Grid>
                {body.reportType === 'table' ? (
                    <TableReport body={body} customReportData={customReportData} />
                ) : body.reportType === 'histogram' ? (
                    <HistogramReport body={body} customReportData={customReportData} />
                ) : (
                    <>Укажите тип вывода отчета (таблица, гистограмма и т.д.)</>
                )}
            </Paper>
        </React.Fragment>
    );
};

export default ReportView;
