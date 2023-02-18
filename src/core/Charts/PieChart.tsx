import React from 'react';
import Highcharts from 'highcharts';
import { HighchartsChart, Chart, withHighcharts, Title, Legend, PieSeries, Tooltip, Loading } from 'react-jsx-highcharts';

interface IPieChartProps {
    data: any;
    totalCount: number;
    widgetName: string;
    setWidgetModel: (chartName: string, model: any) => void;
    isLoading: boolean;
    height?: number;
    title?: string;
    hideLegend?: boolean;
}

const PieChart = (props: IPieChartProps) => {
    const { data, height, totalCount, title, widgetName, isLoading, hideLegend, setWidgetModel } = props;
    const plotOptions = {
        pie: {
            allowPointSelect: true,
            dataLabels: {
                enabled: false, // скрывает подсказки вокруг пирога
            },
        },
    };
    const pointFormat = '<span style="color:{point.color}">●</span> Количество: <b>{point.y}</b><br/>';

    const setChart = (chart: any) => {
        if (widgetName) setWidgetModel(widgetName, chart);
    };

    return (
        <div className="pie-chart">
            {!!title ? <h3 className="pie-chart-title">{title}</h3> : null}
            <HighchartsChart plotOptions={plotOptions} callback={setChart}>
                <Chart height={height || 242} />
                <Title verticalAlign="middle" useHTML={true} y={-25}>
                    {totalCount === 0 ? '' : totalCount}
                </Title>
                <Loading isLoading={isLoading}>Загрузка данных ... </Loading>
                {!hideLegend ? <Legend /> : null}
                <Tooltip pointFormat={pointFormat} />
                <PieSeries name={widgetName || ''} data={data} showInLegend={true} innerSize="50%" />
            </HighchartsChart>
        </div>
    );
};

export default withHighcharts(PieChart, Highcharts);
