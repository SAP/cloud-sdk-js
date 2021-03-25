// TODO 1728: The following is duplicate in the openapi generator
export const reservedJsKeywords: readonly string[] = [
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
] as const;

export const reservedServiceKeywords = [
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
] as const;

export const reservedVdmKeywords = [
  'builder',
  'entityBuilder',
  'requestBuilder'
] as const;

export const defaultReservedWords = [
  ...Object.getOwnPropertyNames(Object.prototype),
  ...reservedVdmKeywords
] as const;
