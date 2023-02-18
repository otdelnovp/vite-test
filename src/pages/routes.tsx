// import { lazy, Suspense } from 'react';

import { isAuthorized, isSuperuser } from '@helpers/authHelper';

// import { Loader } from '@core/Loader/Loader';

import Home from '@pages/Home/Home';
import Login from '@pages/Login/Login';

// const DynamicLoader = (props: any) => {
//     const LazyComponent = lazy(() => import(`@pages/${props.element}/${props.element}`));
//     return (
//         <Suspense fallback={props.hideLoader ? null : <Loader />}>
//             <LazyComponent />
//         </Suspense>
//     );
// };

export interface IRoute {
    path: string;
    element: any;
    exact?: boolean;
    status?: number;
    hideLoader?: boolean;
    loadData?: ({ store, req }: any) => void;
}

const routes: IRoute[] = [
    {
        path: '/',
        element: <Home />,
        exact: true,
    },
    // {
    //     path: '/calendar-production/',
    //     element: 'CalendarProduction',
    //     exact: true,
    // },
    // {
    //     path: '/work-exception/',
    //     element: 'WorkException',
    //     exact: true,
    // },
    // {
    //     path: '/tasks/list/',
    //     element: 'Tasks',
    //     exact: true,
    // },
    // {
    //     path: '/tasks/kanban/',
    //     element: 'Tasks',
    //     exact: true,
    // },
    // {
    //     path: '/tasks/view/:taskId',
    //     element: 'Task',
    //     exact: true,
    // },
    // {
    //     path: '/tasks/edit/:taskId',
    //     element: 'Task',
    //     exact: true,
    // },
    // {
    //     path: '/tasks/new/',
    //     element: 'Task',
    //     exact: true,
    // },
    // {
    //     path: '/sdrplan/list/:projectId',
    //     element: 'SDRPlan',
    //     exact: true,
    // },
    // {
    //     path: '/sdrplan/gantt/:projectId',
    //     element: 'SDRPlan',
    //     exact: true,
    // },
    // {
    //     path: '/worked-time-old',
    //     element: 'WorkedTimeOld',
    //     exact: true,
    // },
    // {
    //     path: '/worked-time',
    //     element: 'WorkedTime',
    //     exact: true,
    // },
    // {
    //     path: '/weeklyreport',
    //     element: 'WeeklyReport',
    //     exact: true,
    // },
    // {
    //     path: '/weeklyreport/:weeklyReportId',
    //     element: 'WeeklyReport',
    //     exact: true,
    // },
    // {
    //     path: '/configurator',
    //     element: 'Configurator',
    //     exact: true,
    // },
    // {
    //     path: '/lk/',
    //     element: 'Lk',
    //     exact: true,
    // },
    // {
    //     path: '/lk/:tab',
    //     element: 'Lk',
    //     exact: true,
    // },
    // {
    //     path: '*',
    //     element: 'NotFound',
    //     status: 404,
    // },
    // {
    //     path: '/dictionary/',
    //     element: 'Dictionary',
    //     exact: true,
    // },
    // {
    //     path: '/dictionary/:dictName/:dictId',
    //     element: 'Dictionary',
    //     exact: true,
    // },
    // {
    //     path: '/dictionary/:dictName',
    //     element: 'Dictionary',
    //     exact: true,
    // },
    // {
    //     path: '/dashboard/',
    //     element: 'Dashboard',
    //     exact: true,
    // },
    // {
    //     path: '/customreport/',
    //     element: 'CustomReport',
    //     exact: true,
    // },
    // {
    //     path: '/customreport/edit/:customReportId',
    //     element: 'CustomReport',
    //     exact: true,
    // },
    // {
    //     path: '/customreport/view/:customReportId',
    //     element: 'CustomReport',
    //     exact: true,
    // },
];

const adminRoutes: IRoute[] = [];

const nonAuthRoutes: IRoute[] = [
    {
        path: '/',
        element: <Home />,
        exact: true,
    },
    // {
    //     path: '/restore-password/:restoreCode?',
    //     element: 'RestorePassword',
    //     exact: true,
    // },
    {
        path: '*',
        element: <Login />,
    },
];

export const finalRoutes = (user: any) => {
    let currentRoutes = isAuthorized(user) ? routes : nonAuthRoutes;

    if (isSuperuser(user)) currentRoutes = [...adminRoutes, ...currentRoutes];

    return currentRoutes;
    // return currentRoutes.map((route) => ({
    //     ...route,
    //     exact: !!route.exact,
    //     element: <DynamicLoader element={route.element} />,
    // }));
};

export default finalRoutes;
