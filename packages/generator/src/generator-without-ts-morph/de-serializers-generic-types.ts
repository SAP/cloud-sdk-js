import { ODataVersion } from '@sap-cloud-sdk/util';

/**
 * @internal
 */
export function getGenericTypesWithDefault(oDataVersion: ODataVersion): string {
  return getGenericTypeAndDefault(oDataVersion)
    .map(typeAndDefault => `${typeAndDefault[0]} = ${typeAndDefault[1]}`)
    .join(',\n');
}

/**
 * @internal
 */
export function getGenericTypes(oDataVersion: ODataVersion): string {
  return getGenericTypeAndDefault(oDataVersion)
    .map(typeAndDefault => typeAndDefault[0])
    .join(',\n');
}

function getGenericTypeAndDefault(oDataVersion: ODataVersion): string[][] {
  const nonCommonGenericTypeAndDefault =
    oDataVersion === 'v4'
      ? [
          ['DateT', 'Moment'],
          ['DurationT', 'Duration'],
          ['TimeOfDayT', 'Time'],
          ['EnumT', 'any']
        ]
      : [
          ['DateTimeT', 'Moment'],
          ['TimeT', 'Time']
        ];
  return [...commonGenericTypeAndDefault, ...nonCommonGenericTypeAndDefault];
}

const commonGenericTypeAndDefault: string[][] = [
  ['BinaryT', 'string'],
  ['BooleanT', 'boolean'],
  ['ByteT', 'number'],
  ['DecimalT', 'BigNumber'],
  ['DoubleT', 'number'],
  ['FloatT', 'number'],
  ['Int16T', 'number'],
  ['Int32T', 'number'],
  ['Int64T', 'BigNumber'],
  ['GuidT', 'string'],
  ['SByteT', 'number'],
  ['SingleT', 'number'],
  ['StringT', 'string'],
  ['AnyT', 'any'],
  ['DateTimeOffsetT', 'Moment']
  // ['DateTimeT', 'Moment'],//v2
  // ['TimeT', 'Time'], //v2
  // ['DateT', 'Moment'], //v4
  // ['DurationT', 'Duration'],//v4
  // ['TimeOfDayT', 'Time'] //v4
];
