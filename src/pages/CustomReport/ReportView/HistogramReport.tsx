import React, { useEffect, useState } from 'react';

import Highcharts from 'highcharts';
import { Chart, ColumnSeries, HighchartsChart, HighchartsProvider, Legend, Title, XAxis, YAxis } from 'react-jsx-highcharts';

import Box from '@mui/material/Box';

import { getMUIDatatableOptions } from '@helpers/dataTableHelper';

import { ICustomReportElement } from '../model';
import { sx } from '../styles';

interface ITableReportProps {
    body: ICustomReportElement;
    customReportData: any[];
}

const HistogramReport = ({ body, customReportData }: ITableReportProps) => {
    const options = { ...getMUIDatatableOptions({ data: customReportData }) };

    const [histogramData, setHistogramData] = useState({} as any);

    const getHistogramData = (body: ICustomReportElement, customReportData: any[]) => {
        // TODO: получение данных из настроек отчета
        const nameField = 'production_product';
        const valueField = 'production_volume';
        const groupField = 'production_year';

        const groups: any[] = [];
        customReportData.map((item) => {
            if (!groups.find((found) => found === item[groupField])) {
                groups.push(item[groupField]);
            }
        });

        const names: any[] = [];
        customReportData.map((item) => {
            if (!names.find((found) => found === item[nameField])) {
                names.push(item[nameField]);
            }
        });

        return {
            nameField,
            valueField,
            groupField,
            groups,
            names,
        };
    };

    useEffect(() => {
        setHistogramData(getHistogramData(body, customReportData));
    }, [customReportData]);

    return (
        <React.Fragment>
            <Box sx={sx.tableBox}>
                {histogramData.names && histogramData.names.length ? (
                    <HighchartsProvider Highcharts={Highcharts}>
                        <HighchartsChart>
                            <Chart />
                            <Title>{body.name}</Title>
                            <Legend />
                            <XAxis categories={histogramData.groups} />
                            <YAxis>
                                {histogramData.names &&
                                    histogramData.names.map((name: string) => {
                                        const data = histogramData.groups.map((group: string) => {
                                            const found = customReportData.find(
                                                (item) => item[histogramData.nameField] === name && item[histogramData.groupField] === group,
                                            );
                                            return found ? parseInt(found[histogramData.valueField]) : 0;
                                        });
                                        console.log('data', data);
                                        return <ColumnSeries name={name} data={data} />;
                                    })}
                            </YAxis>
                        </HighchartsChart>
                    </HighchartsProvider>
                ) : (
                    <></>
                )}
            </Box>
        </React.Fragment>
    );
};

export default HistogramReport;
