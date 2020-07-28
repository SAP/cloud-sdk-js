/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { any } from '@sap-cloud-sdk/core/v4';
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
});
