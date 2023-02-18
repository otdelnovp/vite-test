import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';

import { Box } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

import { Loader } from '@core/Loader/Loader';
import { userSelector } from '@services/userService';
import { dashboardSelector } from '@services/dashboardService';
import { RootState } from '@services/index';

interface IOrdersCreatedToday extends ReduxProps {
    widgetName: string;
    hidden: boolean;
}
const OrdersCompletedToday = (props: IOrdersCreatedToday) => {
    const { isLoading, orders, hidden } = props;
    return (
        <Box className={`widget-inner-block widget-small-panel${hidden ? ' hidden' : ''}`}>
            <h3 className="widget-title">Зарегистрировано сегодня</h3>
            <Box className="widget-content">
                {isLoading ? (
                    <Box className="widget-panel">
                        <Loader />
                    </Box>
                ) : (
                    <Box className="widget-panel">
                        <DescriptionIcon sx={{ fontSize: '4em' }} />
                        <Box className="widget-content">
                            <Box className="widget-value">{orders}</Box>
                            <Box className="widget-description">Запланировано и выполнено сегодня</Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

const mapStateToProps = (state: RootState, props: any) => {
    const { user } = userSelector(state);
    const { ordersByStateOneDayTotal, loadingWidgets, initHomePage, updateLayoutNames } = dashboardSelector(state);
    return {
        user,
        orders: ordersByStateOneDayTotal,
        isLoading: loadingWidgets.indexOf(props.widgetName) !== -1,
        initHomePage,
        needUpdate: updateLayoutNames && updateLayoutNames.length && updateLayoutNames.indexOf(props.widgetName) !== -1,
    };
};

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(OrdersCompletedToday);
