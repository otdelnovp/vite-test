import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

interface IDraggableCard {
  children: any;
  index: any,
  renderCard: any,
  disableCardDrag: boolean,
  onDoubleClick: (e: any) => void,
}

const DraggableCard = ({ children, index, renderCard, disableCardDrag, onDoubleClick }: IDraggableCard) => {
  return (
    <Draggable draggableId={String(children.id)} index={index} isDragDisabled={disableCardDrag}>
      {(provided: any, { isDragging }: { isDragging: boolean }) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps} F
            data-testid={`card-${children.id}`}
          >
            <div style={{ display: 'inline-block', whiteSpace: 'normal', width: '100%' }} onDoubleClick={onDoubleClick}>{renderCard(isDragging)}</div>
          </div>
        )
      }}
    </Draggable>
  )
}

export default DraggableCard
