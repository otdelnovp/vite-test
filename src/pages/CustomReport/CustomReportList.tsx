import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { AppDispatch } from 'src';

import MUIDataTable from 'mui-datatables';
import { PageTitle } from '@core/PageTitle/PageTitle';

import { userSelector } from '@services/userService';
import { RootState } from '@services/index';
import { getMUIDatatableOptions, getSortOrder } from '@helpers/dataTableHelper';

import { useListStyles } from '@pages/Dictionary/Universal/styles';
// import { alertActions } from '@services/alertService';
import { customReportColumns } from './columns';
import { customReportListSelector, getCustomReportList } from '@services/customReportService';
import { getCustomReportColumns } from './methods';

const CustomReportList = ({ user, customReportList, isLoading, rowCount }: DictionaryReduxProps) => {
    const classes = useListStyles();
    let navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const showEditPage = (current?: string) => {
        if (current) {
            navigate(`/customreport/edit/${current}`);
        } else {
            navigate(`/customreport/edit/new`);
        }
    };

    const showViewPage = (current?: string) => {
        if (current) {
            navigate(`/customreport/view/${current}`);
        }
    };

    useEffect(() => {
        dispatch(getCustomReportList());
    }, []);

    const options = {
        ...getMUIDatatableOptions({
            showEditDialog: showViewPage,
            data: customReportList,
        }),
        sortOrder: getSortOrder(customReportColumns),
        count: rowCount,
    };

    const columns = getCustomReportColumns({ columns: customReportColumns, showEditPage: showEditPage, showViewPage: showViewPage });

    return (
        <React.Fragment>
            <PageTitle title={<span>Настраиваемые отчеты</span>} />
            {/* <DataTable columns={columns} data={customReportList} options={options} showEditDialog={showViewPage} /> */}
            <MUIDataTable title={''} columns={columns} data={customReportList} options={options} />
        </React.Fragment>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { customReportList, isLoading, rowCount } = customReportListSelector(state);
    return { user, customReportList, isLoading, rowCount };
};

const connector = connect(mapStateToProps);
type DictionaryReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(CustomReportList);
