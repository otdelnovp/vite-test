import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';

import LineChart from '@core/Charts/LineChart';

import { RootState } from '@services/index';
import { dashboardSelector } from '@services/dashboardService';
import {
    getDatesForDaysNumber,
    getDatesForRequest,
    getOrdersTemplateByDates,
    getSimpleChart,
    mapOrdersPercentForDays,
} from '@pages/Dashboard/methods';

interface IPercentOrdersByStateOneWeekContainerProps extends ReduxProps {
    setWidgetModel: any;
    widgetName: string;
    hidden: boolean;
}

const PercentOrdersByStateOneWeekContainer = (props: IPercentOrdersByStateOneWeekContainerProps) => {
    const { orders, isLoading, widgetName, setWidgetModel, hidden } = props;
    const dates = getDatesForDaysNumber(7);
    const columnChartData = [getOrdersTemplateByDates(dates)];
    const areaChartData = !isLoading ? mapOrdersPercentForDays(orders, dates, columnChartData) : columnChartData;
    const addChartInfo = {
        valueSuffix: '%',
        elementClassName: 'area-chart',
        categories: dates,
    };
    const { endOfDay, oneWeekAgo } = getDatesForRequest();

    moment.locale('ru');

    const title = hidden
        ? 'Процент выполненных работ за неделю'
        : `Процент выполненных работ за неделю (с ${oneWeekAgo.format('D MMMM')} по ${endOfDay.format('D MMMM')})`;

    return getSimpleChart({
        title,
        hidden,
        chartContent: (
            <LineChart
                name={'timeline percent orders chart'}
                customTemplate="ordersPercent"
                widgetName={widgetName}
                chartName={'PercentOrdersByStateOneWeekContainer'}
                setWidgetModel={setWidgetModel}
                data={areaChartData}
                addChartInfo={addChartInfo}
                isLoading={isLoading}
            />
        ),
    });
};

const mapStateToProps = (state: RootState, props: any) => {
    const { ordersByStateOneWeek, loadingWidgets, updateLayoutNames } = dashboardSelector(state);
    return {
        orders: ordersByStateOneWeek,
        isLoading: loadingWidgets.indexOf(props.widgetName) !== -1,
        needUpdate: updateLayoutNames && updateLayoutNames.length && updateLayoutNames.indexOf(props.widgetName) !== -1,
    };
};

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(PercentOrdersByStateOneWeekContainer);

