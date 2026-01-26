import type { TreeNode } from './nested-dropdown-selector';

/**
 * MOCK DATA: iOS → iPhone/iPad/MacBook → Models
 */
export const deviceTreeData: TreeNode[] = [
  {
    id: 'ios',
    label: 'iOS',
    children: [
      {
        id: 'iphone',
        label: 'iPhone',
        children: [
          { id: 'iphone-14-pro-max', label: 'iPhone 14 Pro Max' },
          { id: 'iphone-15', label: 'iPhone 15' },
        ],
      },
      { id: 'ipad', label: 'iPad' },
    ],
  },
  { id: 'android', label: 'Android' },
  {
    id: 'macbook',
    label: 'MacBook',
    children: [
      { id: 'macbook-13', label: 'MacBook 13"' },
      { id: 'macbook-14', label: 'MacBook 14"' },
      { id: 'macbook-15', label: 'MacBook 15"' },
      { id: 'macbook-16', label: 'MacBook 16"' },
      {
        id: 'macbook-air',
        label: 'MacBook Air',
        children: [
          { id: 'air-m1', label: 'MacBook Air M1' },
          { id: 'air-m2', label: 'MacBook Air M2' },
        ],
      },
      { id: 'macbook-m1', label: 'MacBook M1' },
      { id: 'macbook-m1-pro', label: 'MacBook M1 Pro' },
      { id: 'macbook-m1-pro-max', label: 'MacBook M1 Pro Max' },
      {
        id: 'macbook-m2',
        label: 'MacBook M2',
        children: [
          { id: 'm2-13', label: 'MacBook M2 13"' },
          { id: 'm2-14', label: 'MacBook M2 14"' },
          { id: 'm2-16', label: 'MacBook M2 16"' },
        ],
      },
      { id: 'macbook-m2-pro', label: 'MacBook M2 Pro' },
      { id: 'macbook-m2-pro-max', label: 'MacBook M2 Pro Max' },
    ],
  },
  { id: 'airpods', label: 'Airpods' },
  { id: 'magic-mouse', label: 'Magic Mouse' },
];
