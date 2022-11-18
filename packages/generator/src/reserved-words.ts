/**
 * @internal
 */
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
  'TimeField',
  'Service'
] as const;
/**
 * @internal
 */
export const reservedVdmKeywords = [
  'builder',
  '_entity',
  'entityBuilder',
  'requestBuilder'
] as const;
/**
 * @internal
 */
export const defaultReservedWords = [
  ...Object.getOwnPropertyNames(Object.prototype),
  ...reservedVdmKeywords
] as const;
