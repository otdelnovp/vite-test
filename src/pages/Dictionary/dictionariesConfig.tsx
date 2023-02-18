import React from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import BadgeIcon from '@mui/icons-material/Badge';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

export interface IDictionary {
    name: string;
    path: string;
    label: string;
    disabled: boolean;
    idField: string;
    icon: JSX.Element;
}

export interface IDictionaryGroup {
    label: string;
    name: string;
    dictionaries: IDictionary[];
}

export const dictionariesConfig: IDictionaryGroup[] = [
    {
        label: 'Общие',
        name: 'common_group',
        dictionaries: [
            {
                name: 'Companies',
                path: 'company',
                label: 'Организации',
                disabled: false,
                idField: 'CompanyId',
                icon: <BusinessIcon />,
            },
            {
                name: 'Projects',
                path: 'project',
                label: 'Проекты',
                disabled: false,
                idField: 'Id',
                icon: <BookIcon />,
            },
            {
                name: 'Workspaces',
                path: 'workspace',
                label: 'Рабочие пространства',
                disabled: false,
                idField: 'Id',
                icon: <WorkspacesIcon />,
            },
            {
                name: 'WorkExceptionTypes',
                path: 'workexceptiontype',
                label: 'Виды отсутствия',
                disabled: false,
                idField: 'Id',
                icon: <BeachAccessIcon />,
            },
        ],
    },
    {
        label: 'Работы',
        name: 'task_group',
        dictionaries: [
            {
                name: 'TaskTypes',
                path: 'tasktype',
                label: 'Типы работ',
                disabled: false,
                idField: 'Id',
                icon: <TaskAltIcon />,
            },
            {
                name: 'BoardStates',
                path: 'boardstate',
                label: 'Состояния работ',
                disabled: false,
                idField: 'Id',
                icon: <ViewKanbanIcon />,
            },
        ],
    },
    {
        label: 'Управление доступом',
        name: 'user_group',
        dictionaries: [
            {
                name: 'Users',
                path: 'user',
                label: 'Пользователи',
                disabled: false,
                idField: 'id',
                icon: <PeopleIcon />,
            },
            {
                name: 'Permissons',
                path: 'permission',
                label: 'Виды разрешений',
                disabled: false,
                idField: 'id',
                icon: <RecentActorsIcon />,
            },
            {
                name: 'Roles',
                path: 'role',
                label: 'Роли',
                disabled: false,
                idField: 'id',
                icon: <BadgeIcon />,
            },
            {
                name: 'UserGroups',
                path: 'usergroup',
                label: 'Группы пользователей',
                disabled: false,
                idField: 'id',
                icon: <PeopleOutlineIcon />,
            },
        ],
    },
];

