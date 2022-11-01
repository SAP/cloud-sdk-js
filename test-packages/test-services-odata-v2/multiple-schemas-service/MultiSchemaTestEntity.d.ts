/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType
} from '@sap-cloud-sdk/odata-v2';
import type { MultiSchemaTestEntityApi } from './MultiSchemaTestEntityApi';
/**
 * This class represents the entity "MultiSchemaTestEntity" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export declare class MultiSchemaTestEntity<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements MultiSchemaTestEntityType<T>
{
  readonly _entityApi: MultiSchemaTestEntityApi<T>;
  /**
   * Technical entity name for MultiSchemaTestEntity.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * All key fields of the MultiSchemaTestEntity entity
   */
  static _keys: string[];
  /**
   * Key Property.
   */
  keyProperty: DeserializedType<T, 'Edm.String'>;
  constructor(_entityApi: MultiSchemaTestEntityApi<T>);
}
export interface MultiSchemaTestEntityType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
//# sourceMappingURL=MultiSchemaTestEntity.d.ts.map
