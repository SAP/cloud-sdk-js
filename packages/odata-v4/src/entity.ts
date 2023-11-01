import { EntityBase } from '@sap-cloud-sdk/odata-common';
import { nonEnumerable } from '@sap-cloud-sdk/odata-common/internal';

/**
 * Super class for all representations of OData v4 entity types.
 */
export class Entity extends EntityBase {
  readonly _oDataVersion: 'v4';

  constructor(_entityApi: any) {
    super(_entityApi);
    this._oDataVersion = 'v4' as const;
    nonEnumerable(this, '_oDataVersion');
  }
}
