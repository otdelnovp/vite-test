import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { AppDispatch } from 'src';

import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

import DataTable from '@core/DataTable/DataTable';
import { PageTitle } from '@core/PageTitle/PageTitle';
import { Box, IconButton, Typography } from '@mui/material';

import { userSelector } from '@services/userService';
import { RootState } from '@services/index';
import { getDictionaryList, dictionaryListSelector, editDictionaryElement, setDictionaryList } from '@services/dictionaryEditService';
import { getMUIDatatableOptions, getSortOrder } from '@helpers/dataTableHelper';

import { projectColumns } from './columns';
import ProjectListFilter from './ProjectListFilter/ProjectListFilter';
import { IProjectListFilter, projectListFilterInit, projectListFilterModel } from './ProjectListFilter/model';
import { checkFilterFullfilled } from './ProjectListFilter/methods';

import { useListStyles } from '../Universal/styles';
import { alertActions } from '@services/alertService';

const page_size = 10;

const ProjectList = ({ user, listData, isLoading, isError, isSuccess, rowCount }: DictionaryReduxProps) => {
    const classes = useListStyles();
    const dispatch = useDispatch<AppDispatch>();
    let navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(0);
    const [filter, setFilter] = useState<IProjectListFilter>({ ...projectListFilterInit });

    const showEditDialog = (current?: string) => {
        if (current) {
            navigate(`/dictionary/project/${current}`);
        } else {
            navigate(`/dictionary/project/new`);
        }
    };

    const onSetFilter = (newFilter: IProjectListFilter) => {
        setFilter(newFilter);
    };

    useEffect(() => {
        if (checkFilterFullfilled(filter, projectListFilterModel)) {
            dispatch(
                getDictionaryList('Dictionary.ProjectList', user, { params: { page_size: page_size, page_number: currentPage + 1, ...filter } }),
            );
        }
    }, [filter]);

    const changePage = (newPage: number) => {
        if (checkFilterFullfilled(filter, projectListFilterModel)) {
            dispatch(getDictionaryList('Dictionary.ProjectList', user, { params: { page_size: page_size, page_number: newPage + 1, ...filter } }));
        }
        setCurrentPage(newPage);
    };

    const onDeleteConfirm = (id: string, isDeleted: boolean) => {
        dispatch(
            editDictionaryElement(
                'Dictionary.ProjectEdit',
                { Id: id, IsDeleted: isDeleted },
                {
                    onSuccess: (res) => {
                        if (res.Id) {
                            dispatch(alertActions.alertSuccess({ message: 'Успешно записано.' }));
                            const newListData = listData.map((listItem: any) => {
                                if (listItem.Id !== id) return listItem;
                                return { ...listItem, IsDeleted: isDeleted };
                            });
                            dispatch(setDictionaryList(newListData));
                        }
                    },
                },
            ),
        );
    };

    const options = {
        ...getMUIDatatableOptions({
            showEditDialog: showEditDialog,
            data: listData,
            serverPagination: true,
            changePage: changePage,
            pageSize: page_size,
        }),
        sortOrder: getSortOrder(projectColumns),
        count: rowCount,
        page: currentPage,
    };
    const newColumns = [
        ...projectColumns,
        {
            name: 'Id',
            label: 'СДР',
            options: {
                filter: false,
                searchable: false,
                sort: false,
                viewColumns: false,
                setCellProps: () => ({ style: { width: 50 } }),
                customBodyRender: (value: string) => (
                    <Tooltip title="Перейти к плану СДР">
                        <IconButton onClick={() => navigate(`/sdrplan/list/${value}`)}>
                            <AccountTreeIcon className={classes.listAction} />
                        </IconButton>
                    </Tooltip>
                ),
            },
        },
    ];

    return (
        <React.Fragment>
            <PageTitle
                title={
                    <span>
                        <Link to="/dictionary">Справочники</Link> &#8250; Проекты
                    </span>
                }
            />
            <ProjectListFilter user={user} filter={filter} filterModel={projectListFilterModel} onSetFilter={onSetFilter} />
            {checkFilterFullfilled(filter, projectListFilterModel) ? (
                <DataTable columns={newColumns} data={listData} options={options} showEditDialog={showEditDialog} onDeleteConfirm={onDeleteConfirm} />
            ) : (
                <Typography variant="subtitle1">Заполните все обязательные поля фильтра (отмечены красным).</Typography>
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

export default compose(connector)(ProjectList);

