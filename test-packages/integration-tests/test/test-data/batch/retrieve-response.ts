import { singleTestEntityResponse } from '../single-test-entity-response';
import { testEntityCollectionResponse } from '../test-entity-collection-response';
import { header200, retrieveHeader } from './header';

export const getAllResponse = [
  ...retrieveHeader(),
  '',
  header200(),
  '',
  JSON.stringify(testEntityCollectionResponse())
];

export const getByKeyResponse = [
  ...retrieveHeader(),
  '',
  header200(),
  '',
  JSON.stringify(singleTestEntityResponse())
];
