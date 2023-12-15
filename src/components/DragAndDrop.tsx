import { ReactNode }            from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { styled }               from 'styled-components';
import { TreeView }             from '@mui/x-tree-view/TreeView';
import CollapseIcon             from '@mui/icons-material/ExpandMore';
import ExpandIcon               from '@mui/icons-material/ChevronRight';
import { NestedAccordionNode }  from '../utils/types';

interface IDragAndDropProps {
  items           : NestedAccordionNode[];
  renderTreeItems : (item: NestedAccordionNode, index: string) => ReactNode;
}

export const DragAndDrop = ({ items, renderTreeItems }: IDragAndDropProps) => (
  <Droppable droppableId="droppable" type="droppable-items">
    {(provided) => (
      <TreeView
        aria-label          = "items"
        defaultCollapseIcon = {<CollapseIcon />}
        defaultExpandIcon   = {<ExpandIcon />}
        ref                 = {provided.innerRef}
        {...provided.droppableProps}
      >
        {items.length
          ? items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {renderTreeItems(item, index.toString())}
                </div>
              )}
            </Draggable>
          ))
          : <DragAndDrop.NoData>No data found...</DragAndDrop.NoData>
        }
        {provided.placeholder}
      </TreeView>
    )}
  </Droppable>
);

DragAndDrop.NoData = styled.div`
  display         : flex;
  justify-content : center;
  padding-top     : 20px;
  font-size       : 12px;
  color           : ${({ theme }) => theme.colors.grey};
`;
