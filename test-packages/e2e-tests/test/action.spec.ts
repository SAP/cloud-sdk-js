import {
  createTestEntity,
  createTestEntityReturnId
} from '@sap-cloud-sdk/test-services-e2e/v4/admin-service/action-imports';
import { deleteEntity } from './test-utils/test-entity-operations';

const url = 'http://localhost:4004/';
const destination = { url };
const entityKey = 999;

describe('Action test', () => {
  beforeEach(async () => deleteEntity(entityKey, destination));

  it('should return entity', async () => {
    const response = await createTestEntity({ id: entityKey }).execute(
      destination
    );
    expect(response.keyTestEntity).toBe(entityKey);
  });

  it('should return single number', async () => {
    const response = await createTestEntityReturnId({ id: entityKey }).execute(
      destination
    );
    expect(response).toBe(entityKey);
  });
});
