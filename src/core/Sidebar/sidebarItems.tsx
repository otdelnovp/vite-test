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
        title: 'Профиль',
        href: '/account/profile',
        type: 'PROFILE',
        icon: <AccountBoxIcon />,
        disabled: true,
    },
    {
        title: 'Производственный календарь',
        href: '/calendar-production',
        type: 'CALENDAR_PROD',
        icon: <CalendarMonthIcon />,
        disabled: false,
    },
    {
        title: 'Табельный календарь',
        href: '/work-exception',
        type: 'WORK_EXC',
        icon: <DateRangeIcon />,
        disabled: false,
    },
    {
        title: 'Работы',
        href: '/tasks/kanban',
        type: 'TASKSKANBAN',
        icon: <FeaturedPlayListIcon />,
        disabled: false,
    },
    // {
    //     title: 'Отработанное время',
    //     href: '/workedtime',
    //     type: 'WORKEDTIME',
    //     icon: <PunchClockIcon />,
    //     disabled: false,
    // },
    {
        title: 'Отработанное время',
        href: '/worked-time',
        type: 'WORKED_TIME',
        icon: <PunchClockIcon />,
        disabled: false,
    },
    {
        title: 'Еженедельные отчеты',
        href: '/weeklyreport',
        type: 'WEEKLYREPORT',
        icon: <CalendarViewWeekIcon />,
        disabled: false,
    },
    // {
    //     title: 'Конфигуратор',
    //     href: '/configurator',
    //     type: 'CONFIGURATOR',
    //     icon: <SettingsApplications />,
    //     disabled: false,
    // },
    {
        title: 'Моя активность',
        href: '/myActivities/wbsWorks',
        type: 'MY_TASKS',
        icon: <ListAltIcon />,
        disabled: true,
    },
    {
        title: 'Мои действия',
        href: '/user_actions',
        type: 'MY_ACTIONS',
        icon: <ChromeReaderModeIcon />,
        disabled: true,
    },
    {
        title: 'Администрирование',
        href: '/admin/ ',
        type: 'ADMINISTRATION',
        icon: <DashboardIcon />,
        disabled: true,
    },
    {
        title: 'Управление изменениями',
        href: '/change_tasks',
        type: 'CHANGES',
        icon: <AssignmentLateIcon />,
        disabled: true,
    },
    {
        title: 'Соразработка',
        href: '/coDevelopment',
        type: 'CDEV',
        icon: <AssignmentIcon />,
        disabled: true,
    },
    {
        title: 'Поставка',
        href: '/supply',
        type: 'SUPP',
        icon: <LocalShipping />,
        disabled: true,
    },
    // {
    //     title: 'Изделия',
    //     href: '/boms',
    //     type: 'BOM',
    //     icon: <SettingsApplications />,
    // },
    // {
    //     title: 'Аудит',
    //     href: '/audit',
    //     type: 'AUDIT',
    //     icon: <VerifiedUserIcon />,
    // },
    // {
    //     title: 'Требования',
    //     href: '/requirements',
    //     type: 'REQUIREMENTS',
    //     icon: <PlaylistAddCheckIcon />,
    // },
    {
        title: 'Справочники',
        href: '/dictionary',
        type: 'DICTIONARY',
        icon: <MenuBook />,
        disabled: false,
    },
    {
        title: 'Шаблоны СДР',
        href: '/wbs/list/templates',
        type: 'WBS_TEMPLATE',
        icon: <AccountTreeOutlined />,
        disabled: true,
    },
    {
        title: 'Планы СДР',
        href: '/wbs/list/instances',
        type: 'WBS',
        icon: <AccountTreeIcon />,
        disabled: true,
    },
    {
        title: 'Управление workflow',
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
        title: 'Хранение данных',
        href: '/filestorage',
        type: 'FILESTORAGE',
        icon: <DescriptionIcon />,
        disabled: true,
    },
    {
        title: 'Банк методик',
        href: '/metodologies-bank',
        type: 'METODOLOGIES_BANK',
        icon: <WorkOutlineIcon />,
        disabled: true,
    },
    {
        title: 'Документация',
        href: '/normative-documentation',
        type: 'NORMATIVE_DOCUMENTATION',
        icon: <LibraryBooksIcon />,
        disabled: true,
    },
    // {
    //     title: 'Управление версиями исходного кода',
    //     href: '/source-code',
    //     type: 'SOURCE_CODE_VERSION_CONTROL',
    //     icon: <GitHubIcon />,
    // },
    {
        title: 'Маркетплейс',
        href: '/marketplace',
        type: 'MARKETPLACE',
        icon: <ShoppingBasketIcon />,
        disabled: true,
    },
    {
        title: 'Форум',
        href: '/forum',
        type: 'FORUM',
        icon: <ForumIcon />,
        disabled: true,
    },
    {
        title: 'Управление стоимостью',
        href: '/cost-management',
        type: 'COST_MANAGEMENT',
        icon: <AttachMoneyIcon />,
        disabled: true,
    },
    {
        title: 'Конфигуратор продукта',
        href: '/product-configurator',
        type: 'PRODUCT_CONFIGURATOR',
        icon: <SettingsIcon />,
        disabled: true,
    },
    {
        title: 'Монитор руководителя',
        href: '/dashboard',
        type: 'MONITOR',
        icon: <MonitorIcon />,
        disabled: false,
    },
    {
        title: 'Отчеты и аналитика',
        href: '/reportsAndAnalytics',
        type: 'REPORTS_AND_ANALYTICS',
        icon: <EqualizerIcon />,
        disabled: true,
    },
    {
        title: 'Настраиваемые отчеты',
        href: '/customreport',
        type: 'CUSTOM_REPORT',
        icon: <TableChartIcon />,
        disabled: false,
    },
    {
        title: 'Прогнозирование',
        href: '/forecasting',
        type: 'FORECASTING',
        icon: <LegendToggleIcon />,
        disabled: true,
    },
    {
        title: 'Обучение',
        href: '/training',
        type: 'TRAINING',
        icon: <SchoolIcon />,
        disabled: true,
    },
    {
        title: 'Обратная связь',
        href: '/feedback',
        type: 'FEEDBACK',
        icon: <ErrorOutlineIcon />,
        disabled: true,
    },
];
