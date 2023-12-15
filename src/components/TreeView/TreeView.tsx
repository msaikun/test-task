import { useCallback, useMemo, useState } from 'react';
import { styled }                         from 'styled-components';
import { DragDropContext, DropResult }    from 'react-beautiful-dnd';
import { Paper }                          from '@mui/material';
import { TreeItem }                       from '@mui/x-tree-view';

import {
  hasAtLeastOneChildDisabled,
  hasEveryChildDisabled,
  truthy
}                              from '../../utils/commonFunctions';
import { fakeItems }           from '../../utils/fakeData';
import { NestedAccordionNode } from '../../utils/types';
import { Search }              from '../Search';
import { DragAndDrop }         from '../DragAndDrop';
import { Modal }               from '../Modal';
import { TreeItemLabel }       from './TreeItemLabel';

const searchNode = (node: NestedAccordionNode, searchTerm: string): NestedAccordionNode | null => {
  if (node.label.toLowerCase().includes(searchTerm.toLowerCase())) {
    return { ...node, isDisabled: hasEveryChildDisabled(node)};
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
  const [searchTerm, setSearchTerm]     = useState('');
  const [nodes, setNodes]               = useState<NestedAccordionNode[]>(fakeItems);
  const [nodeToDelete, setNodeToDelete] = useState<NestedAccordionNode | null>(null);

  const matchingNodes = useMemo(() => nodes
    .map((node) => searchNode(node, searchTerm))
    .filter(truthy),
  [nodes, searchTerm]);

  const keepOnlyNodesWithDisabledChildren = (node: NestedAccordionNode): any => {
    const filteredChildren = (node.children || []).map(keepOnlyNodesWithDisabledChildren).filter(truthy);

    if (node.isDisabled || filteredChildren.length) {
      return { ...node, children: filteredChildren };
    }

    return null;
  };

  const removeNotDisabledChildren = useCallback(() => {
    nodeToDelete && (
      setNodes((prevNodes) => {
        const updatedNodes = prevNodes.map((prevNode) => {
          if (prevNode.id === nodeToDelete.id) {
            return keepOnlyNodesWithDisabledChildren(nodeToDelete);
          }

          return prevNode;
        });

        return updatedNodes;
      })
    );
  }, [nodeToDelete, setNodes]);

  const onRemoveNode = useCallback((node: NestedAccordionNode) => {
    if (node.isDisabled) return;

    if (hasAtLeastOneChildDisabled(node)) {
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
  }, [setNodes, hasAtLeastOneChildDisabled]);

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
    nodeToDelete && removeNotDisabledChildren();
    setNodeToDelete(null);
  }, [nodeToDelete, removeNotDisabledChildren]);

  return (
    <TreeViewComponent.Wrapper>
      <Search searchInputValue={searchTerm} handleSearchInput={setSearchTerm} />
      <TreeViewComponent.Divider>All Elements</TreeViewComponent.Divider>

      <DragDropContext onDragEnd={(dropResult: DropResult) => handleMoveItems(dropResult)}>
        <DragAndDrop items={matchingNodes} renderTreeItems={renderTreeItems} />
      </DragDropContext>

      <Modal
        open         = {!!nodeToDelete}
        title        = "Confirmation"
        content      = "You don't have full rights to delete certain items. Do you want to delete the available ones?"
        handleClose  = {() => setNodeToDelete(null)}
        handleSubmit = {handleModalSubmit}
      />
    </TreeViewComponent.Wrapper>
  );
}

TreeViewComponent.Wrapper = styled(Paper)`
  margin  : 20px;
  padding : 10px;
`;

TreeViewComponent.Divider = styled.div`
  align-items      : center;
  background-color : ${({ theme }) => theme.colors.tealHover};
  color            : ${({ theme }) => theme.colors.white};
  display          : flex;
  height           : 30px;
  font-size        : 12px;
  padding-left     : 10px;
`;
