/* eslint-disable jsdoc/require-jsdoc */
export const messageTypes = [
  {
    name: 'compat',
    title: 'Compatibility Notes',
    alternatives: ['compatibility', 'compatibility note', 'compat']
  },
  {
    name: 'feat',
    title: 'New Features',
    alternatives: ['new', 'new functionality', 'feat']
  },
  {
    name: 'fix',
    title: 'Fixed Issues',
    alternatives: ['bug', 'bug fix', 'fixed issue', 'fix', 'fix issue']
  },
  {
    name: 'known-issue',
    title: 'Known Issues',
    alternatives: ['known issue']
  },
  {
    name: 'impr',
    title: 'Improvements',
    alternatives: ['improvement', 'improv']
  },
  {
    name: 'dep',
    title: 'Updated Dependencies',
    alternatives: ['dependency', 'dependency update']
  }
];

export type MessageType = (typeof messageTypes)[number];
