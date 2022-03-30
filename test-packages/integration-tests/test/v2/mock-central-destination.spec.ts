import { unlinkSync, writeFileSync } from 'fs';
import nock from 'nock';
import {
  mockAllTestDestinations,
  unmockAllTestDestinations
} from '@sap-cloud-sdk/test-util';
import { basicHeader } from '@sap-cloud-sdk/connectivity/internal';
import { testEntityCollectionResponse } from '../test-data/test-entity-collection-response';
import { testEntityApi } from './test-util';

describe('mockAllTestDestinations', () => {
  afterEach(() => {
    unmockAllTestDestinations();
    removeSystemAndCredentialsJsonDestinations();
  });

  it('getAll with destinations provided by systems and credentials json file should work', async () => {
    const getAllResponse = testEntityCollectionResponse();

    writeSystemAndCredentialsJsonDestinations(mockSystems, mockCredentials);

    mockAllTestDestinations();

    const destinationUrl = 'https://example.com';
    nock(destinationUrl, {
      reqheaders: {
        authorization: basicHeader('username', 'password'),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get('/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity')
      .reply(200, getAllResponse);

    const request = testEntityApi
      .requestBuilder()
      .getAll()
      .execute({ destinationName: 'SYS_001' });

    await expect(request).resolves.not.toThrow();
  });
});

const mockSystems = {
  systems: [
    {
      alias: 'SYS_001',
      uri: 'https://example.com'
    },
    {
      alias: 'SYS_002',
      uri: 'https://example.com',
      sapClient: '002'
    }
  ]
};

const mockCredentials = {
  credentials: [
    {
      alias: 'SYS_001',
      username: 'username',
      password: 'password'
    }
  ]
};

function writeSystemAndCredentialsJsonDestinations(systems, credentials) {
  writeFileSync('./systems.json', JSON.stringify(systems));
  writeFileSync('./credentials.json', JSON.stringify(credentials));
}

function removeSystemAndCredentialsJsonDestinations() {
  unlinkSync('./systems.json');
  unlinkSync('./credentials.json');
}
