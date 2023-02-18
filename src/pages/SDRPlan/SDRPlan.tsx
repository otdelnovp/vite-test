import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { AppDispatch } from '../../index';

import { userSelector } from '@services/userService';
import { sdrPlanSelector, getSDRPlan, getSDRPlanTasks } from '@services/sdrPlanService';
import { RootState } from '@services/index';

import { SDRPlanTasks } from './SDRPlanTasks';
import { SDRPlanGantt } from './SDRPlanGantt';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

import { PageTitle } from '@core/PageTitle/PageTitle';
import { Loader } from '@core/Loader/Loader';

import { useEffectOnce } from '@hooks/useEffectOnce';

import { useSDRPlanPageStyles } from './styles';

const SDRPlan = ({ user, isLoading, sdrPlan, isLoadingTasks, sdrPlanTasks, sdrPlanGantt }: SDRPlanReduxProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const classes = useSDRPlanPageStyles();
    const dispatch = useDispatch<AppDispatch>();

    const onGetSDRPlan = (projectId: string) => dispatch(getSDRPlan(projectId, user));
    const onGetSDRPlanTasks = (projectId: string) => dispatch(getSDRPlanTasks(projectId, user));

    const { projectId } = useParams();
    useEffectOnce(() => {
        onGetSDRPlan(projectId || '');
        onGetSDRPlanTasks(projectId || '');
    });

    return isLoading ? (
        <Loader />
    ) : (
        <>
            <Box className={classes.header}>
                <PageTitle
                    title={
                        <>
                            <Link to="/dictionary">Справочники</Link> &#8250; <Link to="/dictionary/project">Проекты</Link> &#8250; {sdrPlan.Name}
                        </>
                    }
                />
                <Box className={classes.tools}>
                    <ToggleButtonGroup
                        className={classes.toggleMode}
                        size="small"
                        exclusive
                        value={location.pathname}
                        onChange={(event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
                            if (newAlignment) navigate(newAlignment, { replace: true });
                        }}
                    >
                        <ToggleButton value={`/sdrplan/list/${projectId}`}>
                            <Tooltip title="Список работ">
                                <ViewListIcon />
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton value={`/sdrplan/gantt/${projectId}`}>
                            <Tooltip title="Диаграмма Ганта">
                                <AccountTreeIcon />
                            </Tooltip>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>
            {location.pathname === `/sdrplan/list/${projectId}` ? (
                <SDRPlanTasks
                    sdrPlan={sdrPlan}
                    sdrPlanTasks={sdrPlanTasks}
                    isLoadingTasks={isLoadingTasks}
                    user={user}
                    onReload={() => onGetSDRPlanTasks(projectId || '')}
                />
            ) : (
                <SDRPlanGantt
                    sdrPlan={sdrPlan}
                    sdrPlanGantt={sdrPlanGantt}
                    isLoadingTasks={isLoadingTasks}
                    user={user}
                    onReload={() => onGetSDRPlanTasks(projectId || '')}
                />
            )}
        </>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { isLoading, sdrPlan, isLoadingTasks, sdrPlanTasks, sdrPlanGantt } = sdrPlanSelector(state);
    return { user, isLoading, sdrPlan, isLoadingTasks, sdrPlanTasks, sdrPlanGantt };
};

const connector = connect(mapStateToProps);
type SDRPlanReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(SDRPlan);
