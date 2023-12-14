import {
  Droppable,
  Draggable,
}                              from 'react-beautiful-dnd';
import { styled }              from 'styled-components';
import { NestedAccordionNode } from '../utils/types';

const DraggableItem = styled.div`
  border-radius    : 5px;
  margin-bottom    : 5px;
`;

const NameBlock = styled.p`
  height      : 100%;
  display     : flex;
  align-items : center;
`;

interface IDragAndDropProps {
  items: NestedAccordionNode[];
}

export const DragAndDrop = ({ items }: IDragAndDropProps) => (
  <Droppable droppableId="droppable">
    {(droppableProvided) => (
      <div
        {...droppableProvided.droppableProps}
        ref={droppableProvided.innerRef}
      >
        {items.map((item, index) => (
          <Draggable
            key            = {item.id}
            draggableId    = {item.id}
            index          = {index}
            isDragDisabled = {item.isDisabled}
          >
            {(draggableProvided) => (
              <div
                {...draggableProvided.draggableProps}
                {...draggableProvided.dragHandleProps}
                ref   = {draggableProvided.innerRef}
                style = {draggableProvided.draggableProps.style}
              >
                <DraggableItem>
                  <NameBlock>
                    {item.label}
                  </NameBlock>
                </DraggableItem>
              </div>
            )}
          </Draggable>
        ))}
        {droppableProvided.placeholder}
      </div>
    )}
  </Droppable>
);
