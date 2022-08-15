import { EntityBase } from '@sap-cloud-sdk/odata-common';

/**
 * Super class for all representations of OData v4 entity types.
 */
export class Entity extends EntityBase {
  readonly _oDataVersion: 'v4' = 'v4' as const;
}
