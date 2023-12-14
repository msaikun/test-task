import { useCallback, useMemo, useState } from 'react';
import { styled }                         from 'styled-components';
import { DragDropContext, DropResult }    from 'react-beautiful-dnd';
import { TreeView }                       from '@mui/x-tree-view/TreeView';
import { TreeItem }                       from '@mui/x-tree-view';
import CollapseIcon                       from '@mui/icons-material/ExpandMore';
import ExpandIcon                         from '@mui/icons-material/ChevronRight';

import { fakeItems }           from '../../utils/fakeData';
import { NestedAccordionNode } from '../../utils/types';
import { Search }              from '../Search';
import { DragAndDrop }         from '../DragAndDrop';
import { TreeItemLabel }       from './TreeItemLabel';
import { Modal } from '../Modal';
import { truthy } from '../../utils/commonFunctions';

const searchNode = (node: NestedAccordionNode, searchTerm: string): NestedAccordionNode | null=> {
  const isDisabled = (item: NestedAccordionNode) => hasDisabledEveryChildren(item) ?? !!item.isDisabled;

  if (node.label.toLowerCase().includes(searchTerm.toLowerCase())) {
    return { ...node, isDisabled: isDisabled(node) };
  }

  const matchingChildren = node.children ? node.children.filter((child) => {
    const result = searchNode({ ...child, isDisabled: isDisabled(child) }, searchTerm);

    return result !== null;
  }) : [];

  if (!matchingChildren.length) {
    return null;
  }

  return { ...node, isDisabled: isDisabled(node), children: matchingChildren };
};

const hasDisabledChildren = (node: NestedAccordionNode) => {
  if (node.children) {
    return !node.children.some(hasDisabledChildren);
  }

  return false;
};

const hasDisabledEveryChildren = (node: NestedAccordionNode): boolean => {
  if (node.children) {
    return node.children.every(hasDisabledEveryChildren);
  }

  return false;
};

export const TreeViewComponent = () => {
  const [searchTerm, setSearchTerm]     = useState('');
  const [nodes, setNodes]               = useState<NestedAccordionNode[]>(fakeItems);
  const [nodeToDelete, setNodeToDelete] = useState<NestedAccordionNode | null>(null);

  const matchingNodes = useMemo(() => nodes
    .map((node) => searchNode(node, searchTerm))
    .filter(truthy),
  [nodes, searchTerm]);

  const keepOnlyNodesWithDisabledChildren = (node: NestedAccordionNode): any => {
    const filteredChildren = (node.children || []).map(keepOnlyNodesWithDisabledChildren).filter(Boolean);

    if (node.isDisabled || filteredChildren.length) {
      return { ...node, children: filteredChildren };
    }

    return null;
  };

  const removeNotDisabledChildren = (node: NestedAccordionNode): void => {
    setNodes((prevNodes) => {
      const updatedNodes = prevNodes.map((prevNode) => {
        if (prevNode.id === node.id) {
          return keepOnlyNodesWithDisabledChildren(node);
        }
        return prevNode;
      });

      return updatedNodes;
    });
  };


  const onRemoveNode = useCallback((node: NestedAccordionNode) => {
    if (node.isDisabled) return;

    if (hasDisabledChildren(node)) {
      setNodeToDelete(node);
    } else {
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
    }
  }, [setNodes, hasDisabledChildren]);

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

  const handleModalSubmit = useCallback(() => {
    nodeToDelete && removeNotDisabledChildren(nodeToDelete);
    setNodeToDelete(null)
  }, [nodeToDelete, removeNotDisabledChildren]);

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
          <DragAndDrop items={matchingNodes}></DragAndDrop>
          {/* {matchingNodes.map((item, index) => renderTreeItems(item, index.toString()))} */}
        </TreeView>
      </DragDropContext>

      <Modal
        open         = {!!nodeToDelete}
        title        = "Confirmation"
        content      = "You don't have full rights to delete certain items. Do you want to delete the available ones?"
        handleClose  = {() => setNodeToDelete(null)}
        handleSubmit = {handleModalSubmit}
      />
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
