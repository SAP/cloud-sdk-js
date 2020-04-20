/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { asc, Destination } from '@sap-cloud-sdk/core';
import {
  TestComplexType,
  TestEntity
} from '@sap-cloud-sdk/test-services/test-service';
import BigNumber from 'bignumber.js';
import nock from 'nock';
import { testEntityCollectionResponse } from './test-data/test-entity-collection-response';
import { basicCredentials } from './test-util/destination-encoder';

const servicePath = '/sap/opu/odata/sap/API_TEST_SRV';
const entityName = TestEntity._entityName;

const getAllResponse = testEntityCollectionResponse();

const destination: Destination = {
  url: 'https://example.com',
  username: 'username',
  password: 'password',
  sapClient: '123',
  authTokens: [],
  originalProperties: {}
};

describe('Complex types', () => {
  it('should allow filtering on complex type properties', async () => {
    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(
        `${servicePath}/${entityName}?$format=json&$filter=(ComplexTypeProperty/StringProperty%20eq%20%27someComplexTypeProperty%27)`
      )
      .reply(200, getAllResponse);

    const request = TestEntity.requestBuilder()
      .getAll()
      .filter(
        TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.equals(
          'someComplexTypeProperty'
        )
      )
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should allow ordering on complex type properties', async () => {
    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(
        `${servicePath}/${entityName}?$format=json&$orderby=ComplexTypeProperty/StringProperty%20asc`
      )
      .reply(200, getAllResponse);

    const request = TestEntity.requestBuilder()
      .getAll()
      .orderBy(asc(TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty))
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should be constructable by a builder', () => {
    const actual = TestComplexType.build({
      StringProperty: 'random value',
      BooleanProperty: false,
      GuidProperty: 'aaaabbbb-aaaa-bbbb-aaaa-bbbbaaaabbbb',
      Int16Property: 4,
      Int32Property: 6,
      Int64Property: '54',
      TimeProperty: 'PT11H43M43S'
    });

    const expected = {
      stringProperty: 'random value',
      booleanProperty: false,
      guidProperty: 'aaaabbbb-aaaa-bbbb-aaaa-bbbbaaaabbbb',
      int16Property: 4,
      int32Property: 6,
      int64Property: new BigNumber(54),
      timeProperty: { hours: 11, minutes: 43, seconds: 43 }
    };

    expect(actual).toMatchObject(expected);
  });

  it('should fail when passing unknown properties to the builder', () => {
    expect(() =>
      TestComplexType.build({ SomethingElse: 'Fails!' })
    ).toThrowErrorMatchingSnapshot();
  });
});
