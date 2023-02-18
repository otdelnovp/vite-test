import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';

import PieChart from '@core/Charts/PieChart';

import { RootState } from '@services/index';
import { userSelector } from '@services/userService';
import { dashboardSelector } from '@services/dashboardService';
import { orderStates } from '@helpers/dictionariesHelper';
import { getDatesForRequest, getSimpleChart, mapOrdersToPieChartData } from '@pages/Dashboard/methods';

interface IOrdersByStateThisMonthProps extends ReduxProps {
    setWidgetModel: any;
    widgetName: string;
    hidden: boolean;
}

const OrdersByStateMonth = (props: IOrdersByStateThisMonthProps) => {
    const { orders, isLoading, setWidgetModel, widgetName, hidden } = props;

    const pieChartData = mapOrdersToPieChartData(orders, orderStates.slice());

    const totalOrders = pieChartData.reduce((sum: any, item: any) => {
        return sum + item.y;
    }, 0);
    const isLoadingChartData = isLoading || !orderStates;
    const { endOfDay, startOfMonth } = getDatesForRequest();

    moment.locale('ru');

    const title = hidden
        ? 'Работы по статусам с начала месяца'
        : `Работы по статусам с начала месяца (с ${startOfMonth.format('D MMMM')} по ${endOfDay.format('D MMMM')})`;

    return getSimpleChart({
        title,
        hidden,
        chartContent: (
            <PieChart
                data={pieChartData}
                totalCount={totalOrders}
                widgetName={widgetName}
                setWidgetModel={setWidgetModel}
                isLoading={isLoadingChartData}
            />
        ),
    });
};

const mapStateToProps = (state: RootState, props: any) => {
    const { user } = userSelector(state);
    const { ordersByStateMonth, loadingWidgets, initHomePage, updateLayoutNames } = dashboardSelector(state);
    return {
        user,
        orders: ordersByStateMonth,
        isLoading: loadingWidgets.indexOf(props.widgetName) !== -1,
        initHomePage,
        needUpdate: updateLayoutNames && updateLayoutNames.length && updateLayoutNames.indexOf(props.widgetName) !== -1,
    };
};

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(OrdersByStateMonth);
