import React from 'react';
import Box from '@mui/material/Box';
import { IWidgetConfig } from './config';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LoopIcon from '@mui/icons-material/Loop';
import { sx } from './styles';
import { Loader } from '@core/Loader/Loader';
import moment from 'moment';

interface IGetSimpleChartParams {
    title: string;
    chartContent: any;
    isLoading?: boolean;
    icon?: any;
    value?: string;
    description?: string;
    isBase?: boolean;
    hidden?: boolean;
}

export const getSimpleChart = (params: IGetSimpleChartParams) => {
    const { isLoading, title, icon, value, description, isBase, chartContent, hidden } = params;
    if (isBase) {
        return (
            <div className={`widget-inner-block widget-small-panel${hidden ? ' hidden' : ''}`}>
                <h3 className="widget-title">{title}</h3>
                <div className="widget-content">
                    {isLoading ? (
                        <div className="widget-panel">
                            <Loader />
                        </div>
                    ) : (
                        <div className="widget-panel">
                            {!!icon ? icon : null}
                            <div className="widget-content">
                                <div className="widget-value">{value}</div>
                                <div className="widget-description">{description}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    return (
        <div className={`widget-inner-block ${hidden ? ' hidden' : ''}`}>
            <h3 className="widget-title">{title}</h3>
            <div className={'widget-content'}>
                {isLoading ? (
                    <div className="widget-panel">
                        <Loader />
                    </div>
                ) : (
                    chartContent
                )}
            </div>
        </div>
    );
};

interface ICreateWidgetPanel {
    widgetsConfig: IWidgetConfig[];
    hideShowWidget: (name: string) => void;
    reloadWidgetData: (item: IWidgetConfig) => void;
    setWidgetModel: (chartName: string, chart: any) => void;
}

export const createWidgetPanel = ({ widgetsConfig, hideShowWidget, reloadWidgetData, setWidgetModel }: ICreateWidgetPanel) => {
    return widgetsConfig.map((item, index) => {
        if (item.name === 'BaseClock') {
            return (
                <Box key={item.name} sx={{ ...sx.baseChartBlock, ...sx.widgetMainBlock, ...sx.clock }} data-grid={item.config}>
                    {item.component(item.name, item.hidden, setWidgetModel)}
                </Box>
            );
        }
        return (
            <Box
                key={item.name}
                sx={item.hidden ? { ...sx.baseChartBlock, ...sx.widgetMainBlock, ...sx.hidden } : { ...sx.baseChartBlock, ...sx.widgetMainBlock }}
                data-grid={item.config}
            >
                <Box sx={sx.toolbar}>
                    <Box sx={{ ...sx.toolbarItem, ...sx.menu }}>
                        <div className="widget-menu-btn">
                            <MoreVertIcon />
                        </div>
                        <Box className="widget-menu-list">
                            {item.type !== 'small-panel' && (
                                <div
                                    className="widget-menu-list-item"
                                    onClick={() => {
                                        hideShowWidget(item.name);
                                    }}
                                >
                                    {!item.hidden ? (
                                        <>
                                            Свернуть <ExpandLessIcon fontSize="small" />
                                        </>
                                    ) : (
                                        <>
                                            Развернуть <ExpandMoreIcon fontSize="small" />
                                        </>
                                    )}
                                </div>
                            )}
                            <div
                                className="widget-menu-list-item"
                                onClick={() => {
                                    reloadWidgetData(item);
                                }}
                            >
                                Обновить <LoopIcon fontSize="small" />
                            </div>
                        </Box>
                    </Box>
                </Box>
                {item.component(item.name, item.hidden, setWidgetModel)}
            </Box>
        );
    });
};

export const UNAPPROVED_ORDER_STATES = ['AP', 'NC'];

export const mapOrdersToPieChartData = (resultBody: any, orderStates: any) => {
    let orderStatesArr = {};
    const fullStates = orderStates
        .filter((item: any) => UNAPPROVED_ORDER_STATES.indexOf(item.value) === -1)
        .map((item: any) => {
            return { ...item };
        });
    resultBody.forEach((item: any) => {
        if (orderStatesArr.hasOwnProperty(item.State)) {
            //@ts-ignore
            orderStatesArr[item.State] += item.Count;
        } else {
            //@ts-ignore
            orderStatesArr[item.State] = item.Count;
        }
    });
    const pieChartData = fullStates.map((elem: any) => {
        //@ts-ignore
        const stateCount = orderStatesArr[elem.Code];
        return {
            name: elem.Name,
            code: elem.Code,
            y: !!stateCount ? stateCount : 0,
            color: getColorByText(elem.Code),
        };
    });
    return pieChartData;
};

const COLOR_DARK = '#555555';
const COLOR_ORANGE = '#ffa500';
const COLOR_RED = '#F00D1E';
const COLOR_GREEN = '#5ECC05';
const COLOR_YELLOW = '#ECE51C';
const COLOR_LIGHT_GREEN = '#81efb3';
const COLOR_BLUE = '#5C0FF5';
const COLOR_LIGHT_BLUE = '#00cdff';

export const getColorByText = (shortText: string) => {
    switch (shortText) {
        case 'NW': // Новый
            return COLOR_YELLOW;
        case 'CH': // Выбор перевозчика
            return COLOR_ORANGE;
        case 'GO': // Перевозчик выбран
            return COLOR_LIGHT_BLUE;
        case 'PL': // Запланирован перевозчиком
            return COLOR_GREEN;
        case 'WR': // Выполняется
            return COLOR_LIGHT_GREEN;
        case 'CL': // Закрыт
            return COLOR_DARK;
        case 'CN': // Отменен
            return COLOR_RED;
        default:
            return COLOR_BLUE;
    }
};

export const getDatesForRequest = (date?: Date) => {
    const today = moment(date);
    const startOfDay = moment(date).startOf('day');
    const endOfDay = moment(date).endOf('day');
    const threeDaysAgo = moment(date).subtract(3, 'd').startOf('day');
    const oneWeekAgo = moment(date).subtract(7, 'd').startOf('day');
    const halfYearPlus = moment(date).add(180, 'd').endOf('day');
    const startOfMonth = moment(date).startOf('month').startOf('day');
    const endOfMonth = moment(date).endOf('month').endOf('day');
    const monthAgo = moment(date).subtract(1, 'month').startOf('day');
    const startOfYear = moment(date).startOf('year').startOf('month').startOf('day');
    const endOfYear = moment(date).endOf('year').endOf('day');
    const thirtyDaysBefore = moment(date).subtract(30, 'd').startOf('day');
    return {
        today,
        oneWeekAgo,
        threeDaysAgo,
        startOfMonth,
        startOfDay,
        endOfDay,
        endOfMonth,
        monthAgo,
        startOfYear,
        endOfYear,
        halfYearPlus,
        thirtyDaysBefore,
    };
};

export const getDatesForDaysNumber = (numberOfDays: number) => {
    const today = new Date();
    let result = [];
    for (let i = 0; i <= numberOfDays; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(currentDate.getDate() - i);
        result.push(currentDate.toLocaleDateString());
    }
    result.reverse();
    return result;
};

export const getOrdersTemplateByDates = (datesArr: string[]) => {
    let result: { text: string; value: number }[] = [];
    datesArr.forEach((item) => {
        result.push({
            text: item,
            value: 0,
        });
    });
    return result;
};

export const mapOrdersPercentForDays = (orders: any, dates: any, template: any) => {
    let result = template.slice();
    orders.forEach((item: any) => {
        const selectedDate = new Date(item.Date);
        const dateIndex = dates.indexOf(selectedDate.toLocaleDateString());
        if (dateIndex !== -1 && dateIndex < dates.length) {
            if (item.States && item.States.length > 0) {
                const readyState = item.States.find((stateItem: any) => stateItem.State === 'RD');
                result[0][dateIndex].value = readyState && readyState.Percent ? readyState.Percent : 0;
            }
        }
    });
    return result;
};

export const mapOrdersCounterForDays = (orders: any, dates: any, template: any) => {
    let result = template.slice();
    orders.forEach((item: any) => {
        const selectedDate = new Date(item.Date);
        const dateIndex = dates.indexOf(selectedDate.toLocaleDateString());
        if (dateIndex !== -1 && dateIndex < dates.length) {
            if (item.States && item.States.length > 0) {
                item.States.forEach((stateItem: any) => {
                    result[0][dateIndex].value += stateItem.Count > 0 ? stateItem.Count : 0;
                    result[1][dateIndex].value += stateItem.State === 'RD' && stateItem.Count > 0 ? stateItem.Count : 0;
                });
            }
        }
    });
    return result;
};

export const mapOrdersDataByPriorityForDays = (orders: any, dates: any, template: any) => {
    let result = template.slice();
    orders.forEach((item: any) => {
        const selectedDate = new Date(item.Date);
        if (dates.indexOf(selectedDate.toLocaleDateString()) !== -1) {
            if (item.Priorities && item.Priorities.length > 0) {
                item.Priorities.forEach((prior: any) => {
                    if (prior.Priority === 'L') {
                        result[0][dates.indexOf(selectedDate.toLocaleDateString())].value += prior.Count;
                    } else if (prior.Priority === 'M') {
                        result[1][dates.indexOf(selectedDate.toLocaleDateString())].value += prior.Count;
                    } else if (prior.Priority === 'H') {
                        result[2][dates.indexOf(selectedDate.toLocaleDateString())].value += prior.Count;
                    }
                });
            }
        }
    });
    return result;
};

export const createOrderTypeTemplate = (orderTypes: any) => {
    return (
        orderTypes
            // .filter((item: any) => !!item.value)
            .map((item: any, index: number) => {
                return {
                    index,
                    OrderType: item.Code,
                    OrderTypeName: item.Name,
                    OrdersCounter: 0,
                    ReadyCounter: 0,
                    ReadyPercent: 0,
                };
            })
    );
};

export const getModifiedTableChartData = (orders: any, orderTypes: any) => {
    const template = createOrderTypeTemplate(orderTypes);
    orders.forEach((item: any) => {
        const templateItem = template.find((temp: any) => temp.OrderType === item.OrderType);
        if (!!templateItem) {
            templateItem.OrdersCounter = item.NotReadyCount + item.ReadyCount || 0;
            templateItem.ReadyCounter = item.ReadyCount || 0;
            templateItem.ReadyPercent = !item.ReadyPercent ? 0 : item.ReadyPercent + '%';
        }
    });
    return template;
};

export const mapOrdersTotalByStates = (responseBody: any, states: any) => {
    let result = 0;
    responseBody.forEach((item: any) => {
        if (states && states.length > 0) {
            result += states.includes(item.State) ? item.Count : 0;
        } else {
            result += item.Count;
        }
    });
    return result;
};
