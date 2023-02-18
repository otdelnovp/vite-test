import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppDispatch } from 'src';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Loader } from '@core/Loader/Loader';
import { MuiTabs } from '@core/Tabs/MuiTabs';
import { IMuiTab } from '@core/Tabs/methods';

import { RootState } from '@services/index';
import { userSelector } from '@services/userService';
import { customReportDataSelector, customReportElementSelector, getCustomReportElement } from '@services/customReportService';

import TablesAndFields from './TablesAndFields/TablesAndFields';
import Relations from './Relations/Relations';
import Conditions from './Conditions/Conditions';
import Sorting from './Sorting/Sorting';
import ColumnSettings from './ColumnSettings/ColumnSettings';

import { ICustomReportElement } from './model';
import { useElementStyles } from '@pages/Dictionary/Universal/styles';

import { customReport_DataSources, customReport_TableList } from './testData/testData_CustomReport';
import Query from './Query/Query';
import ReportView from './ReportView/ReportView';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface ICustomReportElementProps extends DictionaryReduxProps {
    customReportId: string;
    editMode: boolean;
}

const CustomReportElement = ({
    customReportId,
    customReportElement,
    customReportData,
    isLoading,
    tableList,
    user,
    editMode,
}: ICustomReportElementProps) => {
    const classes = useElementStyles();
    const dispatch = useDispatch<AppDispatch>();
    const [currentTab, setCurrentTab] = useState(0);
    const [body, setBody] = useState({} as ICustomReportElement);

    useEffect(() => {
        setBody({ ...customReportElement });
    }, [customReportElement]);

    useEffect(() => {
        dispatch(getCustomReportElement(customReportId));
    }, []);

    const tabList: IMuiTab[] = [
        {
            index: 0,
            label: 'Таблицы и поля',
            children: <TablesAndFields body={body} setBody={setBody} tableList={tableList} />,
        },
        {
            index: 1,
            label: 'Связи таблиц',
            children: <Relations body={body} setBody={setBody} tableList={tableList} />,
        },
        {
            index: 2,
            label: 'Условия',
            children: <Conditions body={body} setBody={setBody} tableList={tableList} />,
        },
        {
            index: 3,
            label: 'Сортировка данных',
            children: <Sorting body={body} setBody={setBody} tableList={tableList} />,
        },
        {
            index: 4,
            label: 'Настройка отображения отчета',
            children: <ColumnSettings body={body} setBody={setBody} tableList={tableList} />,
        },
        {
            index: 5,
            label: 'Текст запроса',
            children: <Query body={body} tableList={tableList} />,
        },
        {
            index: 6,
            label: 'Просмотр отчета',
            children: <ReportView body={body} setBody={setBody} customReportData={customReportData} />,
        },
    ];

    const pageTitle = editMode ? (customReportId !== 'new' ? 'Редактирование отчета' : 'Добавление отчета') : 'Просмотр отчета';

    return (
        <React.Fragment>
            <Box className={classes.header}>
                <Box className={classes.pageTitle}>
                    <Typography component="h1" variant="h1">
                        <Link to="/customreport">Настраиваемые отчеты</Link> &#8250; {pageTitle}
                    </Typography>
                </Box>
                <Box className={classes.buttonPanel}>
                    <Button sx={{ marginRight: '8px' }} onClick={() => null} variant="contained">
                        Сохранить
                    </Button>
                </Box>
            </Box>
            <Box className={classes.tabBox}>
                {isLoading || !body ? (
                    <Loader />
                ) : (
                    <form className={classes.editForm}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    variant="filled"
                                    label="Наименование отчета"
                                    value={body.name}
                                    onChange={(e: any) => setBody({ ...body, name: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={3} sx={{ marginBottom: '16px' }}>
                                <Autocomplete
                                    options={customReport_DataSources}
                                    renderInput={(params) => <TextField {...params} variant="filled" label="Источник данных" />}
                                    value={customReport_DataSources.find((found) => found.value === body.dataSource) || null}
                                    onChange={(e: any, value: { label: string; value: string } | null) => {
                                        value && setBody({ ...body, dataSource: value.value });
                                    }}
                                />
                            </Grid>
                        </Grid>
                        {editMode ? (
                            <MuiTabs list={tabList} gutterBottom={true} externalTabControl extTabValue={currentTab} setExtTabValue={setCurrentTab} />
                        ) : (
                            <ReportView body={body} setBody={setBody} customReportData={customReportData} />
                        )}
                    </form>
                )}
            </Box>
        </React.Fragment>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { customReportElement, isLoading } = customReportElementSelector(state);
    const { customReportData } = customReportDataSelector(state);
    const tableList = customReport_TableList;
    return { user, customReportElement, customReportData, isLoading, tableList };
};

const connector = connect(mapStateToProps);
type DictionaryReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(CustomReportElement);
