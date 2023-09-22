import { EntityBase } from '@sap-cloud-sdk/odata-common';
import { nonEnumerable } from '@sap-cloud-sdk/odata-common/internal';

/**
 * Super class for all representations of OData v2 entity types.
 */
export class Entity extends EntityBase {
  readonly _oDataVersion: 'v2';

  constructor(_entityApi: any) {
    super(_entityApi);
    this._oDataVersion = 'v2' as const;
    nonEnumerable(this, '_oDataVersion');
  }
}
