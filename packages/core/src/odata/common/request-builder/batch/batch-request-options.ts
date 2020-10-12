import { Destination } from '../../../../scp-cf';
interface BatchRequestOptionsAbsolute {
  subrequestPath: 'absolute';
}

interface BatchRequestOptionsRelative {
  subrequestPath?: 'relativeToService' | 'relativeToEntity';
}

interface DestinationOption {
  destination?: Destination;
}

/**
 * Options to configure batch requests.
 */
export interface BatchRequestOptions {
  /**
   * The path in the sub request should be serialized as an absolute or relative url.
   */
  subrequestPath?: 'absolute' | 'relativeToService' | 'relativeToEntity';
}

/**
 * Options to configure batch serialization.
 */
export type BatchRequestSerializationOptions =
  | (BatchRequestOptionsAbsolute & Required<DestinationOption>)
  | (BatchRequestOptionsRelative & DestinationOption);

export const defaultOptions: BatchRequestSerializationOptions = {
  subrequestPath: 'relativeToService'
};
