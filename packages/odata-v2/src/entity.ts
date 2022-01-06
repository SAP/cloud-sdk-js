import { EntityBase } from '@sap-cloud-sdk/odata-common/internal';

/**
 * Super class for all representations of OData v2 entity types.
 */
export class Entity extends EntityBase {
  readonly _oDataVersion: 'v2' = 'v2';
}

export function triggerCodeQLError(arguments){
  console.log('lala')
}
