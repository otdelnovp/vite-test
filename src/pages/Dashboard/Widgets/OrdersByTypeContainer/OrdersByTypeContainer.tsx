import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import { dashboardSelector } from '@services/dashboardService';
import { RootState } from '@services/index';
import { orderTypes } from '@helpers/dictionariesHelper';
import { getDatesForRequest, getModifiedTableChartData, getSimpleChart } from '@pages/Dashboard/methods';

import { sx } from './styles';

interface IOrdersByTypeContainerProps extends ReduxProps {
    setWidgetModel: any;
    widgetName: string;
    hidden: boolean;
}

const OrdersByTypeContainer = (props: IOrdersByTypeContainerProps) => {
    const { orders, isLoading, hidden } = props;
    let tableData = getModifiedTableChartData(orders, orderTypes);
    const { endOfDay, startOfMonth } = getDatesForRequest();

    const title = hidden
        ? 'Работы по типам в текущем месяце'
        : `Работы по типам в текущем месяце (с ${startOfMonth.format('D MMMM')} по ${endOfDay.format('D MMMM')})`;

    return getSimpleChart({
        isLoading,
        title,
        hidden,
        chartContent: (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={sx.tableCell}>Тип работы</TableCell>
                        <TableCell sx={{ ...sx.tableCell, textAlign: 'center' }}>Число работ</TableCell>
                        <TableCell sx={{ ...sx.tableCell, textAlign: 'center' }}>Выполнено</TableCell>
                        <TableCell sx={{ ...sx.tableCell, textAlign: 'center' }}>Процент исполнения</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((tableRow: any) => {
                        return (
                            <TableRow>
                                <TableCell sx={sx.tableCell}>{tableRow.OrderTypeName}</TableCell>
                                <TableCell sx={{ ...sx.tableCell, textAlign: 'center' }}>{tableRow.OrdersCounter}</TableCell>
                                <TableCell sx={{ ...sx.tableCell, textAlign: 'center' }}>{tableRow.ReadyCounter}</TableCell>
                                <TableCell sx={{ ...sx.tableCell, textAlign: 'center' }}>{tableRow.ReadyPercent}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        ),
    });
};

const mapStateToProps = (state: RootState, props: any) => {
    const { ordersByType, loadingWidgets, updateLayoutNames } = dashboardSelector(state);
    return {
        orders: ordersByType,
        isLoading: loadingWidgets.indexOf(props.widgetName) !== -1,
        needUpdate: updateLayoutNames && updateLayoutNames.length && updateLayoutNames.indexOf(props.widgetName) !== -1,
    };
};

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(OrdersByTypeContainer);

