import { Destination } from '../../../connectivity/scp-cf';

/**
 * The path in the sub request should be serialized as an absolute or relative URL.
 */
export type BatchSubRequestPathType =
  | 'absolute'
  | 'relativeToService'
  | 'relativeToEntity';

/**
 * Options to configure batch serialization.
 */
export interface BatchRequestSerializationOptions {
  subRequestPathType?: BatchSubRequestPathType;
  destination?: Destination;
}
