/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import nock = require('nock');
import { v4 as uuid } from 'uuid';
import { CreateRequestBuilderV4 } from '../../../src/odata/v4';
import { muteLoggers } from '../../test-util/mute-logger';
import {
  defaultDestination,
  mockCreateRequestV4
} from '../../test-util/request-mocker';
import {
  TestEntity,
  TestEntitySingleLink
} from '../../test-util/test-services/v4/test-service';
import { testPostRequestOutcome } from '../../test-util/testPostRequestOutcome';

describe('CreateRequestBuilderV4', () => {
  beforeAll(() => {
    muteLoggers('http-agent', 'entity-builder');
  });

  afterAll(() => {
    nock.cleanAll();
  });

  it('create an entity with field properties', async () => {
    const keyProp = uuid();
    const stringProp = 'testStr';
    const postBody = { KeyPropertyGuid: keyProp, StringProperty: stringProp };

    mockCreateRequestV4({
      responseBody: postBody
    });

    const entity = TestEntity.builder()
      .keyPropertyGuid(keyProp)
      .stringProperty(stringProp)
      .build();

    const actual = await new CreateRequestBuilderV4(TestEntity, entity).execute(
      defaultDestination
    );

    testPostRequestOutcome(actual, entity.setOrInitializeRemoteState());
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
