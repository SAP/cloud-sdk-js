import { codeBlock, unixEOL } from '@sap-cloud-sdk/util';
import { VdmEntity } from '../../vdm-types';
import { getSchema } from './schema';

export function classContent(entity: VdmEntity): string {
  return codeBlock`export class ${
    entity.className
  }Api<${getGenericTypesWithDefault()}> implements 
    EntityApi<
      ${entity.className}<
        DeSerializers<${getGenericTypes()}>
      >, 
      DeSerializers<${getGenericTypes()}>
    > {
  public deSerializers: DeSerializers<${getGenericTypes()}>;
  public schema;

  constructor(
    deSerializers: Partial<DeSerializers<${getGenericTypes()}>> = defaultDeSerializers as any) {
      this.deSerializers = mergeDefaultDeSerializersWith(deSerializers);
      const fieldBuilder = new FieldBuilder(${
        entity.className
      }, this.deSerializers);
      this.schema = 
        ${getSchema(entity)}
      ;
    }
  
  entityConstructor = ${entity.className};
  
  requestBuilder(): ${entity.className}RequestBuilder<
    DeSerializers<${getGenericTypes()}>
  > {
    return new ${entity.className}RequestBuilder(this);
  }
  
  entityBuilder(): EntityBuilderType<
    ${entity.className}<
      DeSerializers<${getGenericTypes()}>
    >,
    DeSerializers<${getGenericTypes()}>
  > {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
  ${entity.className}<
      DeSerializers<
      ${getGenericTypes()}
      >
    >,
    DeSerializers<
    ${getGenericTypes()}
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

function getGenericTypesWithDefault(): string {
  return genericTypeAndDefault
    .map(typeAndDefault => `${typeAndDefault[0]} = ${typeAndDefault[1]}`)
    .join(`,${unixEOL}`);
}
function getGenericTypes(): string {
  return genericTypeAndDefault
    .map(typeAndDefault => typeAndDefault[0])
    .join(`,${unixEOL}`);
}

const genericTypeAndDefault: string[][] = [
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
  ['DateTimeT', 'Moment'],
  ['DateTimeOffsetT', 'Moment'],
  ['TimeT', 'Time']
];
