import React from 'react';
import Highcharts from 'highcharts';
import { HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, Tooltip, LineSeries, Loading } from 'react-jsx-highcharts';
import { getAreaChartDataByIndex } from '@helpers/dashboardHelper';

interface ILineChartProps {
    name: string;
    widgetName: string;
    setWidgetModel: (chartName: string, model: any) => void;
    data: any;
    height?: number;
    title?: string;
    chartName?: string;
    isLoading: boolean;
    addChartInfo: any;
    customTemplate: any;
    hideLegend?: boolean;
}

const LineChart = (props: ILineChartProps) => {
    const { data, height, title, chartName, isLoading, addChartInfo, customTemplate, setWidgetModel } = props;
    const { elementClassName, categories, valueSuffix } = addChartInfo;

    const chartData = data.map((item: any, index: number) => {
        const chartData = getAreaChartDataByIndex(item, index, customTemplate);
        if (chartData)
            return (
                <LineSeries
                    id={chartData.id}
                    key={chartData.id + chartData.name}
                    name={chartData.name}
                    data={chartData.value}
                    color={chartData.color}
                />
            );
    });

    const setChart = (chart: any) => {
        if (chartName) setWidgetModel(chartName, chart);
    };

    return (
        <div className={elementClassName}>
            <HighchartsChart callback={setChart}>
                <Chart height={height || 242} />
                {!!title ? <Title>{title}</Title> : null}
                <Loading isLoading={isLoading}>Загрузка данных ... </Loading>
                <XAxis height="100%" categories={categories} tickmarkPlacement="on" />
                {/* <Legend height="100%" />
                <Tooltip height="100%" split valueSuffix={valueSuffix} /> */}
                <Legend />
                <Tooltip split valueSuffix={valueSuffix} />
                <YAxis height="100%">{chartData}</YAxis>
            </HighchartsChart>
        </div>
    );
};

export default withHighcharts(LineChart, Highcharts);
