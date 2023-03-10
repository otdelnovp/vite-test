import React from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
//import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeOutlined from '@mui/icons-material/AccountTreeOutlined';
import BusinessCenter from '@mui/icons-material/BusinessCenter';
import BusinessCenterOutlined from '@mui/icons-material/BusinessCenterOutlined';
import LocalShipping from '@mui/icons-material/LocalShipping';
import MenuBook from '@mui/icons-material/MenuBook';
import SettingsApplications from '@mui/icons-material/SettingsApplications';
//import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
//import GitHubIcon from '@mui/icons-material/GitHub';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ForumIcon from '@mui/icons-material/Forum';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MonitorIcon from '@mui/icons-material/Monitor';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SchoolIcon from '@mui/icons-material/School';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import PunchClockIcon from '@mui/icons-material/PunchClock';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import TableChartIcon from '@mui/icons-material/TableChart';

export interface IMenuItem {
    title: string;
    href: string;
    type: string;
    icon: JSX.Element;
    disabled: boolean;
}

export const sidebarItems: IMenuItem[] = [
    {
        title: '??????????????',
        href: '/account/profile',
        type: 'PROFILE',
        icon: <AccountBoxIcon />,
        disabled: true,
    },
    {
        title: '???????????????????????????????? ??????????????????',
        href: '/calendar-production',
        type: 'CALENDAR_PROD',
        icon: <CalendarMonthIcon />,
        disabled: false,
    },
    {
        title: '?????????????????? ??????????????????',
        href: '/work-exception',
        type: 'WORK_EXC',
        icon: <DateRangeIcon />,
        disabled: false,
    },
    {
        title: '????????????',
        href: '/tasks/kanban',
        type: 'TASKSKANBAN',
        icon: <FeaturedPlayListIcon />,
        disabled: false,
    },
    // {
    //     title: '???????????????????????? ??????????',
    //     href: '/workedtime',
    //     type: 'WORKEDTIME',
    //     icon: <PunchClockIcon />,
    //     disabled: false,
    // },
    {
        title: '???????????????????????? ??????????',
        href: '/worked-time',
        type: 'WORKED_TIME',
        icon: <PunchClockIcon />,
        disabled: false,
    },
    {
        title: '???????????????????????? ????????????',
        href: '/weeklyreport',
        type: 'WEEKLYREPORT',
        icon: <CalendarViewWeekIcon />,
        disabled: false,
    },
    // {
    //     title: '????????????????????????',
    //     href: '/configurator',
    //     type: 'CONFIGURATOR',
    //     icon: <SettingsApplications />,
    //     disabled: false,
    // },
    {
        title: '?????? ????????????????????',
        href: '/myActivities/wbsWorks',
        type: 'MY_TASKS',
        icon: <ListAltIcon />,
        disabled: true,
    },
    {
        title: '?????? ????????????????',
        href: '/user_actions',
        type: 'MY_ACTIONS',
        icon: <ChromeReaderModeIcon />,
        disabled: true,
    },
    {
        title: '??????????????????????????????????',
        href: '/admin/ ',
        type: 'ADMINISTRATION',
        icon: <DashboardIcon />,
        disabled: true,
    },
    {
        title: '???????????????????? ??????????????????????',
        href: '/change_tasks',
        type: 'CHANGES',
        icon: <AssignmentLateIcon />,
        disabled: true,
    },
    {
        title: '????????????????????????',
        href: '/coDevelopment',
        type: 'CDEV',
        icon: <AssignmentIcon />,
        disabled: true,
    },
    {
        title: '????????????????',
        href: '/supply',
        type: 'SUPP',
        icon: <LocalShipping />,
        disabled: true,
    },
    // {
    //     title: '??????????????',
    //     href: '/boms',
    //     type: 'BOM',
    //     icon: <SettingsApplications />,
    // },
    // {
    //     title: '??????????',
    //     href: '/audit',
    //     type: 'AUDIT',
    //     icon: <VerifiedUserIcon />,
    // },
    // {
    //     title: '????????????????????',
    //     href: '/requirements',
    //     type: 'REQUIREMENTS',
    //     icon: <PlaylistAddCheckIcon />,
    // },
    {
        title: '??????????????????????',
        href: '/dictionary',
        type: 'DICTIONARY',
        icon: <MenuBook />,
        disabled: false,
    },
    {
        title: '?????????????? ??????',
        href: '/wbs/list/templates',
        type: 'WBS_TEMPLATE',
        icon: <AccountTreeOutlined />,
        disabled: true,
    },
    {
        title: '?????????? ??????',
        href: '/wbs/list/instances',
        type: 'WBS',
        icon: <AccountTreeIcon />,
        disabled: true,
    },
    {
        title: '???????????????????? workflow',
        href: '/workflow-editor',
        type: 'WORKFLOW_TEMPLATE',
        icon: <BusinessCenterOutlined />,
        disabled: true,
    },
    {
        title: 'Workflow',
        href: '/workflow/templates',
        type: 'WORKFLOW',
        icon: <BusinessCenter />,
        disabled: true,
    },
    {
        title: '???????????????? ????????????',
        href: '/filestorage',
        type: 'FILESTORAGE',
        icon: <DescriptionIcon />,
        disabled: true,
    },
    {
        title: '???????? ??????????????',
        href: '/metodologies-bank',
        type: 'METODOLOGIES_BANK',
        icon: <WorkOutlineIcon />,
        disabled: true,
    },
    {
        title: '????????????????????????',
        href: '/normative-documentation',
        type: 'NORMATIVE_DOCUMENTATION',
        icon: <LibraryBooksIcon />,
        disabled: true,
    },
    // {
    //     title: '???????????????????? ???????????????? ?????????????????? ????????',
    //     href: '/source-code',
    //     type: 'SOURCE_CODE_VERSION_CONTROL',
    //     icon: <GitHubIcon />,
    // },
    {
        title: '??????????????????????',
        href: '/marketplace',
        type: 'MARKETPLACE',
        icon: <ShoppingBasketIcon />,
        disabled: true,
    },
    {
        title: '??????????',
        href: '/forum',
        type: 'FORUM',
        icon: <ForumIcon />,
        disabled: true,
    },
    {
        title: '???????????????????? ????????????????????',
        href: '/cost-management',
        type: 'COST_MANAGEMENT',
        icon: <AttachMoneyIcon />,
        disabled: true,
    },
    {
        title: '???????????????????????? ????????????????',
        href: '/product-configurator',
        type: 'PRODUCT_CONFIGURATOR',
        icon: <SettingsIcon />,
        disabled: true,
    },
    {
        title: '?????????????? ????????????????????????',
        href: '/dashboard',
        type: 'MONITOR',
        icon: <MonitorIcon />,
        disabled: false,
    },
    {
        title: '???????????? ?? ??????????????????',
        href: '/reportsAndAnalytics',
        type: 'REPORTS_AND_ANALYTICS',
        icon: <EqualizerIcon />,
        disabled: true,
    },
    {
        title: '?????????????????????????? ????????????',
        href: '/customreport',
        type: 'CUSTOM_REPORT',
        icon: <TableChartIcon />,
        disabled: false,
    },
    {
        title: '??????????????????????????????',
        href: '/forecasting',
        type: 'FORECASTING',
        icon: <LegendToggleIcon />,
        disabled: true,
    },
    {
        title: '????????????????',
        href: '/training',
        type: 'TRAINING',
        icon: <SchoolIcon />,
        disabled: true,
    },
    {
        title: '???????????????? ??????????',
        href: '/feedback',
        type: 'FEEDBACK',
        icon: <ErrorOutlineIcon />,
        disabled: true,
    },
];
