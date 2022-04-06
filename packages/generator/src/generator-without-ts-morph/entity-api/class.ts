import { codeBlock } from '@sap-cloud-sdk/util';
import { VdmEntity, VdmServiceMetadata } from '../../vdm-types';
import {
  addNavigationPropertyFieldsFunction,
  navigationPropertyFieldsVariable
} from './navigation-properties';
import { getSchema } from './schema';
import { getSchemaType } from './schema-type';

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

  constructor(
    deSerializers: DeSerializersT = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
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
    return entityBuilder(this);
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
      this._schema = ${getSchema(entity)};
    }
  
    return this._schema;
  }
}`;
}
