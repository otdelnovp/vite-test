import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AddIcon from '@mui/icons-material/Add';

import { PageTitle } from '@core/PageTitle/PageTitle';
import TaskListContainer from './TaskList/TaskListContainer';
import TaskKanbanContainer from './TaskKanban/TaskKanbanContainer';

import { useTaskPageStyles } from './styles';

const TasksHeader = React.memo(() => {
    const location = useLocation();
    const navigate = useNavigate();
    const classes = useTaskPageStyles();
    return (
        <Box className={classes.header}>
            <PageTitle title="Работы" />
            <Box className={classes.tools}>
                {/* <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    component={Link}
                    to="/tasks/new"
                    className={classes.newButton}
                    startIcon={<AddIcon />}
                >
                    Новая работа
                </Button> */}
                {/* <ToggleButtonGroup
                    className={classes.toggleMode}
                    size="small"
                    exclusive
                    value={location.pathname}
                    onChange={(event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
                        if (newAlignment) navigate(newAlignment, { replace: true });
                    }}
                >
                    <ToggleButton value="/tasks/kanban">
                        <Tooltip title="Kanban доска">
                            <ViewModuleIcon />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton value="/tasks/list">
                        <Tooltip title="Список работ">
                            <ViewListIcon />
                        </Tooltip>
                    </ToggleButton>
                </ToggleButtonGroup> */}
            </Box>
        </Box>
    );
});

const Tasks = () => {
    return (
        <>
            <TasksHeader />
            {location.pathname === '/tasks/list' ? <TaskListContainer /> : <TaskKanbanContainer />}
        </>
    );
};

export default Tasks;
