import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';

import { compose } from 'redux';

import RGL, { WidthProvider } from 'react-grid-layout';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppsIcon from '@mui/icons-material/Apps';
import LoopIcon from '@mui/icons-material/Loop';

import { userSelector } from '@services/userService';
import { RootState } from '@services/index';

import { DEFAULT_WIDGETS_CONFIG, IWidgetConfig } from './config';
import { createWidgetPanel } from './methods';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { sx } from './styles';

import { AppDispatch } from 'src';

const ReactGridLayout = WidthProvider(RGL);

const Dashboard = ({ user }: DashboardReduxProps) => {
    const [widgetsConfig, setWidgetsConfig] = useState(undefined as any);
    const [widgetPanel, setWidgetPanel] = useState(undefined as any);

    // charts objects
    const [chartOrdersByStateMonth, setChartOrdersByStateMonth] = useState(undefined as any);
    const [chartPercentOrdersByStateOneWeekContainer, setChartPercentOrdersByStateOneWeekContainer] = useState(undefined as any);
    const [chartCompleteOrdersByStateOneWeekContainer, setChartCompleteOrdersByStateOneWeekContainer] = useState(undefined as any);
    const [chartOrdersByPriorityOneWeekContainer, setChartOrdersByPriorityOneWeekContainer] = useState(undefined as any);

    const dispatch = useDispatch<AppDispatch>();

    const onLayoutChange = (newLayout: any) => {
        setTimeout(() => {
            chartOrdersByStateMonth && chartOrdersByStateMonth.reflow();
            chartPercentOrdersByStateOneWeekContainer && chartPercentOrdersByStateOneWeekContainer.reflow();
            chartCompleteOrdersByStateOneWeekContainer && chartCompleteOrdersByStateOneWeekContainer.reflow();
            chartOrdersByPriorityOneWeekContainer && chartOrdersByPriorityOneWeekContainer.reflow();
        }, 100);
        if (newLayout) {
            let newWidgetsConfig = widgetsConfig.map((item: IWidgetConfig) => {
                const newLayoutItem = newLayout.find((layoutItem: any) => layoutItem.i === item.name);
                if (newLayoutItem) {
                    return {
                        ...item,
                        config: {
                            ...item.config,
                            x: newLayoutItem.x,
                            y: newLayoutItem.y,
                            h: newLayoutItem.h,
                            w: newLayoutItem.w,
                        },
                    };
                }
                return { ...item };
            });
            setWidgetsConfig(newWidgetsConfig);
            localStorage.setItem('dashboard-config', JSON.stringify(newWidgetsConfig));
        }
    };

    const setWidgetModel = (chartName: string, chart: any) => {
        switch (chartName) {
            case 'PercentOrdersByStateOneWeekContainer':
                setChartPercentOrdersByStateOneWeekContainer(chart);
                break;
            case 'OrdersByStateMonth':
                setChartOrdersByStateMonth(chart);
                break;
            case 'CompleteOrdersByStateOneWeekContainer':
                setChartCompleteOrdersByStateOneWeekContainer(chart);
                break;
            case 'OrdersByPriorityOneWeekContainer':
                setChartOrdersByPriorityOneWeekContainer(chart);
                break;
        }
    };

    const hideShowWidget = (name: string) => {
        if (widgetsConfig) {
            const newWidgetsConfig = widgetsConfig.map((item: IWidgetConfig) => {
                if (item.name === name) {
                    const newHidden = !item.hidden;
                    const defaultConfig = DEFAULT_WIDGETS_CONFIG.find((item) => item.name === name);
                    if (newHidden) {
                        return { ...item, config: { ...item.config, h: 2, minH: 2, maxH: 2 }, hidden: newHidden };
                    } else
                        return {
                            ...item,
                            config: {
                                ...item.config,
                                h: defaultConfig?.config.h,
                                minH: defaultConfig?.config.minH,
                                maxH: defaultConfig?.config.maxH,
                            },
                            hidden: newHidden,
                        };
                }
                return { ...item };
            });
            setWidgetsConfig(newWidgetsConfig);
        }
    };

    const reloadAllWidgetsData = () => {
        if (widgetsConfig) {
            widgetsConfig.forEach((item: IWidgetConfig) => {
                if (item.reloadData && user) dispatch(item.reloadData(user));
            });
        }
    };

    const reloadWidgetData = (item: IWidgetConfig) => {
        if (item.reloadData && user) dispatch(item.reloadData(user));
    };

    const resetWidgets = () => {
        setWidgetsConfig([...DEFAULT_WIDGETS_CONFIG]);
        localStorage.setItem('dashboard-config', JSON.stringify(DEFAULT_WIDGETS_CONFIG));
    };

    useEffect(() => {
        const storagedConfigString = localStorage.getItem('dashboard-config');
        if (storagedConfigString) {
            const storagedConfig = JSON.parse(storagedConfigString);
            const newWidgetsConfig = DEFAULT_WIDGETS_CONFIG.map((item) => {
                const foundItem = storagedConfig.find((stItem: any) => stItem.name === item.name);
                return { ...item, ...foundItem };
            });
            setWidgetsConfig([...newWidgetsConfig]);
        } else {
            setWidgetsConfig([...DEFAULT_WIDGETS_CONFIG]);
        }
    }, []);

    useEffect(() => {
        if (widgetsConfig) {
            if (!widgetPanel) reloadAllWidgetsData();
            setWidgetPanel(
                <ReactGridLayout {...gridProps} layout={widgetsConfig.map((item: IWidgetConfig) => item.config)}>
                    {createWidgetPanel({ widgetsConfig: [...widgetsConfig], hideShowWidget, reloadWidgetData, setWidgetModel })}
                </ReactGridLayout>,
            );
        }
    }, [widgetsConfig]);

    const gridProps = {
        className: 'widget-layout',
        cols: 12, // всего столбцов
        rowHeight: 30, // высота одной строки
        onLayoutChange: onLayoutChange,
    };

    return (
        <Box sx={sx.homePageInfo}>
            <Box sx={sx.dashboardButtonBlock}>
                <Button className="dashboard-btn" startIcon={<AppsIcon />} onClick={resetWidgets}>
                    Восстановить расстановку
                </Button>
                <Button className="dashboard-btn" startIcon={<LoopIcon />} onClick={reloadAllWidgetsData}>
                    Обновить данные
                </Button>
            </Box>
            {widgetsConfig ? widgetPanel : null}
        </Box>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    return { user };
};

const connector = connect(mapStateToProps);
type DashboardReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(Dashboard);
