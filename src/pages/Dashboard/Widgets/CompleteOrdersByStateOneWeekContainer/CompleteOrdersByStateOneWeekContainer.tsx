import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';

import AreaChart from '@core/Charts/AreaChart';

import { RootState } from '@services/index';
import { dashboardSelector } from '@services/dashboardService';
import {
    getDatesForDaysNumber,
    getDatesForRequest,
    getOrdersTemplateByDates,
    getSimpleChart,
    mapOrdersCounterForDays,
} from '@pages/Dashboard/methods';

interface ICompleteOrdersByStateOneWeekContainerProps extends ReduxProps {
    setWidgetModel: any;
    widgetName: string;
    hidden: boolean;
}

const CompleteOrdersByStateOneWeekContainer = (props: ICompleteOrdersByStateOneWeekContainerProps) => {
    const { orders, isLoading, widgetName, setWidgetModel, hidden } = props;
    const dates = getDatesForDaysNumber(7);
    const columnChartData = [getOrdersTemplateByDates(dates), getOrdersTemplateByDates(dates)];
    const areaChartData = !isLoading ? mapOrdersCounterForDays(orders, dates, columnChartData) : columnChartData;
    const addChartInfo = {
        //valueSuffix: ` ${getTotalOrderString(orders.length % 10)}`,
        valueSuffix: ' заявок',
        elementClassName: 'area-chart',
        categories: dates,
        pointFormat: '{series.name}: <b>{point.y}</b><br/>',
    };
    const { endOfDay, oneWeekAgo } = getDatesForRequest();

    moment.locale('ru');

    const title = hidden
        ? 'Выполненные работы за неделю'
        : `Выполненные работы за неделю (с ${oneWeekAgo.format('D MMMM')} по ${endOfDay.format('D MMMM')})`;

    return getSimpleChart({
        title,
        hidden,
        chartContent: (
            <AreaChart
                name={'timeline orders chart'}
                customTemplate="ordersCounter"
                widgetName={widgetName}
                chartName="CompleteOrdersByStateOneWeekContainer"
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

export default compose(connector)(CompleteOrdersByStateOneWeekContainer);

