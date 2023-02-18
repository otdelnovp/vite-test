import React, { useEffect } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../index';
import { compose } from 'redux';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CloseIcon from '@mui/icons-material/Close';

import AutocompleteInput from '@core/UniversalInput/AutocompleteInput';

import { RootState } from '@services/index';
import { userSelector } from '@services/userService';
import { taskSelector, addTaskParticipant, delTaskParticipant } from '@services/taskService';
import { dictSelectors } from '@services/dictionaryService';

import { ITaskData } from '@pages/Tasks/methods';

import { useTaskParticipantStyles } from './styles';

interface ITaskParticipants {
    bodyTask: ITaskData;
}

const TaskParticipants = ({ user, companyUsers, participantList, task, bodyTask }: TaskParticipantsReduxProps) => {
    const classes = useTaskParticipantStyles();
    const dispatch = useDispatch<AppDispatch>();

    const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: theme.shadows[15],
            borderRadius: theme.spacing(1),
            maxWidth: 'none',
            padding: theme.spacing(2),
            fontSize: '1em',
        },
        [`& .${tooltipClasses.arrow}`]: {
            color: theme.palette.background.paper,
        },
    }));

    const addUserList = (
        <Box className={classes.participantAdd}>
            <AutocompleteInput
                name="participantAddUserId"
                placeholder="Подписать пользователя"
                dictionaryName="companyUsers"
                selectProps={{
                    valueField: 'id',
                    textField: 'full_name',
                }}
                excludeOptions={participantList?.map((parti) => parti.UserId)}
                value={''}
                onChange={(event: any) => {
                    const currentUser = companyUsers?.find((usr) => usr.id === event.target.value);
                    if (currentUser && task && task.Id)
                        dispatch(
                            addTaskParticipant(task.Id, currentUser.id, {
                                params: {
                                    UserId: currentUser.id,
                                    UserName: currentUser.full_name,
                                },
                            }),
                        );
                }}
                filters={{ dept_id: bodyTask.DepartmentId, project_id: bodyTask.ProjectId }}
                size="small"
            />
        </Box>
    );

    const isMyParticipated = !!participantList?.find((participant) => participant.UserId === user?.UserId);

    return (
        <Box className={classes.participant}>
            <HtmlTooltip
                arrow
                title={
                    <React.Fragment>
                        <Typography variant="subtitle2">Подписаны:</Typography>
                        {participantList?.length ? (
                            <ul className={classes.participantList}>
                                {participantList.map((participant) => (
                                    <li key={participant.UserId} className={classes.participantItem}>
                                        <Tooltip title="Отписать пользователя" arrow disableInteractive>
                                            <CloseIcon
                                                className={classes.participantDelete}
                                                onClick={() => {
                                                    if (bodyTask.Id && participant?.UserId)
                                                        dispatch(
                                                            delTaskParticipant(bodyTask.Id, participant.UserId, {
                                                                params: { UserId: participant.UserId },
                                                            }),
                                                        );
                                                }}
                                            />
                                        </Tooltip>
                                        <Box className={classes.participantName}>{participant.UserFullName}</Box>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Box>Нет подписанных пользователей</Box>
                        )}
                        {addUserList}
                    </React.Fragment>
                }
            >
                {isMyParticipated ? (
                    <IconButton
                        onClick={() => {
                            if (bodyTask.Id && user?.UserId)
                                dispatch(
                                    delTaskParticipant(bodyTask.Id, user.UserId, {
                                        params: { UserId: user.UserId },
                                    }),
                                );
                        }}
                    >
                        <StarIcon color="primary" />
                    </IconButton>
                ) : (
                    <IconButton
                        onClick={() => {
                            if (bodyTask.Id && user)
                                dispatch(
                                    addTaskParticipant(bodyTask.Id, user?.UserId, {
                                        params: { UserId: user?.UserId, UserName: user?.FullName },
                                    }),
                                );
                        }}
                    >
                        <StarOutlineIcon />
                    </IconButton>
                )}
            </HtmlTooltip>
        </Box>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { companyUsers } = dictSelectors.companyUsers(state);
    const { participantList, task } = taskSelector(state);
    return { user, companyUsers, participantList, task };
};

const connector = connect(mapStateToProps);
type TaskParticipantsReduxProps = ConnectedProps<typeof connector> & ITaskParticipants;

export default compose(connector)(TaskParticipants);
