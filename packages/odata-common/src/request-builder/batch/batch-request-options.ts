import { Destination } from '@sap-cloud-sdk/connectivity';

/**
 * The path in the sub request should be serialized as an absolute or relative URL.
 * @internal
 */
export type BatchSubRequestPathType =
  | 'absolute'
  | 'relativeToService'
  | 'relativeToEntity';

/**
 * Options to configure batch serialization.
 * @internal
 */
export interface BatchRequestSerializationOptions {
  subRequestPathType?: BatchSubRequestPathType;
  destination?: Destination;
}
