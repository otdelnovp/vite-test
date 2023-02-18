import { IUserData } from "@helpers/authHelper";
import { Description } from "@mui/icons-material";
import { IBoardStateElement } from "@pages/Dictionary/Project/BoardState/model";
import { IParticipantElement } from "@pages/Dictionary/Project/Participant/model";
import { createRequest } from "@services/dispatcher";
import { title } from "process";
import { ITaskListData } from "../methods";

export interface IKanbanBoardCard {
    id: number;
    taskId: string | null;
    userId: string,
    userName: string,
    priority: string | null,
    title: string | null;
    description: string | null;
    StartDatePlan: string;
    StartDateFact: string;
    EndDateFact: string;
}

interface IKanbanBoardColumn {
    id: number;
    title: string;
    stateId: string;
    userId: string;
    userName: string;
    sortBy: string;
    cards: IKanbanBoardCard[];
}

interface IKanbanBoardData {
    columns: IKanbanBoardColumn[]
    boardStates: IBoardStateElement[]
}

export interface IUserGroup {
    userId: string,
    userName: string,
    columnIds: number[],
}

export interface IKanbanData {
    data: IKanbanBoardData;
    userGroups: IUserGroup[];
}

export const prepareKanbanData = (participants: IParticipantElement[], boardStates: IBoardStateElement[], tasks: ITaskListData[]): IKanbanData => {

    const sortedBoardStates = [...boardStates].sort((a, b) => a.N - b.N)

    //  группировка колонок по пользователям
    let userGroups: IUserGroup[] = [];
    let columnId = 1;
    participants.forEach((user) => {
        let columnIds: number[] = []
        sortedBoardStates.forEach((state) => {
            columnIds.push(columnId)
            columnId++;
        })
        userGroups.push({
            userId: user.UserId,
            userName: user.UserName,
            columnIds: columnIds,
        })
    })

    //  все колонки по всем пользователям
    columnId = 1;
    let cardId = 1;
    let columns: IKanbanBoardColumn[] = [];
    participants.forEach((user) => {
        sortedBoardStates.forEach((state) => {

            const userStateTasks = tasks.filter((task) => task.BoardStateId === state.BoardStateId && task.ExecuterUserId === user.UserId)
            const newCards = userStateTasks.map((task) => {
                const newCard = {
                    id: cardId,
                    taskId: task.Id,
                    title: task.Number,
                    description: task.Title,
                    userId: user.UserId,
                    userName: user.UserName,
                    priority: task.Priority,
                    sortField: state.SortBy ? task[state.SortBy] : "",
                    StartDatePlan: task.StartDatePlan,
                    StartDateFact: task.StartDateFact,
                    EndDateFact: task.StartDateFact,
                }
                cardId = cardId + 1
                return newCard
            })

            if (state.SortBy) {
                const searchIndex = state.SortBy ? state.SortBy : "StartDatePlan"
                newCards.sort((a, b) => a[searchIndex] > b[searchIndex] ? 1 : -1)
            }

            const column = {
                id: columnId,
                stateId: state.BoardStateId,
                userId: user.UserId,
                userName: user.UserName,
                title: state.BoardStateName,
                sortBy: state.SortBy ? state.SortBy : "",
                cards: [...newCards]
            }
            columnId++;
            columns.push(column)
        })
    })

    return {
        data: {
            columns: columns,
            boardStates: [...sortedBoardStates]
        },
        userGroups: userGroups,
    }
}

interface IMoveCardAPI {
    (setIsLoading: (isLoading: boolean) => void,
        taskId: string,
        executerUserId: string,
        boardStateId: string,
        user: IUserData | null): Promise<void>;
}

export const moveCardAPI: IMoveCardAPI = async (setIsLoading, taskId, executerUserId, boardStateId, user) => {
    setIsLoading(true);
    let newBody = {
        Id: taskId,
        ExecuterUserId: executerUserId,
        BoardStateId: boardStateId,
        UserId: user?.UserId
    };
    const params = {
        type: "Task.Edit",
        body: { ...newBody },
    };
    const postData = await createRequest(params);
    // @ts-ignore
    const { error } = postData.data as IServerResponse;
    if (error) {
        console.log('error', error);
        throw new Error(JSON.stringify(error));
    } else {
        console.log('no error');
    }
    setIsLoading(false);
};

interface IChangePriorityAPI {
    (setIsLoading: (isLoading: boolean) => void,
        taskId: string,
        priority: string,
        user: IUserData | null): Promise<void>;
}

export const changePriorityAPI: IChangePriorityAPI = async (setIsLoading, taskId, priority, user) => {
    setIsLoading(true);
    let newBody = {
        Id: taskId,
        Priority: priority,
        UserId: user?.UserId
    };
    const params = {
        type: "Task.Edit",
        body: { ...newBody },
    };
    const postData = await createRequest(params);
    // @ts-ignore
    const { error } = postData.data as IServerResponse;
    if (error) {
        console.log('error', error);
    } else {
        console.log('no error');
    }
    setIsLoading(false);
};

interface IChangeUserAPI {
    (setIsLoading: (isLoading: boolean) => void,
        taskId: string,
        userId: string,
        user: IUserData | null): Promise<void>;
}

export const changeUserAPI: IChangeUserAPI = async (setIsLoading, taskId, userId, user) => {
    setIsLoading(true);
    let newBody = {
        Id: taskId,
        ExecuterUserId: userId,
        UserId: user?.UserId
    };
    const params = {
        type: "Task.Edit",
        body: { ...newBody },
    };
    const postData = await createRequest(params);
    // @ts-ignore
    const { error } = postData.data as IServerResponse;
    if (error) {
        console.log('error', error);
    } else {
        console.log('no error');
    }
    setIsLoading(false);
};