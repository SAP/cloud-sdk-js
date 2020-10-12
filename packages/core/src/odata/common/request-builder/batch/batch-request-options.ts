import { Destination } from '../../../../scp-cf';

export interface BatchRequestOptions {
  subrequestPath: 'absolute' | 'servicePathRelative' | 'entityRelative';
}

export type BatchRequestSerializationOptions = BatchRequestOptions & {
  destination?: Destination;
};

export const defaultOptions: BatchRequestOptions = {
  subrequestPath: 'servicePathRelative'
};
