import React, { lazy, Suspense, useMemo } from 'react';

import { isAuthorized, isSuperuser } from '@helpers/authHelper';

import { Loader } from '@core/Loader/Loader';

const DynamicLoader = (props: any) => {
    const LazyComponent = useMemo(() => lazy(() => import(`./${props.page}/${props.page}`)), [props.page]);
    return (
        <Suspense fallback={props.hideLoader ? null : <Loader />}>
            <LazyComponent />
        </Suspense>
    );
};

export interface IRoute {
    path: string;
    page: string;
    exact?: boolean;
    status?: number;
    hideLoader?: boolean;
    loadData?: ({ store, req }: any) => void;
}

const routes: IRoute[] = [
    {
        path: '/',
        page: 'Home',
        exact: true,
    },
    {
        path: '/calendar-production/',
        page: 'CalendarProduction',
        exact: true,
    },
    {
        path: '/work-exception/',
        page: 'WorkException',
        exact: true,
    },
    {
        path: '/tasks/list/',
        page: 'Tasks',
        exact: true,
    },
    {
        path: '/tasks/kanban/',
        page: 'Tasks',
        exact: true,
    },
    {
        path: '/tasks/view/:taskId',
        page: 'Task',
        exact: true,
    },
    {
        path: '/tasks/edit/:taskId',
        page: 'Task',
        exact: true,
    },
    {
        path: '/tasks/new/',
        page: 'Task',
        exact: true,
    },
    {
        path: '/sdrplan/list/:projectId',
        page: 'SDRPlan',
        exact: true,
    },
    {
        path: '/sdrplan/gantt/:projectId',
        page: 'SDRPlan',
        exact: true,
    },
    {
        path: '/worked-time-old',
        page: 'WorkedTimeOld',
        exact: true,
    },
    {
        path: '/worked-time',
        page: 'WorkedTime',
        exact: true,
    },
    {
        path: '/weeklyreport',
        page: 'WeeklyReport',
        exact: true,
    },
    {
        path: '/weeklyreport/:weeklyReportId',
        page: 'WeeklyReport',
        exact: true,
    },
    {
        path: '/configurator',
        page: 'Configurator',
        exact: true,
    },
    {
        path: '/lk/',
        page: 'Lk',
        exact: true,
    },
    {
        path: '/lk/:tab',
        page: 'Lk',
        exact: true,
    },
    {
        path: '*',
        page: 'NotFound',
        status: 404,
    },
    {
        path: '/dictionary/',
        page: 'Dictionary',
        exact: true,
    },
    {
        path: '/dictionary/:dictName/:dictId',
        page: 'Dictionary',
        exact: true,
    },
    {
        path: '/dictionary/:dictName',
        page: 'Dictionary',
        exact: true,
    },
    {
        path: '/dashboard/',
        page: 'Dashboard',
        exact: true,
    },
    {
        path: '/customreport/',
        page: 'CustomReport',
        exact: true,
    },
    {
        path: '/customreport/edit/:customReportId',
        page: 'CustomReport',
        exact: true,
    },
    {
        path: '/customreport/view/:customReportId',
        page: 'CustomReport',
        exact: true,
    },
];

const adminRoutes: IRoute[] = [];

const nonAuthRoutes: IRoute[] = [
    {
        path: '/',
        page: 'Home',
        exact: true,
    },
    {
        path: '/restore-password/:restoreCode?',
        page: 'RestorePassword',
        exact: true,
    },
    {
        path: '*',
        page: 'Login',
    },
];

export const finalRoutes = (user: any) => {
    let currentRoutes = isAuthorized(user) ? routes : nonAuthRoutes;

    if (isSuperuser(user)) currentRoutes = [...adminRoutes, ...currentRoutes];

    return currentRoutes.map((route) => ({
        ...route,
        exact: !!route.exact,
        page: () => <DynamicLoader page={route.page} path={route.path} />,
    }));
};

export default finalRoutes;
