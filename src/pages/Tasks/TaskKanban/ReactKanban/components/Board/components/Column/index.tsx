import React from 'react'
import { useNavigate } from 'react-router-dom';
import { forwardRef } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import DraggableCard from './DraggableCard'
import withDroppable from '../../../withDroppable'
import { pickPropOut } from '../../../../services/utils'
import { IKanbanBoardCard } from '@pages/Tasks/TaskKanban/methods';
import { container } from './styles';

const ColumnEmptyPlaceholder = forwardRef((props, ref) => (
  //@ts-ignore
  <div ref={ref} style={{ minHeight: 'inherit', height: 'inherit' }} {...props} />
))

const DroppableColumn = withDroppable(ColumnEmptyPlaceholder)

interface IColumn {
  children: any,
  index: number,
  renderCard: any,
  renderColumnHeader: any,
  disableColumnDrag: boolean,
  disableCardDrag: boolean,
  onCardNew: any,
  allowAddCard: boolean,
}

const Column = ({
  children,
  index: columnIndex,
  renderCard,
  renderColumnHeader,
  disableColumnDrag,
  disableCardDrag,
  onCardNew,
  allowAddCard,
}: IColumn) => {
  const navigate = useNavigate();

  return (
    <Draggable draggableId={`column-draggable-${children.id}`} index={columnIndex} isDragDisabled={disableColumnDrag}>
      {(columnProvided) => {
        const draggablePropsWithoutStyle = pickPropOut(columnProvided.draggableProps, 'style')

        return (
          <div
            ref={columnProvided.innerRef}
            {...draggablePropsWithoutStyle}
            style={{
              ...container,
              ...columnProvided.draggableProps.style,
            }}
            data-testid={`column-${children.id}`}
          >
            <DroppableColumn droppableId={String(children.id)}>
              {children.cards.length ? (
                children.cards.map((card: IKanbanBoardCard, index: number) => (
                  <DraggableCard
                    key={card.id}
                    index={index}
                    renderCard={(dragging: boolean) => renderCard(children, card, dragging)}
                    disableCardDrag={disableCardDrag}
                    onDoubleClick={(e) => { navigate(`/tasks/view/${card.taskId}`); }}
                  >
                    {card}
                  </DraggableCard>
                ))
              ) : (
                <div className='react-kanban-card-skeleton' />
              )}
            </DroppableColumn>
          </div>
        )
      }}
    </Draggable>
  )
}

export default Column
