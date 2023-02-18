import React, { forwardRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './components/Column';
import withDroppable from '../withDroppable';
import { when, partialRight } from '../../services/utils';
import ColumnHeader from './components/Column/ColumnHeader';
import Card from './components/Card/index';

import Box from '@mui/material/Box';

import { getCard, getCoordinates, isAColumnMove, isMovingAColumnToAnotherPosition, isMovingACardToAnotherPosition } from './services';
import { styles } from './styles';
import Table from '@mui/material/Table';
import { Tab } from '@mui/material';
import { DroppableBoardContainer, KanbanTable, KanbanTableHeader, KanbanTd, KanbanTh, KanbanTr } from './styles';

const Columns = forwardRef((props, ref) => {
    //@ts-ignore
    return <div ref={ref} style={{ whiteSpace: 'nowrap' }} {...props} />;
});

const DroppableBoard = withDroppable(Columns);

interface IBoardContainer {
    children: any;
    renderCard: any;
    disableColumnDrag: any;
    disableCardDrag: any;
    renderColumnHeader: any;
    allowRemoveColumn: any;
    onColumnRemove: any;
    allowRenameColumn: any;
    onColumnRename: any;
    onColumnDragEnd: any;
    onCardDragEnd: any;
    onCardNew: any;
    allowAddCard: any;
    initialBoardGroups: any;
}

const BoardContainer = ({
    children: board,
    renderCard,
    disableColumnDrag,
    disableCardDrag,
    renderColumnHeader,
    // renderColumnAdder,
    allowRemoveColumn,
    onColumnRemove,
    allowRenameColumn,
    onColumnRename,
    onColumnDragEnd,
    onCardDragEnd,
    onCardNew,
    allowAddCard,
    initialBoardGroups,
}: IBoardContainer) => {
    function handleOnDragEnd(event: any) {
        const coordinates = getCoordinates(event, board);
        if (!coordinates.source) return;

        isAColumnMove(event.type)
            ? isMovingAColumnToAnotherPosition(coordinates) &&
              onColumnDragEnd({ ...coordinates, subject: board.columns[coordinates.source.fromPosition] })
            : isMovingACardToAnotherPosition(coordinates) && onCardDragEnd({ ...coordinates, subject: getCard(board, coordinates.source) });
    }

    return (
        board && (
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Box>
                    <KanbanTableHeader>
                        <KanbanTr>
                            {board.boardStates.map((boardState: any) => {
                                return <th className="kanban-th">{boardState.BoardStateName}</th>;
                            })}
                        </KanbanTr>
                    </KanbanTableHeader>
                    <DroppableBoardContainer>
                        <DroppableBoard droppableId="board-droppable" direction="horizontal" type="BOARD">
                            {initialBoardGroups.map((boardGroup: any, index: number) => (
                                <KanbanTable>
                                    <tr>
                                        <KanbanTh colSpan={board.boardStates.length}>{boardGroup.userName}</KanbanTh>
                                    </tr>
                                    <KanbanTr>
                                        {board.columns
                                            .filter((boardColumn: any) => boardGroup.columnIds.find((columnId: any) => columnId === boardColumn.id))
                                            .map((column: any, index: any) => (
                                                <KanbanTd>
                                                    <Column
                                                        key={column.id}
                                                        index={index}
                                                        renderCard={renderCard}
                                                        renderColumnHeader={(column: any) =>
                                                            renderColumnHeader ? (
                                                                renderColumnHeader(column)
                                                            ) : (
                                                                <ColumnHeader
                                                                    allowRemoveColumn={allowRemoveColumn}
                                                                    onColumnRemove={onColumnRemove}
                                                                    allowRenameColumn={allowRenameColumn}
                                                                    onColumnRename={onColumnRename}
                                                                >
                                                                    {column}
                                                                </ColumnHeader>
                                                            )
                                                        }
                                                        disableColumnDrag={disableColumnDrag}
                                                        disableCardDrag={disableCardDrag}
                                                        onCardNew={onCardNew}
                                                        allowAddCard={allowAddCard}
                                                    >
                                                        {column}
                                                    </Column>
                                                </KanbanTd>
                                            ))}
                                    </KanbanTr>
                                </KanbanTable>
                            ))}
                        </DroppableBoard>
                    </DroppableBoardContainer>
                </Box>
            </DragDropContext>
        )
    );
};

interface IBoard {
    children: any;
    onCardDragEnd: any;
    onColumnDragEnd?: any;
    onColumnRemove?: any;
    renderColumnHeader?: any;
    allowRemoveColumn?: any;
    allowRenameColumn?: any;
    onColumnRename?: any;
    renderCard?: any;
    allowRemoveCard?: any;
    onCardRemove?: any;
    disableCardDrag?: any;
    disableColumnDrag: any;
    initialBoardGroups: any;
    changePriority: any;
    changeUser: any;
}

const Board = ({
    children: board,
    onCardDragEnd,
    onColumnDragEnd,
    onColumnRemove,
    renderColumnHeader,
    allowRemoveColumn,
    allowRenameColumn,
    onColumnRename,
    renderCard,
    allowRemoveCard,
    onCardRemove,
    disableCardDrag,
    disableColumnDrag,
    initialBoardGroups,
    changePriority,
    changeUser,
}: IBoard) => {
    const handleOnCardDragEnd = partialRight(handleOnDragEnd, { notifyCallback: onCardDragEnd });
    const handleOnColumnDragEnd = partialRight(handleOnDragEnd, { notifyCallback: onColumnDragEnd });

    function handleOnDragEnd(
        { source, destination, subject }: { source: any; destination: any; subject: any },
        { notifyCallback }: { notifyCallback: any },
    ) {
        when(notifyCallback)((callback: any) => callback(subject, source, destination));
    }

    return (
        <BoardContainer
            onCardDragEnd={handleOnCardDragEnd}
            onColumnDragEnd={handleOnColumnDragEnd}
            {...(renderColumnHeader && { renderColumnHeader: renderColumnHeader })}
            renderCard={(_column: any, card: any, dragging: any) => {
                if (renderCard) return renderCard(card, { dragging });
                return (
                    <Card
                        dragging={dragging}
                        allowRemoveCard={allowRemoveCard}
                        onCardRemove={onCardRemove}
                        userList={initialBoardGroups}
                        changePriority={changePriority}
                        changeUser={changeUser}
                    >
                        {card}
                    </Card>
                );
            }}
            allowRemoveColumn={allowRemoveColumn}
            onColumnRemove={onColumnRemove}
            allowRenameColumn={allowRenameColumn}
            onColumnRename={onColumnRename}
            disableColumnDrag={disableColumnDrag}
            disableCardDrag={disableCardDrag}
            initialBoardGroups={initialBoardGroups}
            changePriority={changePriority}
        >
            {board}
        </BoardContainer>
    );
};

export default Board;
