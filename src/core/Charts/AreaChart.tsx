import React from 'react';
import Highcharts from 'highcharts';
import { HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, Tooltip, AreaSplineSeries, Loading } from 'react-jsx-highcharts';
import { getAreaChartDataByIndex } from '@helpers/dashboardHelper';

interface IAreaChartProps {
    name: string;
    widgetName: string;
    setWidgetModel: (chartName: string, chart: any) => void;
    data: any;
    height?: number;
    title?: string;
    chartName?: string;
    isLoading: boolean;
    hideLegend?: boolean;
    addChartInfo: any;
    customTemplate: any;
}

const AreaChart = (props: IAreaChartProps) => {
    const { data, height, title, chartName, isLoading, addChartInfo, customTemplate, setWidgetModel } = props;
    const { elementClassName, categories, valueSuffix } = addChartInfo;
    const chartData = data.map((item: any, index: number) => {
        const chartData = getAreaChartDataByIndex(item, index, customTemplate);
        if (chartData)
            return (
                <AreaSplineSeries
                    id={chartData.id}
                    key={chartData.id + chartData.name}
                    name={chartData.name}
                    data={chartData.value}
                    color={chartData.color}
                />
            );
    });

    const setChart = (chart: any) => {
        // const { widgetName, setWidgetModel } = props;
        // if (!widgetName || !setWidgetModel) {
        //     return false;
        // }
        // const widgetModel = { [widgetName]: chart };
        console.log("chartName", chartName)
        chartName && setWidgetModel(chartName, chart);
    };

    return (
        <div className={elementClassName}>
            <HighchartsChart callback={setChart}>
                <Chart height={height || 242} />
                {!!title ? <Title>{title}</Title> : null}
                <Loading isLoading={isLoading}>Загрузка данных ... </Loading>
                <XAxis categories={categories} tickmarkPlacement="on" />
                <Legend />
                <Tooltip split valueSuffix={valueSuffix} />
                <YAxis>{chartData}</YAxis>
            </HighchartsChart>
        </div>
    );
};

export default withHighcharts(AreaChart, Highcharts);
