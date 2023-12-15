import { NestedAccordionNode, Truthy } from './types';

export const truthy = <T>(value: T): value is Truthy<T> => !!value;

export const hasAtLeastOneChildDisabled = (node: NestedAccordionNode): boolean => {
  if (node.children) {
    return node.children.some((child) => hasAtLeastOneChildDisabled(child) || child.isDisabled);
  }

  return false;
};

export const hasEveryChildDisabled = (node: NestedAccordionNode): boolean => {
  if (node.children) {
    return node.children.every((child) => hasAtLeastOneChildDisabled(child) || !!child.isDisabled);
  }

  return false;
};
