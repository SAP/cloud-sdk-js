import { codeBlock, ODataVersion, unixEOL } from '@sap-cloud-sdk/util';
import { VdmEntity, VdmServiceMetadata } from '../../vdm-types';
import { getSchema } from './schema';

export function classContent(
  entity: VdmEntity,
  service: VdmServiceMetadata
): string {
  return codeBlock`export class ${
    entity.className
  }Api<${getGenericTypesWithDefault(service.oDataVersion)}> implements 
    EntityApi<
      ${entity.className}<
        DeSerializers<${getGenericTypes(service.oDataVersion)}>
      >, 
      DeSerializers<${getGenericTypes(service.oDataVersion)}>
    > {
  public deSerializers: DeSerializers<${getGenericTypes(service.oDataVersion)}>;
  public schema: Record<string, any>;

  constructor(
    deSerializers: Partial<DeSerializers<${getGenericTypes(service.oDataVersion)}>> = defaultDeSerializers as any) {
      this.deSerializers = mergeDefaultDeSerializersWith(deSerializers);
      const fieldBuilder = new FieldBuilder(${
        entity.className
      }, this.deSerializers);
      this.schema = 
        ${getSchema(entity, service)}
      ;
    }
  
  entityConstructor = ${entity.className};
  
  requestBuilder(): ${entity.className}RequestBuilder<
    DeSerializers<${getGenericTypes(service.oDataVersion)}>
  > {
    return new ${entity.className}RequestBuilder(this);
  }
  
  entityBuilder(): EntityBuilderType<
    ${entity.className}<
      DeSerializers<${getGenericTypes(service.oDataVersion)}>
    >,
    DeSerializers<${getGenericTypes(service.oDataVersion)}>
  > {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
  ${entity.className}<
      DeSerializers<
      ${getGenericTypes(service.oDataVersion)}
      >
    >,
    DeSerializers<
    ${getGenericTypes(service.oDataVersion)}
    >,
    NullableT
  > {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    );
  }
}`;
}

function getGenericTypesWithDefault(oDataVersion: ODataVersion): string {
  return getGenericTypeAndDefault(oDataVersion)
    .map(typeAndDefault => `${typeAndDefault[0]} = ${typeAndDefault[1]}`)
    .join(`,${unixEOL}`);
}

function getGenericTypes(oDataVersion: ODataVersion): string {
  return getGenericTypeAndDefault(oDataVersion)
    .map(typeAndDefault => typeAndDefault[0])
    .join(`,${unixEOL}`);
}

function getGenericTypeAndDefault(oDataVersion: ODataVersion): string[][]{
  const nonCommonGenericTypeAndDefault = oDataVersion === 'v4' ?
    [['DateT', 'Moment'],
     ['DurationT', 'Duration'],
     ['TimeOfDayT', 'Time']
    ]
    :[
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
