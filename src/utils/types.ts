export type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T;

export type NestedAccordionNode = {
  children?   : NestedAccordionNode[];
  id          : string;
  isDisabled? : boolean;
  label       : string;
};
