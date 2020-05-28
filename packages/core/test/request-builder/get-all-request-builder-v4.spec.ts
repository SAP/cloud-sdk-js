/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { GetAllRequestBuilder } from '../../src/odata/v4/request-builder/get-all-request-builder';
import { muteLoggers } from '../test-util/mute-logger';
import {
  defaultDestination,
  mockGetRequest,
  unmockDestinationsEnv
} from '../test-util/request-mocker';
import {
  createPerson,
  createPersonJson1,
  createPersonJson2
} from '../test-util/test-data-trip-service';
import { Person } from '../test-util/test-services/v4/trip-service/Person';

describe('GetAllRequestBuilder', () => {
  let requestBuilder: GetAllRequestBuilder<Person>;

  beforeAll(() => {
    muteLoggers('http-agent', 'destination-accessor', 'environment-accessor');
  });

  afterEach(() => {
    unmockDestinationsEnv();
  });

  beforeEach(() => {
    requestBuilder = new GetAllRequestBuilder(Person);
  });

  describe('url', () => {
    it('is built correctly', async () => {
      const expected = '/testination/TripPinRESTierService/Person?$format=json';
      const actual = await requestBuilder.url(defaultDestination);
      expect(actual).toBe(expected);
    });
  });

  describe('execute', () => {
    it('returns all entities', async () => {
      const person1 = createPersonJson1();
      const person2 = createPersonJson2();

      mockGetRequest(
        {
          responseBody: { value: [person1, person2] }
        },
        Person
      );

      const actual = await new GetAllRequestBuilder(Person).execute(
        defaultDestination
      );
      expect(actual).toEqual([createPerson(person1), createPerson(person2)]);
    });

    it('top(1) returns the first entity', async () => {
      const entityData1 = createPersonJson1();
      mockGetRequest(
        {
          query: { $top: 1 },
          responseBody: { value: [entityData1] }
        },
        Person
      );

      const actual = await requestBuilder.top(1).execute(defaultDestination);
      expect(actual).toEqual([createPerson(entityData1)]);
    });

    it('skip(1) skips the first entity', async () => {
      const entityData2 = createPersonJson2();
      mockGetRequest(
        {
          query: { $skip: 1 },
          responseBody: { value: [entityData2] }
        },
        Person
      );
      const actual = await requestBuilder.skip(1).execute(defaultDestination);
      expect(actual).toEqual([createPerson(entityData2)]);
    });
  });
});
