import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';

import ColumnChart from '@core/Charts/ColumnChart';

import { RootState } from '@services/index';
import { dashboardSelector } from '@services/dashboardService';
import {
    getDatesForDaysNumber,
    getDatesForRequest,
    getOrdersTemplateByDates,
    getSimpleChart,
    mapOrdersDataByPriorityForDays,
} from '@pages/Dashboard/methods';

interface ICompleteOrdersByStateOneWeekContainerProps extends ReduxProps {
    setWidgetModel: any;
    widgetName: string;
    hidden: boolean;
}

const OrdersByPriorityOneWeekContainer = (props: ICompleteOrdersByStateOneWeekContainerProps) => {
    const { orders, isLoading, widgetName, setWidgetModel, hidden } = props;
    const dates = getDatesForDaysNumber(7);
    const columnChartData = [getOrdersTemplateByDates(dates), getOrdersTemplateByDates(dates), getOrdersTemplateByDates(dates)];
    const chartData = !isLoading ? mapOrdersDataByPriorityForDays(orders, dates, columnChartData) : columnChartData;
    const addChartInfo = {
        valueSuffix: ' работ',
        elementClassName: 'column-chart',
        categories: dates,
    };
    const { endOfDay, oneWeekAgo } = getDatesForRequest();

    moment.locale('ru');

    const title = hidden
        ? 'Работы по приоритетам за неделю'
        : `Работы по приоритетам за неделю (с ${oneWeekAgo.format('D MMMM')} по ${endOfDay.format('D MMMM')})`;

    return getSimpleChart({
        title,
        hidden,
        chartContent: (
            <ColumnChart
                name={'column orders priority chart'}
                widgetName={widgetName}
                setWidgetModel={setWidgetModel}
                chartName={'OrdersByPriorityOneWeekContainer'}
                data={chartData}
                isLoading={isLoading}
                addChartInfo={addChartInfo}
            />
        ),
    });
};

const mapStateToProps = (state: RootState, props: any) => {
    const { ordersByPriorityOneWeek, loadingWidgets, updateLayoutNames } = dashboardSelector(state);
    return {
        orders: ordersByPriorityOneWeek,
        isLoading: loadingWidgets.indexOf(props.widgetName) !== -1,
        needUpdate: updateLayoutNames && updateLayoutNames.length && updateLayoutNames.indexOf(props.widgetName) !== -1,
    };
};

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(OrdersByPriorityOneWeekContainer);

