/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { any } from '@sap-cloud-sdk/core';
import { resetDataSource } from '@sap-cloud-sdk/test-services-e2e/TripPin/microsoft-o-data-service-sample-trippin-in-memory-models-service/action-imports';
import { People } from '../../../test-services-e2e/TripPin/microsoft-o-data-service-sample-trippin-in-memory-models-service';

const url = 'https://services.odata.org/';
const destination = { url };

xdescribe('Request builder test', () => {
  it('should return a collection of entities for get all request', async () => {
    const people = await People.requestBuilder()
      .getAll()
      .expand(People.FRIENDS)
      .execute(destination);
    expect(people).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          friends: expect.arrayContaining([expect.anything()])
        })
      ])
    );
  });

  it('should return a collection of entities with filtered one to many navigation properties', async () => {
    const people = await People.requestBuilder()
      .getAll()
      .expand(
        People.FRIENDS.filter(
          People.FRIENDS.filter(any(People.USER_NAME.equals('russellwhyte')))
        )
      )
      .execute(destination);

    expect(people).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          friends: expect.arrayContaining([expect.anything()])
        })
      ])
    );
  });

  it('should execute the simple unbound action in present in the tripping service', async () => {
    const result = await resetDataSource({}).execute(destination);
    expect(result).toBe(undefined);
  });

  it('should handle nested expands', async () => {
    const result = await People.requestBuilder()
      .getAll()
      .expand(People.FRIENDS.expand(People.FRIENDS))
      .execute(destination);
    expect(result[0].friends[0].friends[0]).not.toBe(undefined);
  });
});
