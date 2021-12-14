import { codeBlock } from '@sap-cloud-sdk/util';
import { VdmEntity, VdmServiceMetadata } from '../../vdm-types';
import {
  getGenericTypesWithDefault,
  getGenericTypes
} from '../de-serializers-generic-types';
import {
  addNavigationPropertyFieldsFunction,
  navigationPropertyFieldsVariable
} from './navigation-properties';
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

  constructor(
    deSerializers: Partial<DeSerializers<${getGenericTypes(
      service.oDataVersion
    )}>> = defaultDeSerializers as any) {
    this.deSerializers = mergeDefaultDeSerializersWith(deSerializers);
  }

  ${navigationPropertyFieldsVariable(entity, service)}

  ${addNavigationPropertyFieldsFunction(entity, service)}
  
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

  get schema() {
    const fieldBuilder = new FieldBuilder(${
      entity.className
    }, this.deSerializers);
    return ${getSchema(entity, service)};
  }
}`;
}
