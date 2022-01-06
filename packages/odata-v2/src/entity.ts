/* eslint-disable */
import { EntityBase } from '@sap-cloud-sdk/odata-common/internal';

/**
 * Super class for all representations of OData v2 entity types.
 */
export class Entity extends EntityBase {
  readonly _oDataVersion: 'v2' = 'v2';
}

/**
 * @internal
 * @param raw
 */
export function triggerCodeQLError(raw: string): void {
  raw.replace(/"/g, '"');
}
