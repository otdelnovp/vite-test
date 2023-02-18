import React, { useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../index';
import { compose } from 'redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import { RootState } from '@services/index';
import { userSelector } from '@services/userService';
import { getCompanyUsers } from '@services/dictionaryService';
import {
    getUserList,
    getUserListCount,
    resetUserList,
    setUserListFilters,
    resetUserListFilters,
    resetPager,
    getUser,
    setUser,
    editUser,
    lkSelector,
} from '@services/lkService';
import { userRoles, userPositions } from '@helpers/dictionariesHelper';
import { getParamByName, phoneMask } from '@helpers/methods';

import { Loader } from '@core/Loader/Loader';
import UniversalInput from '@core/UniversalInput/UniversalInput';
import { SelectInput } from '@core/UniversalInput/SelectInput';
import { UserEdit } from './UserEdit';
import UserPager from './UserPager';

import { IUserData, IUserFilters, defaultUserFilters, ILkPager, defaultLkPager, userColumns } from '@pages/Lk/methods';
import { useLkStyles } from '@pages/Lk/styles';

const UserList = ({ user, userList, isLoadingList, count, pager, userFilters, userItem, isLoadingItem }: UserListReduxProps) => {
    const classes = useLkStyles();
    const dispatch = useDispatch<AppDispatch>();

    const [filters, changeFilters] = useState(defaultUserFilters);
    React.useEffect(() => {
        changeFilters(userFilters);
    }, [userFilters]);
    const onFilterChange = (event: any) => {
        const { name, value } = event.target;
        changeFilters({ ...filters, [name]: value });
    };

    const onResetUserList = () => dispatch(resetUserList());
    const onResetUserListFilters = () => dispatch(resetUserListFilters());
    const onResetPager = () => dispatch(resetPager());

    const onGetUserList = (newFilters: IUserFilters = filters, newPager: ILkPager = defaultLkPager) =>
        dispatch(getUserList(user?.CompanyId, newFilters, newPager));
    const onGetUserListCount = (newFilters: IUserFilters = filters, newPager: ILkPager = defaultLkPager) =>
        dispatch(getUserListCount(user?.CompanyId, newFilters, newPager));

    const onSetUserListFilters = (newFilters: IUserFilters = defaultUserFilters) => {
        if (JSON.stringify(newFilters) !== JSON.stringify(userFilters)) dispatch(setUserListFilters(newFilters));
        if (pager?.Offset) onResetPager();
        onGetUserListCount(newFilters);
    };

    React.useEffect(() => {
        if (count > 0) onGetUserList(userFilters, pager);
    }, [pager]);

    React.useEffect(() => {
        if (count > 0) onGetUserList(userFilters, pager);
        else if (userList?.length) onResetUserList();
    }, [count]);

    React.useEffect(() => {
        onSetUserListFilters();
        return () => {
            onResetUserListFilters();
            onResetPager();
        };
    }, []);

    const onSearch = (event: any) => {
        event.preventDefault();
        onSetUserListFilters(filters);
    };

    // добавление сотрудника

    const [editVisible, setEditVisible] = useState(false);
    const showEditDialog = (current?: IUserData) => {
        if (current) dispatch(getUser(current?.UserId));
        else
            dispatch(
                setUser({
                    CompanyId: user?.CompanyId,
                    IsEmployee: true,
                }),
            );
        setEditVisible(true);
    };
    const closeEditDialog = () => {
        setEditVisible(false);
        dispatch(setUser(null));
    };

    const onSaveUser = (newUser: any) => {
        dispatch(
            editUser(newUser, {
                onSuccess: () => {
                    onSetUserListFilters(userFilters);
                    dispatch(getCompanyUsers({ org_id: user?.CompanyId }));
                },
            }),
        );
        closeEditDialog();
    };

    return (
        <React.Fragment>
            <Paper>
                <Box className={classes.filters}>
                    <Grid container spacing={4} alignItems="flex-end">
                        <Grid item xs={12} md={9}>
                            <form className={classes.filtersForm}>
                                <Grid container spacing={4} alignItems="flex-end">
                                    <Grid item xs={12} md={6}>
                                        <UniversalInput
                                            name="UserName"
                                            placeholder="Поиск по имени"
                                            value={filters.UserName}
                                            onChange={onFilterChange}
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <SelectInput
                                            name="PositionCode"
                                            value={filters.PositionCode || ''}
                                            options={[
                                                { id: 'null', value: 'null', text: 'Должность не выбрана' },
                                                ...userPositions.map((position) => ({
                                                    id: position.Code,
                                                    value: position.Code,
                                                    text: position.Name,
                                                })),
                                            ]}
                                            onChange={onFilterChange}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <ButtonGroup fullWidth>
                                <Button variant="contained" startIcon={<SearchIcon />} onClick={onSearch}>
                                    Искать
                                </Button>
                                <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => showEditDialog()}>
                                    Добавить
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Box>
                <Box className={classes.list}>
                    {isLoadingList ? (
                        <Loader />
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {userColumns.map((column) => (
                                            <TableCell key={column.field}>{column.headerName}</TableCell>
                                        ))}
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                {userList && userList.length ? (
                                    <TableBody>
                                        {userList.map((row: IUserData) => (
                                            <TableRow key={row.UserId}>
                                                <TableCell>
                                                    <b>{row.UserName || '–'}</b>
                                                </TableCell>
                                                <TableCell>
                                                    {row.Roles?.map((role) => getParamByName(userRoles, role, 'Code', 'Name')).join(', ')}
                                                </TableCell>
                                                <TableCell>{row.PositionName || '–'}</TableCell>
                                                <TableCell>{phoneMask(row.Phone) || '–'}</TableCell>
                                                <TableCell align="right">
                                                    <Tooltip title="Редактировать данные сотрудника">
                                                        <EditIcon onClick={() => showEditDialog(row)} className={classes.listAction} />
                                                    </Tooltip>
                                                    {/* <Tooltip title="Удалить сотрудника">
                                                        <DeleteForeverIcon onClick={() => {if (row?.UserId) console.log(row.UserId)}} className={classes.listAction} />
                                                    </Tooltip> */}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                ) : (
                                    <caption>Сотрудники не найдены...</caption>
                                )}
                            </Table>
                        </TableContainer>
                    )}
                </Box>
                <Box className={classes.footer}>
                    <UserPager />
                </Box>
            </Paper>
            {editVisible && (
                <UserEdit
                    onSave={onSaveUser}
                    onClose={closeEditDialog}
                    userItem={{ ...userItem, CompanyId: user?.CompanyId }}
                    isLoadingItem={isLoadingItem}
                />
            )}
        </React.Fragment>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { userList, isLoadingList, count, pager, userFilters, userItem, isLoadingItem } = lkSelector(state);
    return { user, userList, isLoadingList, count, pager, userFilters, userItem, isLoadingItem };
};

const connector = connect(mapStateToProps);
type UserListReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(UserList);
