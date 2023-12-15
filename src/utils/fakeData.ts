import { NestedAccordionNode } from './types';

export const fakeItems: NestedAccordionNode[] = [
  {
    children : [
      {
        children : [{
          children : [{
            id         : '22',
            isDisabled : true,
            label      : 'Subitem 1.1.1.1',
          }],
          id         : '3',
          isDisabled : true,
          label      : 'Subitem 1.1.1',
        }],
        id         : '2',
        isDisabled : true,
        label      : 'Subitem 1.1',
      },
      {
        id         : '4',
        isDisabled : true,
        label      : 'Subitem 1.2',
      },
    ],
    id         : '1',
    isDisabled : true,
    label      : 'Item 1',
  }, {
    children : [
      {
        id         : '6',
        isDisabled : true,
        label      : 'SubElement 2.1',
      },
    ],
    id    : '5',
    label : 'Element 2',
  }, {
    children : [
      {
        id    : '9',
        label : 'SubElement 3.1',
      },
      {
        id    : '10',
        label : 'SubElement 3.2',
      },
    ],
    id    : '8',
    label : 'Element 3',
  }, {
    children : [
      {
        children : [{
          id    : '13',
          label : 'Subitem 2.1.1',

        }],
        id    : '12',
        label : 'Subitem 2.1',
      },
      {
        id    : '14',
        label : 'Subitem 2.2',
      },
    ],
    id    : '11',
    label : 'Item 2',
  }, {
    children : [
      {
        children : [{
          id    : '17',
          label : 'Subitem 3.1.1',

        }],
        id    : '16',
        label : 'Subitem 3.1',
      },
      {
        id         : '18',
        label      : 'Subitem 3.2',
        isDisabled : true,
      },
    ],
    id    : '15',
    label : 'Item 3',
  },
];
