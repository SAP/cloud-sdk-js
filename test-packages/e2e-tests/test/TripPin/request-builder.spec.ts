import { resetDataSource } from '@sap-cloud-sdk/test-services-e2e/TripPin/microsoft-o-data-service-sample-trippin-in-memory-models-service/action-imports';
import { PersonGender } from '@sap-cloud-sdk/test-services-e2e/TripPin/microsoft-o-data-service-sample-trippin-in-memory-models-service/PersonGender';
import {
  People,
  PeopleApi
} from '@sap-cloud-sdk/test-services-e2e/TripPin/microsoft-o-data-service-sample-trippin-in-memory-models-service';
import { deserializeEntity } from '@sap-cloud-sdk/odata-v4/internal';
import { any } from '@sap-cloud-sdk/odata-v4';

const url = 'https://services.odata.org/';
const destination = { url };
const entityBuilder = new PeopleApi().entityBuilder();
const requestBuilder = new PeopleApi().requestBuilder();
const schema = new PeopleApi().schema;

async function deletePerson(userName: string): Promise<void> {
  const queried = await requestBuilder.getByKey(userName).execute(destination);
  // The trippin service return not 404 exception but 204 if an entity is not found. Hence this check
  if (queried.userName) {
    return requestBuilder.delete(queried).execute(destination);
  }
}

function createPeople(userName: string): People {
  return entityBuilder
    .firstName('SomeFirstName')
    .lastName('SomeLastName')
    .gender(PersonGender.Male)
    .userName(userName)
    .build();
}

xdescribe('Request builder', () => {
  it('should return a collection of entities for get all request', async () => {
    const people = await requestBuilder
      .getAll()
      .expand(schema.FRIENDS)
      .execute(destination);
    expect(people).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          friends: expect.arrayContaining([expect.anything()])
        })
      ])
    );
  });

  it('should return a collection all friends of a person', async () => {
    const people = (
      await requestBuilder
        .getByKey('russellwhyte')
        .appendPath('/Friends')
        .executeRaw(destination)
    ).data.value as any[];
    const actual = people.map(
      person => deserializeEntity(person, new PeopleApi()) as People
    );
    expect(actual.length).toEqual(4);
    expect(actual).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userName: expect.anything()
        })
      ])
    );
  });

  it('should return a collection of entities with filtered one to many navigation properties', async () => {
    const people = await requestBuilder
      .getAll()
      .expand(
        schema.FRIENDS.filter(
          schema.FRIENDS.filter(any(schema.USER_NAME.equals('russellwhyte')))
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
    const result = await requestBuilder
      .getAll()
      .expand(schema.FRIENDS.expand(schema.FRIENDS))
      .execute(destination);
    expect(result[0].friends[0].friends[0]).not.toBe(undefined);
  });

  it('should create a simple entity without navigation properties', async () => {
    const myKey = 'KeyForCreation';
    await deletePerson(myKey);
    const entity = createPeople(myKey);
    // This is not a navigation property
    entity.addressInfo = [
      {
        address: 'Address1',
        city: { name: 'Berlin', countryRegion: 'DE', region: '' }
      },
      {
        address: 'Address2',
        city: { name: 'Paris', countryRegion: 'FR', region: '' }
      }
    ];

    await requestBuilder.create(entity).execute(destination);

    const expected = await requestBuilder.getByKey(myKey).execute(destination);
    expect(expected.addressInfo!.length).toBe(2);
    expect(expected.addressInfo!.map(address => address.address)).toEqual([
      'Address1',
      'Address2'
    ]);
  }, 10000);

  // This does not work for the demo service currently
  xit('should create a simple entity with navigation i.e. "deep create"', async () => {
    const keyRoot = 'KeyForCreationDeepRoot';
    const keyChild1 = 'KeyForCreationChild1';
    const keyChild2 = 'KeyForCreationChild2';
    await deletePerson(keyRoot);
    await deletePerson(keyChild1);
    await deletePerson(keyChild2);

    const entity = createPeople(keyRoot);
    entity.friends = [createPeople(keyChild1), createPeople(keyChild2)];

    await requestBuilder.create(entity).execute(destination);

    const expected = await requestBuilder
      .getByKey(keyRoot)
      .execute(destination);
    expect(expected.friends!.length).toBe(2);
    expect(expected.friends!.map(friend => friend.userName)).toEqual([
      keyChild1,
      keyChild2
    ]);
  }, 10000);
});
