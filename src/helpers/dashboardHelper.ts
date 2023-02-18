export const addWidgetToUpdateQueue = (currentQueue: any, widgetName: any) => {
    if (Array.isArray(widgetName)) {
        return currentQueue.slice().concat(widgetName);
    }
    return currentQueue.slice().concat([widgetName]);
};

export const removeWidgetFromUpdateQueue = (currentQueue: any, widgetName: any) => {
    if (Array.isArray(widgetName)) {
        return currentQueue.filter((item: any) => widgetName.indexOf(item) === -1);
    }
    return currentQueue.filter((item: any) => item !== widgetName);
};

const COLOR_DARK = '#555555';
const COLOR_RED = '#F00D1E';
const COLOR_GREEN = '#5ECC05';
const COLOR_YELLOW = '#ECE51C';
const COLOR_PINK = '#F1A5C0';
const COLOR_BLUE = '#5C0FF5';

export const getAreaChartDataByIndex = (data: any, index: any, customTemplate?: any) => {
    if (!customTemplate) {
        switch (index) {
            case 0:
                return {
                    id: 'low',
                    name: 'Низкий',
                    value: data.map((monthItem: any) => monthItem.value),
                    color: COLOR_GREEN,
                };
            case 1:
                return {
                    id: 'medium',
                    name: 'Средний',
                    value: data.map((monthItem: any) => monthItem.value),
                    color: COLOR_YELLOW,
                };
            case 2:
                return {
                    id: 'high',
                    name: 'Высокий',
                    value: data.map((monthItem: any) => monthItem.value),
                    color: COLOR_RED,
                };
            default:
                return {
                    id: 'low',
                    name: 'Низкий',
                    value: data.map((monthItem: any) => monthItem.value),
                    color: COLOR_GREEN,
                };
        }
    } else if (customTemplate === 'ordersCounter') {
        switch (index) {
            case 0:
                return {
                    id: 'all',
                    name: 'Все работы',
                    value: data.map((monthItem: any) => monthItem.value),
                    color: COLOR_DARK,
                };
            case 1:
                return {
                    id: 'success',
                    name: 'Выполненные работы',
                    value: data.map((monthItem: any) => monthItem.value),
                    color: COLOR_GREEN,
                };
        }
    } else if (customTemplate === 'ordersPercent') {
        switch (index) {
            case 0:
                return {
                    id: 'all',
                    name: 'Процент выполненных работ',
                    value: data.map((monthItem: any) => monthItem.value),
                    color: COLOR_RED,
                };
        }
    }
};

