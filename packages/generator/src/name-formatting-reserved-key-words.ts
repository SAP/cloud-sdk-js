/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
export const reservedVdmKeywords: Set<string> = new Set<string>([
  'builder',
  'entityBuilder',
  'requestBuilder'
]);

export const reservedJSKeywords: Set<string> = new Set<string>([
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'implements',
  'in',
  'instanceof',
  'let',
  'new',
  'null',
  'protected',
  'public',
  'return',
  'static',
  'super',
  'switch',
  'symbol',
  'this',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield'
]);

export const reservedObjectPrototypeKeywords: Set<string> = new Set<string>(
  Object.getOwnPropertyNames(Object.prototype)
);

export const reservedServiceKeywords:string[]=[
  'BinaryField',
  'NumberField',
  'Moment',
  'BigNumber',
  'BigNumberField',
  'StringField',
  'DateField',
  'AllFields',
  'CustomField',
  'Entity',
  'EntityBuilderType',
  'Field',
  'Selectable',
  'OneToOneLink',
  'BooleanField',
  'Link',
  'Time',
  'TimeField'
]
