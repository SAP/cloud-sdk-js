import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmEnumType } from '../../vdm-types';
import { EdmxEnumMember, EdmxEnumType } from '../../edmx-parser/v4';
import { createLogger, unique } from '@sap-cloud-sdk/util';
import BigNumber from 'bignumber.js';

const logger = createLogger({
  package: 'generator',
  messageContext: 'enum-type'
});

export function transformEnumTypesBase(
  edmTypes: EdmxEnumType[],
  formatter: ServiceNameFormatter
): VdmEnumType[] {
  const formattedTypes = edmTypes.reduce(
    (formatted, c) => ({
      ...formatted,
      [c.Name]: formatter.originalToEnumTypeName(c.Name)
    }),
    {}
  );
  return edmTypes.map(e => {
    const typeName = formattedTypes[e.Name];
    return {
      originalName: e.Name,
      typeName,
      underlyingType: e.UnderlyingType || 'Edm.Int32',
      members: parseMember(e)
    };
  });
}

function parseMember(edmxEnumType: EdmxEnumType): Record<string, number | BigNumber>{
  validateUniqueness(edmxEnumType);
  validateUnderlyingType(edmxEnumType);
  edmxEnumType.UnderlyingType = edmxEnumType.UnderlyingType? edmxEnumType.UnderlyingType : 'Edm.Int32';

  if(!hasValidValues(edmxEnumType)){
    logger.warn(`The enum ${edmxEnumType.Name} has invalid member values, which should be either of the following: 1. All values are specified. 2. No values are specified. 0 based index is used as value.`);
    return edmxEnumType.Member.reduce((ret, member, index) => ({...ret, [member.Name]: index}), {} as Record<string, number>);
  }

  if(edmxEnumType.Member.some(member => member.Value)){
    return edmxEnumType.Member.reduce((ret, member) => ({...ret, [member.Name]: parseValue(edmxEnumType.UnderlyingType!, member.Value!)}), {} as Record<string, number | BigNumber>);
  }

  return edmxEnumType.Member.reduce((ret, member, index) => ({...ret, [member.Name]: index}), {} as Record<string, number>);
}


function validateUniqueness(edmxEnumType: EdmxEnumType){
  if(unique(edmxEnumType.Member).length !== edmxEnumType.Member.length){
    logger.warn(`The enum ${edmxEnumType.Name} has duplicate member names. To keep the uniqueness, only the last one is kept.`);
  }
}

function validateUnderlyingType(edmxEnumType: EdmxEnumType) {
  const validUnderlyingTypes = ['Edm.Byte',
    'Edm.SByte',
    'Edm.Int16',
    'Edm.Int32',
    'Edm.Int64'
  ];
  if(!!edmxEnumType.UnderlyingType && !validUnderlyingTypes.includes(edmxEnumType.UnderlyingType)){
    logger.warn(`The enum ${edmxEnumType.Name} has invalid underlying type ${edmxEnumType.UnderlyingType}.`);
  }
}

function hasValidValues(edmxEnumType: EdmxEnumType): boolean {
  const values = edmxEnumType.Member.map(member => member.Value);
  const filtered = values.filter(value => !!value);
  return !(filtered.length !== 0 && filtered.length !== values.length);
}

function parseValue(underlyingType: string, value: string): number | BigNumber {
  if(underlyingType === 'Edm.Int64'){
    return toBigNumber(value)
  }
  return toNumber(value);
}

const toNumber = (value: any): number => Number(value);
const toBigNumber = (value: any): BigNumber => new BigNumber(value);
