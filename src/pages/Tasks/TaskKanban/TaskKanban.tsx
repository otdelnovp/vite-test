import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Board from './ReactKanban';

import { IUserData } from '@helpers/authHelper';
import { alertActions } from '@services/alertService';

import { changePriorityAPI, changeUserAPI, IKanbanBoardCard, IKanbanData, moveCardAPI } from './methods';

interface ITaskKanbanProps {
    user: IUserData | null;
    kanbanData: IKanbanData;
}

export const TaskKanban = ({ user, kanbanData }: ITaskKanbanProps) => {
    const dispatch = useDispatch();

    const [board, setBoard] = useState(kanbanData.data);
    const [isLoading, setIsLoading] = useState(false);

    const moveCard = (card: any, source: any, destination: any) => {
        const newColumn = kanbanData.data.columns.find((column) => destination.toColumnId === column.id);
        const newColumns = board.columns.map((column) => {
            if (column.id === source.fromColumnId) {
                return { ...column, cards: [...column.cards.filter((colCard) => colCard.id !== card.id)] };
            }
            if (column.id === destination.toColumnId) {
                let newCards = [...column.cards];
                newCards.splice(destination.toPositionId, 0, { ...card, userId: newColumn?.userId, userName: newColumn?.userName });

                const searchIndex = newColumn && newColumn.sortBy ? newColumn.sortBy : 'StartDatePlan';
                //@ts-ignore
                newCards.sort((a, b) => (a[searchIndex] > b[searchIndex] ? 1 : -1));

                return { ...column, cards: [...newCards] };
            }
            return column;
        });
        return newColumns;
    };

    const onCardDragEnd = (card: any, source: any, destination: any) => {
        const newColumn = kanbanData.data.columns.find((column) => destination.toColumnId === column.id);
        const taskId = card.taskId;
        const boardStateId = newColumn?.stateId;
        const executerUserId = newColumn?.userId;

        if (taskId && executerUserId && boardStateId) {
            const columns = moveCard(card, source, destination);
            setBoard({ ...kanbanData.data, columns });
            moveCardAPI(setIsLoading, taskId, executerUserId, boardStateId, user)
                .then((response) => {
                    // const columns = moveCard(card, source, destination);
                    // setBoard({ ...kanbanData.data, columns });
                })
                .catch((error) => {
                    const columns = moveCard(card, destination, source);
                    setBoard({ ...kanbanData.data, columns });
                    dispatch(alertActions.alertError({ message: `Ошибка при записи нового состояния/ответственного: ${error}` }));
                });
        }
    };

    const changePriority = (taskId: string, priority: string) => {
        changePriorityAPI(setIsLoading, taskId, priority, user)
            .catch((error) => {
                dispatch(alertActions.alertError({ message: `Ошибка при записи нового приоритета: ${JSON.stringify(error)}` }));
            })
            .then((response) => {
                const columns = board.columns.map((column) => {
                    const cards = column.cards.map((card) => {
                        if (card.taskId === taskId) return { ...card, priority: priority };
                        return card;
                    });
                    return { ...column, cards };
                });

                setBoard({ ...kanbanData.data, columns });
            });
    };

    const changeUser = (taskId: string, userId: string, userName: string) => {
        changeUserAPI(setIsLoading, taskId, userId, user)
            .catch((error) => {
                dispatch(alertActions.alertError({ message: `Ошибка при записи нового приоритета: ${JSON.stringify(error)}` }));
            })
            .then((response) => {
                let cardToMove = {} as IKanbanBoardCard;
                let stateId = '';
                // removing old card
                let columns = board.columns.map((column) => {
                    const foundCard = column.cards.find((card) => card.taskId === taskId);
                    if (foundCard) {
                        cardToMove = { ...foundCard, userId: userId, userName: userName };
                        stateId = column.stateId;
                    }
                    const cards = column.cards.filter((card) => card.taskId !== taskId);
                    return { ...column, cards };
                });

                //adding new card
                if (cardToMove && stateId) {
                    columns = columns.map((column) => {
                        if (column.userId === userId && column.stateId === stateId) {
                            return { ...column, cards: [...column.cards, cardToMove] };
                        }
                        return column;
                    });
                }

                setBoard({ ...kanbanData.data, columns });
            });
    };

    useEffect(() => {
        setBoard(kanbanData.data);
    }, [kanbanData]);

    return kanbanData.userGroups && board ? (
        <>
            <Board
                initialBoardGroups={kanbanData.userGroups}
                disableColumnDrag={true}
                onCardDragEnd={onCardDragEnd}
                changePriority={changePriority}
                changeUser={changeUser}
            >
                {board}
            </Board>
        </>
    ) : (
        <></>
    );
};

export default TaskKanban;
