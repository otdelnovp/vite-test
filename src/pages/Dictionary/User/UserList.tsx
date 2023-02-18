import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { AppDispatch } from 'src';

import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';

import DataTable from '@core/DataTable/DataTable';
import { PageTitle } from '@core/PageTitle/PageTitle';
import AutocompleteInput from '@core/UniversalInput/AutocompleteInput';

import { userSelector } from '@services/userService';
import { RootState } from '@services/index';
import { getDictionaryList, dictionaryListSelector } from '@services/dictionaryEditService';
import { getMUIDatatableOptions, getSortOrder } from '@helpers/dataTableHelper';

import { useListStyles } from '../Universal/styles';
import { userColumns } from './columns';
import { IUserListFilter, userListFilterInit, userListFilterModel } from './UserListFilter/model';
import UserListFilter from './UserListFilter/UserListFilter';
import { checkFilterFullfilled } from './UserListFilter/methods';

const page_size = 10;

const UserList = ({ user, listData, isLoading, isError, isSuccess, rowCount }: DictionaryReduxProps) => {
    const classes = useListStyles();
    const dispatch = useDispatch<AppDispatch>();
    let navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(0);
    const [filter, setFilter] = useState<IUserListFilter>({ ...userListFilterInit });

    const showEditDialog = (current?: string) => {
        if (current) {
            navigate(`/dictionary/user/${current}`);
        } else {
            navigate(`/dictionary/user/new`);
        }
    };

    useEffect(() => {
        if (checkFilterFullfilled(filter, userListFilterModel)) {
            dispatch(getDictionaryList('User.List', user, { params: { page_size: page_size, page_number: currentPage + 1, org_id: filter.CompanyId } }));
        }
    }, [filter]);

    const changePage = (newPage: number) => {
        dispatch(getDictionaryList('User.List', user, { params: { page_size: page_size, page_number: newPage + 1, org_id: filter.CompanyId } }));
        setCurrentPage(newPage);
    };

    const onSetFilter = (newFilter: IUserListFilter) => {
        setFilter(newFilter);
    };

    const options = {
        ...getMUIDatatableOptions({
            showEditDialog: showEditDialog,
            data: listData,
            serverPagination: true,
            changePage: changePage,
            pageSize: page_size,
        }),
        sortOrder: getSortOrder(userColumns),
        count: rowCount,
        page: currentPage,
    };

    return (
        <React.Fragment>
            <PageTitle
                title={
                    <span>
                        <Link to="/dictionary">Справочники</Link> &#8250; Пользователи
                    </span>
                }
            />
            <UserListFilter user={user} filter={filter} filterModel={userListFilterModel} onSetFilter={onSetFilter} />
            {checkFilterFullfilled(filter, userListFilterModel) ? (
                <DataTable columns={userColumns} data={listData} options={options} showEditDialog={showEditDialog} idColumnName="id"/>
            ) : (
                <Typography variant="subtitle1">Выберите компанию для просмотра списка пользователей.</Typography>
            )}
        </React.Fragment>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { listData, isLoading, isError, isSuccess, rowCount } = dictionaryListSelector(state);
    return { user, listData, isLoading, isError, isSuccess, rowCount };
};

const connector = connect(mapStateToProps);
type DictionaryReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(UserList);
