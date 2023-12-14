import {
  Droppable,
  Draggable,
}                              from 'react-beautiful-dnd';
import { styled }              from 'styled-components';
import { NestedAccordionNode } from '../utils/types';
import { useCallback } from 'react';
import { TreeItem } from '@mui/x-tree-view';

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

// export const DragAndDrop = ({ items }: IDragAndDropProps) => (
//   <Droppable droppableId="droppable">
//     {(droppableProvided) => (
//       <div
//         {...droppableProvided.droppableProps}
//         ref={droppableProvided.innerRef}
//       >
//         {items.map((item, index) => (
//           <Draggable
//             key            = {item.id}
//             draggableId    = {item.id}
//             index          = {index}
//             isDragDisabled = {item.isDisabled}
//           >
//             {(draggableProvided) => (
//               <div
//                 {...draggableProvided.draggableProps}
//                 {...draggableProvided.dragHandleProps}
//                 ref   = {draggableProvided.innerRef}
//                 style = {draggableProvided.draggableProps.style}
//               >
//                 <DraggableItem>
//                   <NameBlock>
//                     {item.label}
//                   </NameBlock>
//                 </DraggableItem>
//               </div>
//             )}
//           </Draggable>
//         ))}
//         {droppableProvided.placeholder}
//       </div>
//     )}
//   </Droppable>
// );

export const DragAndDrop = ({ items }: IDragAndDropProps) => (
  <>
    {items.map((item, index) => (
      <Droppable droppableId="droppable">
        {(droppableProvided) => (
          <div
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
          >
            <DraggableTreeNode key={item.id} node={item} index={index.toString()} />
          </div>
        )}
      </Droppable>
    ))}
  </>
);


const DraggableTreeNode = ({ node, index }: { node: NestedAccordionNode; index: string }) => {
  const renderTreeItems = useCallback(
    (item: NestedAccordionNode, index: string) => (
      <TreeItem
        key={index}
        nodeId={item.id}
        disabled={item.isDisabled}
        label={item.label}
      >
        
        {item.children?.map((child, childIndex) => renderTreeItems(child, `${index}.${childIndex}`))}
      </TreeItem>
    ),
    [],
  );

  return (
  <Draggable
    key={node.id}
    draggableId={node.id}
    index={index}
    isDragDisabled={node.isDisabled}
  >
    {(draggableProvided) => (
      <div
        {...draggableProvided.draggableProps}
        {...draggableProvided.dragHandleProps}
        ref={draggableProvided.innerRef}
        style={draggableProvided.draggableProps.style}
      >
        <DraggableItem>
          {node.children?.map((child, childIndex) => renderTreeItems(child, childIndex))}
        </DraggableItem>

        {node.children && node.children.length > 0 && (
          <DragAndDrop items={node.children} />
        )}
      </div>
    )}
  </Draggable>
)}
