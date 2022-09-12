import { errorResponse } from '../error-response';
import { header400, header404, retrieveHeader } from './header';

export const errorRetrieveResponse = [
  ...retrieveHeader(),
  '',
  header404(),
  '',
  JSON.stringify(errorResponse())
];

export const errorChangesetResponse = [
  ...retrieveHeader(),
  '',
  header400(),
  '',
  JSON.stringify(errorResponse())
];
