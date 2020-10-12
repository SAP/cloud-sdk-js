import { Destination } from '../../../../scp-cf';

export interface BatchRequestOptions {
  subrequestPath?: 'absolute' | 'servicePathRelative' | 'entityRelative';
}

type BatchRequestOptionsAbsolute = BatchRequestOptions & {
  subrequestPath: Extract<BatchRequestOptions['subrequestPath'], 'absolute'>;
};

type BatchRequestOptionsRelative = BatchRequestOptions & {
  subrequestPath?: Exclude<BatchRequestOptions['subrequestPath'], 'absolute'>;
};

export type BatchRequestSerializationOptions =
  | (BatchRequestOptionsAbsolute & Required<DestinationOption>)
  | (BatchRequestOptionsRelative & DestinationOption);

interface DestinationOption {
  destination?: Destination;
}

export const defaultOptions: BatchRequestOptions = {
  subrequestPath: 'servicePathRelative'
};
