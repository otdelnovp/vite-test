import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from 'src';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { Loader } from '@core/Loader/Loader';
import UniversalForm from '@core/UniversalForm/UniversalForm';
import { MuiTabs } from '@core/Tabs/MuiTabs';
import { IMuiTab } from '@core/Tabs/methods';
import { checkFormFullfilled } from '@core/UniversalForm/methods';

import { alertActions } from '@services/alertService';
import { clearDictionary, getDepartments } from '@services/dictionaryService';
import { editDictionaryElement, getDictionaryElement } from '@services/dictionaryEditService';
import { useEffectOnce } from '@hooks/useEffectOnce';

import { IUserElement, userModel } from './model';
import { useElementStyles } from '@pages/Dictionary/Universal/styles';
import RoleList from './Role/RoleList';
import GroupList from './Group/GroupList';
import { prepareUserEditData } from './methods';

interface IUserElementForm {
    userId: string;
}

const UserElement = ({ userId }: IUserElementForm) => {
    const dispatch = useDispatch<AppDispatch>();
    const classes = useElementStyles();
    const navigate = useNavigate();

    const [changed, setChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [body, setBody] = useState({} as IUserElement);

    const onFieldChange = (name: string, value: any) => {
        let newBody = { ...body, [name]: value };
        if (name === 'org_id') {
            dispatch(getDepartments({ CompanyId: value }));
        }
        setBody(newBody);
        setChanged(true);
    };

    const handleSubmit = () => {
        const validationErrorMsg = checkFormFullfilled(userModel, body);
        if (!validationErrorMsg) {
            setIsLoading(true);
            dispatch(
                editDictionaryElement('User.Edit', prepareUserEditData(body), {
                    onSuccess: (res) => {
                        if (res.Updated || res.Created) {
                            dispatch(clearDictionary({ name: 'users' }));
                            dispatch(alertActions.alertSuccess({ message: 'Успешно записано.' }));
                            const newId = res.Updated ? res.Updated : res.Created;
                            navigate(`/dictionary/user/${newId}`);
                            setBody({ ...body, id: newId });
                        }
                        setIsLoading(false);
                    },
                    onError: (res) => {
                        setIsLoading(false);
                    },
                }),
            );
        } else {
            dispatch(alertActions.alertError({ message: validationErrorMsg }));
        }
    };

    const onChangeTable = (tableName: string, newTableData: any[]): void => {
        const newBody = { ...body, [tableName]: newTableData };
        setBody(newBody);
        setChanged(true);
    };

    const onDeleteRoleList = (rowId: string): void => {
        const newRoles = body.user_roles.filter((item) => item.role_id !== rowId);
        const newBody = { ...body, user_roles: newRoles };
        setBody(newBody);
        setChanged(true);
    };

    const onDeleteGroupList = (rowId: string): void => {
        const newGroups = body.user_groups.filter((item) => item.group_id !== rowId);
        const newBody = { ...body, user_groups: newGroups };
        setBody(newBody);
        setChanged(true);
    };

    useEffectOnce(() => {
        if (userId !== 'new') {
            setIsLoading(true);
            dispatch(
                getDictionaryElement('User.Get', userId, {
                    onSuccess: (res) => {
                        setBody(res);
                        setIsLoading(false);
                    },
                    onError: (res) => {
                        setIsLoading(false);
                    },
                }),
            );
        } else {
            setIsLoading(false);
        }
    });

    useEffect(() => {
        if (body.org_id) {
            dispatch(getDepartments({ CompanyId: body.org_id }));
        }
    }, [body.org_id]);

    const pageTitle = body.id ? 'Редактирование пользователя' : 'Добавление пользователя';

    const tabList: IMuiTab[] = [
        {
            index: 0,
            label: 'Основное',
            children: (
                <Paper>
                    <Box className={classes.formBox}>
                        <UniversalForm data={body} onFieldChange={onFieldChange} model={userModel} onSubmit={handleSubmit} />
                    </Box>
                </Paper>
            ),
        },
        {
            index: 1,
            label: 'Роли',
            children: (
                <RoleList
                    companyId={body.org_id}
                    userId={body?.id}
                    listData={body?.user_roles}
                    onChange={(newListData) => onChangeTable('user_roles', newListData)}
                    onDelete={(rowId) => onDeleteRoleList(rowId)}
                />
            ),
        },
        {
            index: 2,
            label: 'Группы',
            children: (
                <GroupList
                    companyId={body.org_id}
                    userId={body?.id}
                    listData={body?.user_groups}
                    onChange={(newListData) => onChangeTable('user_groups', newListData)}
                    onDelete={(rowId) => onDeleteGroupList(rowId)}
                />
            ),
        },
    ];

    return (
        <React.Fragment>
            <Box className={classes.header}>
                <Box className={classes.pageTitle}>
                    <Typography component="h1" variant="h1">
                        <Link to="/dictionary">Справочники</Link> &#8250; <Link to="/dictionary/user">Пользователи</Link> &#8250; {pageTitle}
                    </Typography>
                </Box>
                <Box>
                    <Button sx={{ marginRight: '8px' }} onClick={handleSubmit} disabled={!changed} variant="contained">
                        Сохранить
                    </Button>
                </Box>
            </Box>
            <Box className={classes.tabBox}>
                {isLoading || !body ? (
                    <Loader />
                ) : (
                    <form className={classes.editForm}>
                        <MuiTabs list={tabList} gutterBottom={true} />
                    </form>
                )}
            </Box>
        </React.Fragment>
    );
};

export default UserElement;
