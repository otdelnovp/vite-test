import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from 'src';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import Box from '@mui/material/Box';

import { Loader } from '@core/Loader/Loader';
import UniversalForm from '@core/UniversalForm/UniversalForm';
import { MuiTabs } from '@core/Tabs/MuiTabs';
import { IMuiTab } from '@core/Tabs/methods';
import { checkFormFullfilled } from '@core/UniversalForm/methods';

import { alertActions } from '@services/alertService';
import { clearDictionary, getBoardStates, getCompanyUsers } from '@services/dictionaryService';
import { userSelector } from '@services/userService';
import { RootState } from '@services/index';
import { editDictionaryElement, getDictionaryElement } from '@services/dictionaryEditService';
import { useEffectOnce } from '@hooks/useEffectOnce';

import BoardStateList from './BoardState/BoardStateList';
import ParticipantList from './Participant/ParticipantList';
import { sprintColumns } from './Sprint/columns';
import { sprintModel } from './Sprint/model';
import SprintList from './Sprint/SprintList';
import { IProjectElement, projectModel } from './model';
import { useElementStyles } from '@pages/Dictionary/Universal/styles';

interface IProjectElementForm extends DictionaryReduxProps {
    projectId: string;
}

const ProjectElement = ({ user, projectId }: IProjectElementForm) => {
    const dispatch = useDispatch<AppDispatch>();
    const classes = useElementStyles();
    const navigate = useNavigate();

    const [changed, setChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [body, setBody] = useState({} as IProjectElement);
    const [isErrorMessage, setErrorMessage] = useState(false);

    const onFieldChange = (name: string, value: any) => {
        let newBody = { ...body, [name]: value };
        if (name === 'CompanyId') {
            dispatch(getCompanyUsers({ org_id: value }));
        }
        setBody(newBody);
        setChanged(true);
    };

    const handleSubmit = () => {
        const validationErrorMsg = checkFormFullfilled(projectModel, body);
        if (!validationErrorMsg) {
            setIsLoading(true);
            dispatch(
                editDictionaryElement('Dictionary.ProjectEdit', body, {
                    onSuccess: (res) => {
                        if (res.Id) {
                            dispatch(clearDictionary({ name: 'projects' }));
                            dispatch(alertActions.alertSuccess({ message: 'Успешно записано.' }));
                            navigate(`/dictionary/project/${res.Id}`);
                            setBody({ ...body, Id: res.Id });
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

    useEffectOnce(() => {
        if (projectId !== 'new') {
            setIsLoading(true);
            dispatch(
                getDictionaryElement('Dictionary.ProjectGet', projectId, {
                    onSuccess: (res) => {
                        const newBody = { ...res };
                        if (res.BoardStates) {
                            let newBoardStates = [...res.BoardStates];
                            newBoardStates.sort((a, b) => a.N - b.N);
                            newBody.BoardStates = [...newBoardStates];
                        }
                        setBody(newBody);
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

    const onChangeTable = (tableName: string, newTableData: any[]): void => {
        const newBody = { ...body, [tableName]: newTableData };
        setBody(newBody);
        setChanged(true);
    };

    const onDeleteParticipantList = (rowId: string): void => {
        const newParticipants = body.Participants.filter((item) => item.UserId !== rowId);
        const newBody = { ...body, Participants: newParticipants };
        setBody(newBody);
        setChanged(true);
    };

    const onDeleteBoardStateList = (rowId: string): void => {
        const newBoardStates = body.BoardStates.filter((item) => item.BoardStateId !== rowId);
        const newBody = { ...body, BoardStates: newBoardStates };
        setBody(newBody);
        setChanged(true);
    };

    const onMoveRowBoardStateList = (rowId: string, direction: string): void => {
        let newBoardStates: any[] = body.BoardStates.map((item) => {
            return { ...item };
        });

        let rowIndex = -1;
        switch (direction) {
            case 'up':
                rowIndex = newBoardStates.findIndex((item) => item.BoardStateId === rowId);
                if (rowIndex > 0) {
                    newBoardStates[rowIndex].N = newBoardStates[rowIndex].N - 1;
                    newBoardStates[rowIndex - 1].N = newBoardStates[rowIndex - 1].N + 1;
                }
                break;
            case 'down':
                rowIndex = newBoardStates.findIndex((item) => item.BoardStateId === rowId);
                if (rowIndex < newBoardStates.length - 1) {
                    newBoardStates[rowIndex].N = newBoardStates[rowIndex].N + 1;
                    newBoardStates[rowIndex + 1].N = newBoardStates[rowIndex + 1].N - 1;
                }
                break;
            default:
                break;
        }
        newBoardStates.sort((a, b) => a.N - b.N);
        // temp
        newBoardStates = newBoardStates.map((item, index) => {
            return { ...item, N: index };
        });
        const newBody = { ...body, BoardStates: newBoardStates };
        setBody(newBody);
        setChanged(true);
    };

    useEffect(() => {
        if (body.CompanyId) {
            dispatch(getBoardStates({ CompanyId: body.CompanyId, WithDefault: true }));
            dispatch(getCompanyUsers({ org_id: body.CompanyId }));
        }
    }, [body.CompanyId]);

    const pageTitle = body.Id ? 'Редактирование проекта' : 'Добавление проекта';

    const tabList: IMuiTab[] = [
        {
            index: 0,
            label: 'Основное',
            children: (
                <Paper>
                    <Box className={classes.formBox}>
                        <UniversalForm data={body} onFieldChange={onFieldChange} model={projectModel} onSubmit={handleSubmit} />
                    </Box>
                </Paper>
            ),
        },
        {
            index: 1,
            label: 'Участники',
            children: (
                <ParticipantList
                    companyId={body.CompanyId}
                    projectId={body?.Id}
                    listData={body?.Participants}
                    onChange={(newListData) => onChangeTable('Participants', newListData)}
                    onDelete={(rowId) => onDeleteParticipantList(rowId)}
                />
            ),
        },
        {
            index: 2,
            label: 'Состояния доски',
            children: (
                <BoardStateList
                    companyId={body.CompanyId}
                    listData={body?.BoardStates}
                    onChange={(newListData) => onChangeTable('BoardStates', newListData)}
                    onDelete={(rowId) => onDeleteBoardStateList(rowId)}
                    onMoveRow={(rowId, direction) => onMoveRowBoardStateList(rowId, direction)}
                />
            ),
        },
        {
            index: 3,
            label: 'Спринты',
            children: (
                <SprintList
                    projectId={body.Id}
                    config={{
                        apiListFunction: 'Task.SprintList',
                        apiEditFunction: 'Task.SprintEdit',
                        dictionaryName: 'Спринты',
                        columns: sprintColumns,
                        model: sprintModel,
                    }}
                />
            ),
        },
    ];

    return (
        <React.Fragment>
            <Box className={classes.header}>
                <Box className={classes.pageTitle}>
                    <Typography component="h1" variant="h1">
                        <Link to="/dictionary">Справочники</Link> &#8250; <Link to="/dictionary/project">Проекты</Link> &#8250; {pageTitle}
                    </Typography>
                </Box>
                <Box>
                    <Button sx={{ marginRight: '8px' }} onClick={handleSubmit} disabled={!changed} variant="contained">
                        Сохранить
                    </Button>
                </Box>
            </Box>
            <Box className={classes.tabBox}>
                {isErrorMessage && <DialogContentText id="alert-dialog-description">Заполните правильно все поля</DialogContentText>}
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

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    return { user };
};

const connector = connect(mapStateToProps);
type DictionaryReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(ProjectElement);
