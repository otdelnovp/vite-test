import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';

import { userSelector } from '@services/userService';
import { RootState } from '@services/index';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useDictionaryStyles } from './styles';

import { dictionariesConfig } from './dictionariesConfig';
import { PageTitle } from '@core/PageTitle/PageTitle';

import { globalThemeMUI } from '@theme/main';

import CompanyList from '@pages/Dictionary/Company/CompanyList';
import CompanyElement from '@pages/Dictionary/Company/CompanyElement';

import ProjectList from './Project/ProjectList';
import ProjectElement from './Project/ProjectElement';

import UserList from './User/UserList';
import UserElement from './User/UserElement';

import UniversalList from '@pages/Dictionary/Universal/UniversalList';

import { workspaceColumns } from '@pages/Dictionary/Universal/Columns/workspaceColumns';
import { workspaceModel } from '@pages/Dictionary/Universal/Models/workspacesModel';

import { workExceptionTypeColumns } from '@pages/Dictionary/Universal/Columns/workExceptionTypeColumns';
import { workExceptionTypeModel } from '@pages/Dictionary/Universal/Models/workExceptionTypeModel';

import { taskTypeModel } from '@pages/Dictionary/Universal/Models/taskTypeModel';
import { taskTypeColumns } from '@pages/Dictionary/Universal/Columns/taskTypeColumns';

import { boardStateColumns } from './Universal/Columns/boardStateColumns';
import { boardStateModel } from './Universal/Models/boardStateModel';

import { permissionColumns } from './Universal/Columns/permissionColumns';
import { permissionModel } from './Universal/Models/permissionModel';

import { roleColumns } from './Universal/Columns/roleColumns';
import { roleModel } from './Universal/Models/roleModel';

import { userGroupColumns } from './Universal/Columns/userGroupColumns';
import { userGroupModel } from './Universal/Models/userGroupModel';

const Dictionary = ({ user }: DictionaryReduxProps) => {
    const classes = useDictionaryStyles();
    const { dictName, dictId } = useParams();

    if (dictId && dictName) {
        switch (dictName) {
            case 'company':
                return <CompanyElement companyId={dictId} />;
            case 'project':
                return <ProjectElement projectId={dictId} />;
            case 'user':
                return <UserElement userId={dictId} />;
            default:
                break;
        }
    } else if (dictName) {
        switch (dictName) {
            case 'company':
                return <CompanyList />;
            case 'project':
                return <ProjectList />;
            case 'workspace':
                return (
                    <UniversalList
                        config={{
                            apiListFunction: 'Dictionary.WorkSpaceList',
                            apiEditFunction: 'Dictionary.WorkSpaceEdit',
                            title: 'Рабочие пространства',
                            name: 'Workspaces',
                            columns: workspaceColumns,
                            model: workspaceModel,
                        }}
                    />
                );
            case 'workexceptiontype':
                return (
                    <UniversalList
                        config={{
                            apiListFunction: 'Dictionary.WorkExceptionTypeList',
                            apiEditFunction: 'Dictionary.WorkExceptionTypeEdit',
                            title: 'Виды отсутствия',
                            name: 'WorkExceptionTypes',
                            clearDictionaryName: 'workExceptionTypes',
                            columns: workExceptionTypeColumns,
                            model: workExceptionTypeModel,
                        }}
                    />
                );
            case 'tasktype':
                return (
                    <UniversalList
                        config={{
                            apiListFunction: 'Dictionary.TaskTypeList',
                            apiEditFunction: 'Dictionary.TaskTypeEdit',
                            title: 'Типы работ',
                            name: 'TaskTypes',
                            clearDictionaryName: 'taskTypes',
                            columns: taskTypeColumns,
                            model: taskTypeModel,
                        }}
                    />
                );
            case 'boardstate':
                return (
                    <UniversalList
                        config={{
                            apiListFunction: 'Dictionary.BoardStateList',
                            apiEditFunction: 'Dictionary.BoardStateEdit',
                            title: 'Состояния работ',
                            name: 'BoardStates',
                            clearDictionaryName: 'boardStates',
                            columns: boardStateColumns,
                            model: boardStateModel,
                        }}
                    />
                );
            case 'permission':
                return (
                    <UniversalList
                        config={{
                            apiListFunction: 'User.PermissionList',
                            apiEditFunction: 'User.PermissionEdit',
                            title: 'Виды разрешений',
                            name: 'Permissons',
                            clearDictionaryName: 'permissions',
                            columns: permissionColumns,
                            model: permissionModel,
                            hideDelete: true,
                        }}
                    />
                );
            case 'role':
                return (
                    <UniversalList
                        config={{
                            apiListFunction: 'User.RoleList',
                            apiEditFunction: 'User.RoleEdit',
                            title: 'Роли',
                            name: 'Roles',
                            clearDictionaryName: 'roles',
                            columns: roleColumns,
                            model: roleModel,
                            hideDelete: true,
                        }}
                    />
                );
            case 'usergroup':
                return (
                    <UniversalList
                        config={{
                            apiListFunction: 'User.GroupList',
                            apiEditFunction: 'User.GroupEdit',
                            title: 'Группы пользователей',
                            name: 'UserGroups',
                            clearDictionaryName: 'usergroups',
                            columns: userGroupColumns,
                            model: userGroupModel,
                            hideDelete: true,
                        }}
                    />
                );
            case 'user':
                return <UserList />;
            default:
                break;
        }
    }

    return (
        <Box className={classes.wrapper}>
            <PageTitle title="Справочники" />
            {dictionariesConfig.map((dictGroup) => {
                return (
                    <Box className={classes.dictGroup} key={`dictGroup${dictGroup.name}`}>
                        <Typography variant="h4">{dictGroup.label}</Typography>
                        <Box className={classes.dictList}>
                            {dictGroup.dictionaries.map((dictItem) => {
                                return (
                                    <Link
                                        key={`dictLink${dictItem.name}`}
                                        to={`/dictionary/${dictItem.path}`}
                                        className={dictItem.disabled ? classes.dictDisabled : undefined}
                                    >
                                        <Button
                                            key={dictItem.path}
                                            className={classes.dict}
                                            sx={{
                                                '& svg, p': {
                                                    ...(globalThemeMUI.palette.mode === 'dark' && { color: globalThemeMUI.palette.primary.dark }),
                                                },
                                            }}
                                        >
                                            {dictItem.icon}
                                            <span>{dictItem.label}</span>
                                        </Button>
                                    </Link>
                                );
                            })}
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    return { user };
};

const connector = connect(mapStateToProps);
type DictionaryReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(Dictionary);

