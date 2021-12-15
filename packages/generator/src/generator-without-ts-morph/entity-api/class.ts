import { codeBlock } from '@sap-cloud-sdk/util';
import { VdmEntity, VdmServiceMetadata } from '../../vdm-types';
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
  }Api<T extends DeSerializers = DefaultDeSerializers> implements 
    EntityApi<
      ${entity.className}<
        T
      >, 
      T
    > {
  public deSerializers: T;

  constructor(
    deSerializers: T = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }

  ${navigationPropertyFieldsVariable(entity, service)}

  ${addNavigationPropertyFieldsFunction(entity, service)}
  
  entityConstructor = ${entity.className};
  
  requestBuilder(): ${entity.className}RequestBuilder<
    T
  > {
    return new ${entity.className}RequestBuilder(this);
  }
  
  entityBuilder(): EntityBuilderType<
    ${entity.className}<
      T
    >,
    T
  > {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
  ${entity.className}<
      T>,
    T,
    NullableT
  > {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  get schema() {
    const fieldBuilder = new FieldBuilder(${
      entity.className
    }, this.deSerializers);
    return ${getSchema(entity, service)};
  }
}`;
}
