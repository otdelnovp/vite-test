import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { AppDispatch } from 'src';

import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

import DataTable from '@core/DataTable/DataTable';
import { PageTitle } from '@core/PageTitle/PageTitle';

import { userSelector } from '@services/userService';
import { RootState } from '@services/index';
import { getMUIDatatableOptions, getSortOrder } from '@helpers/dataTableHelper';

import WeeklyReportListFilter from './WeeklyReportListFilter/WeeklyReportListFilter';
import { weeklyReportColumns } from './columns';
import { addWeeklyReportState, getWeeklyReportList, weeklyReportListSelector } from '@services/weeklyReportService';
import { checkFilterFullfilled } from './WeeklyReportListFilter/methods';
import { IWeeklyReportListFilter, weeklyReportListFilterInit, weeklyReportListFilterModel } from './WeeklyReportListFilter/model';
import { useListStyles } from '../Dictionary/Universal/styles';
import { alertActions } from '@services/alertService';

const page_size = 10;

const WeeklyReportList = ({ user, weeklyReportList, isLoading, rowCount }: DictionaryReduxProps) => {
    const classes = useListStyles();
    const dispatch = useDispatch<AppDispatch>();
    let navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(0);
    const [filter, setFilter] = useState<IWeeklyReportListFilter>({ ...weeklyReportListFilterInit });

    const showEditDialog = (current?: string) => {
        if (current) {
            navigate(`/weeklyreport/${current}`);
        } else {
            let params = new URLSearchParams();
            if (filter.CompanyId) params.set('org_id', filter.CompanyId);
            if (filter.WorkerId) params.set('worker_id', filter.WorkerId);
            if (filter.CompanyId || filter.WorkerId) {
                navigate(`/weeklyreport/new?${params.toString()}`);
            } else {
                navigate(`/weeklyreport/new`);
            }
        }
    };

    useEffect(() => {
        reloadList();
    }, [filter]);

    const reloadList = () => {
        if (checkFilterFullfilled(filter, weeklyReportListFilterModel)) {
            dispatch(getWeeklyReportList(filter, { page_size: page_size, page_number: currentPage + 1 }));
        }
    };

    const changePage = (newPage: number) => {
        if (checkFilterFullfilled(filter, weeklyReportListFilterModel)) {
            dispatch(getWeeklyReportList(filter, { page_size: page_size, page_number: newPage + 1 }));
        }
        setCurrentPage(newPage);
    };

    const onSetFilter = (newFilter: IWeeklyReportListFilter) => {
        setFilter(newFilter);
    };

    const options = {
        ...getMUIDatatableOptions({
            showEditDialog: showEditDialog,
            data: weeklyReportList,
            serverPagination: true,
            changePage: changePage,
            pageSize: page_size,
        }),
        sortOrder: getSortOrder(weeklyReportColumns),
        count: rowCount,
        page: currentPage,
    };

    const onAgreementClick = (Id: string) => {
        const addBody = {
            WeeklyReportId: Id,
            Comment: '',
            State: 'A',
            UserId: user?.UserId || '',
        };
        dispatch(
            addWeeklyReportState(addBody, {
                onSuccess: () => {
                    reloadList();
                },
            }),
        );
    };

    const newColumns = [
        ...weeklyReportColumns,
        {
            name: 'Id',
            label: ' ',
            options: {
                filter: false,
                searchable: false,
                sort: false,
                viewColumns: false,
                setCellProps: () => ({ style: { width: 50 } }),
                customBodyRender: (value: string) => {
                    const currentRow = weeklyReportList.find((item) => item.Id === value);
                    return (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row-reverse',
                            }}
                        >
                            {/* <Tooltip title="Редактировать">
                                <Link to={`/weeklyreport/${value}`}>
                                    <EditIcon className={classes.listAction} />
                                </Link>
                            </Tooltip> */}
                            {currentRow && currentRow.State === 'R' && (
                                <Tooltip title="Согласовать отчет">
                                    <AssignmentTurnedInIcon className={classes.listAction} onClick={() => onAgreementClick(value)} />
                                </Tooltip>
                            )}
                        </Box>
                    );
                },
            },
        },
    ];

    return (
        <React.Fragment>
            <PageTitle title={<span>Еженедельные отчеты</span>} />
            <WeeklyReportListFilter user={user} filter={filter} filterModel={weeklyReportListFilterModel} onSetFilter={onSetFilter} />
            {checkFilterFullfilled(filter, weeklyReportListFilterModel) ? (
                <DataTable columns={newColumns} data={weeklyReportList} options={options} showEditDialog={showEditDialog} />
            ) : (
                <Typography variant="subtitle1">Заполните все обязательные поля фильтра (отмечены красным).</Typography>
            )}
        </React.Fragment>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { weeklyReportList, isLoading, rowCount } = weeklyReportListSelector(state);
    return { user, weeklyReportList, isLoading, rowCount };
};

const connector = connect(mapStateToProps);
type DictionaryReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(WeeklyReportList);
