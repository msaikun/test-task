import { useCallback, useMemo, useState } from 'react';
import { styled }                         from 'styled-components';
import { DragDropContext, DropResult }    from 'react-beautiful-dnd';
import { TreeView }                       from '@mui/x-tree-view/TreeView';
import { TreeItem }                       from '@mui/x-tree-view';
import CollapseIcon                       from '@mui/icons-material/ExpandMore';
import ExpandIcon                         from '@mui/icons-material/ChevronRight';

import { truthy }              from '../../utils/commonFunctions';
import { fakeItems }           from '../../utils/fakeData';
import { NestedAccordionNode } from '../../utils/types';
import { Search }              from '../Search';
import { DragAndDrop }         from '../DragAndDrop';
import { TreeItemLabel }       from './TreeItemLabel';

const searchNode = (node: NestedAccordionNode, searchTerm: string): NestedAccordionNode | null => {
  if (node.label.toLowerCase().includes(searchTerm.toLowerCase())) {
    return node;
  }

  const matchingChildren = node.children ? node.children.filter((child) => {
    const result = searchNode(child, searchTerm);

    return result !== null;
  }) : [];

  if (!matchingChildren.length) {
    return null;
  }

  return { ...node, children: matchingChildren };
};

export const TreeViewComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [nodes, setNodes]           = useState<NestedAccordionNode[]>(fakeItems);

  const matchingNodes = useMemo(
    () => nodes
      .map((node) => searchNode(node, searchTerm))
      .filter(truthy),
    [nodes, searchTerm],
  );

  const onRemoveNode = useCallback((node: NestedAccordionNode) => {
    if (node.isDisabled) return;

    setNodes((prevNodes) => {
      const removeNode = (nodes: NestedAccordionNode[]): NestedAccordionNode[] => nodes.reduce((acc, currNode) => {
        if (currNode.id === node.id) {
          return acc;
        }

        const updatedChildren = removeNode(currNode.children || []);

        return [...acc, { ...currNode, children: updatedChildren }];
      }, [] as NestedAccordionNode[]);

      return removeNode(prevNodes);
    });
  }, [setNodes]);

  const renderTreeItems = useCallback(
    (item: NestedAccordionNode, index: string) => (
      <TreeItem
        key      = {index}
        nodeId   = {item.id}
        disabled = {item.isDisabled}
        label    = {(
          <TreeItemLabel
            isExtendable = {!!item.children?.length}
            label        = {item.label}
            onDelete     = {() => onRemoveNode(item)}
          />
        )}
      >
        {item.children?.map((child, childIndex) => renderTreeItems(child, `${index}.${childIndex}`))}
      </TreeItem>
    ),
    [onRemoveNode],
  );

  const handleMoveItems = useCallback(
    (dropResult: DropResult) => {
      const destinationIndex = dropResult.destination?.index ?? 0;

      setNodes((prevNodes) => {
        const newNodes = [...prevNodes];

        newNodes.splice(destinationIndex, 0, ...newNodes.splice(dropResult.source.index, 1));

        return newNodes;
      });
    },
    [setNodes],
  );

  return (
    <>
      <Search searchInputValue={searchTerm} handleSearchInput={setSearchTerm} />
      <TreeViewComponent.Divider>All Elements</TreeViewComponent.Divider>

      <DragDropContext onDragEnd={(dropResult: DropResult) => handleMoveItems(dropResult)}>
        <TreeView
          multiSelect
          aria-label          = "items"
          defaultCollapseIcon = {<CollapseIcon />}
          defaultExpandIcon   = {<ExpandIcon />}
        >
          {/* <DragAndDrop items={matchingNodes}></DragAndDrop> */}
          {matchingNodes.map((item, index) => renderTreeItems(item, index.toString()))}
        </TreeView>
      </DragDropContext>
    </>
  );
}

TreeViewComponent.Divider = styled.div`
  align-items      : center;
  background-color : ${({ theme }) => theme.colors.tealHover};
  color            : ${({ theme }) => theme.colors.white};
  display          : flex;
  height           : 32px;
  font-size        : 14px;
  padding-left     : 8px;
`;
