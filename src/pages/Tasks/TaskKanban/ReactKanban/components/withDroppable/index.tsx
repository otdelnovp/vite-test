import React from 'react'
import { Droppable, DroppableProps } from 'react-beautiful-dnd'

function withDroppable(Component: any) {
  return function WrapperComponent({ children, ...droppableProps }: DroppableProps) {

    const [enabled, setEnabled] = React.useState(false);

    React.useEffect(() => {
      const animation = requestAnimationFrame(() => setEnabled(true));

      return () => {
        cancelAnimationFrame(animation);
        setEnabled(false);
      };
    }, []);

    if (!enabled) {
      return null;
    }

    return (
      <Droppable {...droppableProps}>
        {(provided) => (
          <Component ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            {provided.placeholder}
          </Component>
        )}
      </Droppable>
    )
  }
}

export default withDroppable
