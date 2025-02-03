import { codeBlock, documentationBlock } from '@sap-cloud-sdk/util';
import {
  addNavigationPropertyFieldsFunction,
  navigationPropertyFieldsVariable
} from './navigation-properties';
import { getSchema } from './schema';
import { getSchemaType } from './schema-type';
import type { VdmEntity, VdmServiceMetadata } from '../../vdm-types';

/**
 * @internal
 */
export function classContent(
  entity: VdmEntity,
  service: VdmServiceMetadata
): string {
  return codeBlock`export class ${
    entity.className
  }Api<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements 
    EntityApi<
      ${entity.className}<
        DeSerializersT
      >, 
      DeSerializersT
    > {
  public deSerializers: DeSerializersT;

  private constructor(
    deSerializers: DeSerializersT = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }
  
  ${documentationBlock`Do not use this method or the constructor directly.
Use the service function as described in the documentation to get an API instance.`}  
  public static _privateFactory<DeSerializersT extends DeSerializers = DefaultDeSerializers>(  deSerializers: DeSerializersT = defaultDeSerializers as any):${
    entity.className
  }Api<DeSerializersT> {
    return new ${entity.className}Api(deSerializers)
  }

  ${navigationPropertyFieldsVariable(entity, service)}

  ${addNavigationPropertyFieldsFunction(entity, service)}
  
  entityConstructor = ${entity.className};
  
  requestBuilder(): ${entity.className}RequestBuilder<
    DeSerializersT
  > {
    return new ${entity.className}RequestBuilder<DeSerializersT>(this);
  }
  
  entityBuilder(): EntityBuilderType<
    ${entity.className}<
      DeSerializersT
    >,
    DeSerializersT
  > {
    return entityBuilder<${
      entity.className
    }<DeSerializersT>, DeSerializersT>(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
  ${entity.className}<
      DeSerializersT>,
    DeSerializersT,
    NullableT
  > {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  private _fieldBuilder?: FieldBuilder<typeof ${
    entity.className
  }, DeSerializersT>;
  get fieldBuilder() {
    if(!this._fieldBuilder){
      this._fieldBuilder = new FieldBuilder(${
        entity.className
      }, this.deSerializers);
    }
    return this._fieldBuilder;
  }

  private _schema?: ${getSchemaType(entity, service)};

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = ${getSchema(entity, service)};
    }
  
    return this._schema;
  }
}`;
}
