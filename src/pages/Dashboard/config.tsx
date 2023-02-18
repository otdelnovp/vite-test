import React from 'react';

import { IUserData } from '@helpers/authHelper';
import {
    getOrdersByPriorityOneWeek,
    getOrdersByStateOneDayByCreatedTotal,
    getOrdersByStateOneDayTotal,
    getOrdersByStateOneWeek,
    getOrdersByStateMonth,
    getOrdersByType,
} from '@services/dashboardService';
import { AppThunk } from '@services/index';

import BaseClock from './Widgets/BaseClock/BaseClock';
import OrdersCreatedToday from './Widgets/OrdersCreatedToday/OrdersCreatedToday';
import PercentOrdersByStateOneWeekContainer from './Widgets/PercentOrdersByStateOneWeekContainer/PercentOrdersByStateOneWeekContainer';
import CompleteOrdersByStateOneWeekContainer from './Widgets/CompleteOrdersByStateOneWeekContainer/CompleteOrdersByStateOneWeekContainer';
import OrdersByPriorityOneWeekContainer from './Widgets/OrdersByPriorityOneWeekContainer/OrdersByPriorityOneWeekContainer';
import OrdersByTypeContainer from './Widgets/OrdersByTypeContainer/OrdersByTypeContainer';
import OrdersCompletedToday from './Widgets/OrdersCompletedToday/OrdersCompletedToday';
import OrdersByStateMonth from './Widgets/OrdersByStateMonth/OrdersByStateMonth';

interface IWidgetPosition {
    x: number;
    y: number;
    w: number;
    h: number;
    minW: number;
    maxW: number;
    minH: number;
    maxH: number;
    isResizable: boolean;
}

export interface IWidgetConfig {
    name: string;
    type: 'small-panel' | 'diagram' | 'table';
    config: IWidgetPosition;
    hidden: boolean;
    methodName?: string;
    reloadData?: (user: IUserData) => AppThunk<void>;
    component: (name: string, hidden: boolean, setWidgetModel: any) => any;
}

export const DEFAULT_WIDGETS_CONFIG: IWidgetConfig[] = [
    // SMALL PANEL
    {
        name: 'BaseClock',
        type: 'small-panel',
        config: { x: 6, y: 0, w: 3, h: 3, minW: 3, maxW: 3, minH: 3, maxH: 3, isResizable: false },
        hidden: false,
        component: (name, setWidgetModel) => <BaseClock widgetName={name} />,
    },
    {
        name: 'OrdersCreatedToday',
        type: 'small-panel',
        config: { x: 0, y: 0, w: 3, h: 3, minW: 3, maxW: 3, minH: 3, maxH: 3, isResizable: false },
        hidden: false,
        methodName: 'getOrdersByStateOneDayByCreatedTotal',
        reloadData: getOrdersByStateOneDayByCreatedTotal,
        component: (name, hidden, setWidgetModel) => {
            return <OrdersCreatedToday widgetName={name} hidden={hidden} />;
        },
    },
    {
        name: 'OrdersCompletedToday',
        type: 'small-panel',
        config: { x: 3, y: 0, w: 3, h: 3, minW: 3, maxW: 3, minH: 3, maxH: 3, isResizable: false },
        hidden: false,
        methodName: 'getOrdersByStateOneDayTotal',
        reloadData: getOrdersByStateOneDayTotal,
        component: (name, hidden, setWidgetModel) => {
            return <OrdersCompletedToday widgetName={name} hidden={hidden} />;
        },
    },
    // DIAGRAM
    {
        name: 'OrdersByStateMonth',
        type: 'diagram',
        config: { x: 6, y: 1, w: 6, h: 9, minW: 4, maxW: 12, minH: 9, maxH: 9, isResizable: true },
        hidden: false,
        methodName: 'getOrdersByStateMonth',
        reloadData: getOrdersByStateMonth,
        component: (name, hidden, setWidgetModel) => {
            return <OrdersByStateMonth widgetName={name} hidden={hidden} setWidgetModel={setWidgetModel} />;
        },
    },
    {
        name: 'LinePercentContainer',
        type: 'diagram',
        config: { x: 0, y: 1, w: 6, h: 9, minW: 4, maxW: 12, minH: 9, maxH: 9, isResizable: true },
        hidden: false,
        methodName: 'getOrdersByStateOneWeek',
        reloadData: getOrdersByStateOneWeek,
        component: (name, hidden, setWidgetModel) => {
            return <PercentOrdersByStateOneWeekContainer widgetName={name} hidden={hidden} setWidgetModel={setWidgetModel} />;
        },
    },
    {
        name: 'CompleteOrdersByStateOneWeekContainer',
        type: 'diagram',
        config: { x: 0, y: 2, w: 6, h: 9, minW: 4, maxW: 12, minH: 9, maxH: 9, isResizable: true },
        hidden: false,
        methodName: 'getOrdersByStateOneWeek',
        reloadData: getOrdersByStateOneWeek,
        component: (name, hidden, setWidgetModel) => {
            return <CompleteOrdersByStateOneWeekContainer widgetName={name} hidden={hidden} setWidgetModel={setWidgetModel} />;
        },
    },
    {
        name: 'OrdersByPriorityOneWeekContainer',
        type: 'diagram',
        config: { x: 6, y: 2, w: 6, h: 9, minW: 4, maxW: 12, minH: 9, maxH: 9, isResizable: true },
        hidden: false,
        methodName: 'getOrdersByPriorityOneWeek',
        reloadData: getOrdersByPriorityOneWeek,
        component: (name, hidden, setWidgetModel) => {
            return <OrdersByPriorityOneWeekContainer widgetName={name} hidden={hidden} setWidgetModel={setWidgetModel} />;
        },
    },
    // TABLE
    {
        name: 'OrdersByTypeContainer',
        type: 'diagram',
        config: { x: 0, y: 3, w: 6, h: 9, minW: 6, maxW: 12, minH: 9, maxH: 9, isResizable: true },
        hidden: false,
        methodName: 'getOrdersByType',
        reloadData: getOrdersByType,
        component: (name, hidden, setWidgetModel) => {
            return <OrdersByTypeContainer widgetName={name} hidden={hidden} />;
        },
    },
];
