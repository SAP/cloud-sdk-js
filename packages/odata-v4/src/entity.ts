import { EntityBase } from '@sap-cloud-sdk/odata-common/internal';
import {DeSerializers} from "@sap-cloud-sdk/odata-common/dist/de-serializers";
import {DefaultDeSerializers} from "./de-serializers";
import {EntityApi as EntityApiCommon} from "@sap-cloud-sdk/odata-common/internal";

/**
 * Super class for all representations of OData v4 entity types.
 */
export abstract class Entity extends EntityBase {
  readonly _oDataVersion: 'v4' = 'v4';
}
