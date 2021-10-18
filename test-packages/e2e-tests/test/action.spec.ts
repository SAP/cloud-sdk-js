import {
  createTestEntityById,
  createTestEntityByIdReturnId
} from '@sap-cloud-sdk/test-services-e2e/v4/test-service/action-imports';
import {destination, timeOut} from './test-util';
import { deleteEntity } from './test-utils/test-entity-operations';

const entityKey = 999;

describe('action', () => {
  beforeEach(async () => deleteEntity(entityKey, destination));
  afterEach(async () => deleteEntity(entityKey, destination));

  it('should return entity', async () => {
    const response = await createTestEntityById({ id: entityKey })
      .skipCsrfTokenFetching()
      .execute(destination);
    expect(response.keyTestEntity).toBe(entityKey);
  },timeOut);

  it('should return single number', async () => {
    const response = await createTestEntityByIdReturnId({
      id: entityKey
    })
      .skipCsrfTokenFetching()
      .execute(destination);
    expect(response).toBe(entityKey);
  },timeOut);
});
