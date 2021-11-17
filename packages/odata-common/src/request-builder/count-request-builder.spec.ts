import { createLogger } from '@sap-cloud-sdk/util';
import { TestEntity as TestEntityV2 } from '@sap-cloud-sdk/test-services/v2/test-service';
import {
  Filter,
  GetAllRequestBuilderBase
} from '@sap-cloud-sdk/odata-common/internal';
import { TestEntity as TestEntityV4 } from '@sap-cloud-sdk/test-services/v4/test-service';
import { Destination } from '@sap-cloud-sdk/connectivity';
import nock from 'nock';
import {
  defaultDestination,
  defaultHost
} from '../../../../test-resources/test/test-util/request-mocker';

export function mockCountRequest(
  destination: Destination,
  count: number,
  getAllRequest:
    | GetAllRequestBuilderBase<any>
    | GetAllRequestBuilderBase<any> = TestEntityV2.requestBuilder().getAll()
) {
  const servicePath = getAllRequest._entityConstructor._defaultServicePath;
  const entityName = getAllRequest._entityConstructor._entityName;
  return nock(defaultHost)
    .get(`${destination.url}${servicePath}/${entityName}/$count`)
    .reply(200, count.toString());
}

describe('CountRequestBuilderV2', () => {
  const requestBuilders = [
    TestEntityV2.requestBuilder(),
    TestEntityV4.requestBuilder()
  ];

  describe('url', () => {
    it('is built basic count correctly', async () =>
      Promise.all(
        requestBuilders.map(async requestBuilder => {
          const expected =
            '/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity/$count';
          const actual = await requestBuilder
            .getAll()
            .count()
            .url(defaultDestination);
          expect(actual).toBe(expected);
        })
      ));

    it('is works also with additional parameters', async () =>
      Promise.all(
        requestBuilders.map(async requestBuilder => {
          const expected =
            "/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity/$count?$filter=(SomeProp%20eq%20'test')";
          const actual = await requestBuilder
            .getAll()
            .filter(
              new Filter<any, any>('SomeProp', 'eq', 'test', 'Edm.String')
            )
            .count()
            .url(defaultDestination);
          expect(actual).toBe(expected);
        })
      ));

    it('ignores methods which must not affect count like $format, $top, $skip', async () =>
      Promise.all(
        requestBuilders.map(async requestBuilder => {
          const expected =
            '/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity/$count';
          const actual = await requestBuilder
            .getAll()
            .top(1)
            .skip(1)
            .count()
            .url(defaultDestination);
          expect(actual).toBe(expected);
        })
      ));

    it('warns the users if parameters are ignored in count', async () => {
      const logger = createLogger({
        messageContext: 'count-request-config'
      });
      const warnSpy = jest.spyOn(logger, 'warn');
      await TestEntityV4.requestBuilder()
        .getAll()
        .top(1)
        .count()
        .url(defaultDestination);
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy).toHaveBeenCalledWith(
        'The query parameter $top must not be used in a count request and has been ignored.'
      );
    });
  });

  describe('parsing', () => {
    it('parses the raw number of count response', async () =>
      Promise.all(
        requestBuilders.map(async requestBuilder => {
          mockCountRequest(
            defaultDestination,
            4711,
            TestEntityV4.requestBuilder().getAll()
          );
          const count = await requestBuilder
            .getAll()
            .count()
            .execute(defaultDestination);
          expect(count).toBe(4711);
        })
      ));
  });

  describe('executeRaw', () => {
    it('returns request and raw response', async () =>
      Promise.all(
        requestBuilders.map(async requestBuilder => {
          mockCountRequest(
            defaultDestination,
            4711,
            TestEntityV4.requestBuilder().getAll()
          );
          const actual = await requestBuilder
            .getAll()
            .count()
            .executeRaw(defaultDestination);
          expect(actual.data).toEqual(4711);
          expect(actual.request.method).toBe('GET');
        })
      ));
  });
});
