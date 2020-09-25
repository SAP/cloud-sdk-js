import nock = require('nock');
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { CreateRequestBuilderV4 } from '../../../src/odata/v4';
import {
  defaultDestination,
  mockCreateRequestV4
} from '../../test-util/request-mocker';
import {
  TestEntity,
  TestEntityMultiLink,
  TestEntityMultiLinkType,
  TestEntitySingleLink
} from '../../test-util/test-services/v4/test-service';
import { testPostRequestOutcome } from '../../test-util/testPostRequestOutcome';

describe('CreateRequestBuilderV4', () => {
  afterAll(() => {
    nock.cleanAll();
  });

  it('create an entity with field properties', async () => {
    const keyProp = uuid();
    const stringProp = 'testStr';
    const postBody = {
      KeyPropertyGuid: keyProp,
      StringProperty: stringProp,
      TimeOfDayProperty: '01:02:03',
      DateProperty: '1996-11-23'
    };

    mockCreateRequestV4({
      responseBody: postBody
    });

    const entity = TestEntity.builder()
      .keyPropertyGuid(keyProp)
      .stringProperty(stringProp)
      .timeOfDayProperty({ hours: 1, minutes: 2, seconds: 3 })
      .dateProperty(moment.utc('1996-11-23', 'YYYY-MM-DD', true))
      .build();

    const actual = await new CreateRequestBuilderV4(TestEntity, entity).execute(
      defaultDestination
    );

    testPostRequestOutcome(actual, entity.setOrInitializeRemoteState());
  });

  it('create an entity with multi link property (deep create)', async () => {
    const keyProp = uuid();
    const stringProp = 'testStr';
    const postBody = {
      KeyPropertyGuid: keyProp,
      StringProperty: stringProp,
      to_MultiLink: [{ KeyProperty: '123' }, { KeyProperty: '456' }]
    };

    const links: TestEntityMultiLinkType[] = [
      TestEntityMultiLink.builder().keyProperty('123').build(),
      TestEntityMultiLink.builder().keyProperty('456').build()
    ];

    mockCreateRequestV4({
      responseBody: postBody
    });

    const entity = TestEntity.builder()
      .keyPropertyGuid(keyProp)
      .stringProperty(stringProp)
      .toMultiLink(links)
      .build();

    const actual = await new CreateRequestBuilderV4(TestEntity, entity).execute(
      defaultDestination
    );

    expect(actual.toMultiLink.length).toBe(2);
    expect(actual.toMultiLink.map(link => link.keyProperty)).toEqual([
      '123',
      '456'
    ]);
  });

  it('create an entity with a single link property', async () => {
    const stringProp = 'test';
    const postBody = { to_SingleLink: { StringProperty: stringProp } };

    mockCreateRequestV4({
      responseBody: postBody
    });

    const entity = TestEntity.builder()
      .toSingleLink(
        TestEntitySingleLink.builder().stringProperty(stringProp).build()
      )
      .build();

    const actual = await new CreateRequestBuilderV4(TestEntity, entity).execute(
      defaultDestination
    );

    testPostRequestOutcome(actual, entity.setOrInitializeRemoteState());
  });
});
