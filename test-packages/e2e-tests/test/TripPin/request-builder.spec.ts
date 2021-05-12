import { any, deserializeEntityV4 } from '@sap-cloud-sdk/core';
import { resetDataSource } from '@sap-cloud-sdk/test-services-e2e/TripPin/microsoft-o-data-service-sample-trippin-in-memory-models-service/action-imports';
import { PersonGender } from '@sap-cloud-sdk/test-services-e2e/TripPin/microsoft-o-data-service-sample-trippin-in-memory-models-service/PersonGender';
import { People } from '@sap-cloud-sdk/test-services-e2e/TripPin/microsoft-o-data-service-sample-trippin-in-memory-models-service';

const url = 'https://services.odata.org/';
const destination = { url };

async function deletePerson(userName: string): Promise<void> {
  const queried = await People.requestBuilder()
    .getByKey(userName)
    .execute(destination);
  // The trippin service return not 404 exception but 204 if an entity is not found. Hence this check
  if (queried.userName) {
    return People.requestBuilder().delete(queried).execute(destination);
  }
}

function createPeople(userName: string): People {
  return People.builder()
    .firstName('SomeFirstName')
    .lastName('SomeLastName')
    .gender(PersonGender.Male)
    .userName(userName)
    .build();
}

xdescribe('Request builder', () => {
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

  it('should return a collection all friends of a person', async () => {
    const people = (
      await People.requestBuilder()
        .getByKey('russellwhyte')
        .appendPath('/Friends')
        .executeRaw(destination)
    ).data.value as any[];
    const actual = people.map(
      person => deserializeEntityV4(person, People) as People
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

    await People.requestBuilder().create(entity).execute(destination);

    const expected = await People.requestBuilder()
      .getByKey(myKey)
      .execute(destination);
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

    await People.requestBuilder().create(entity).execute(destination);

    const expected = await People.requestBuilder()
      .getByKey(keyRoot)
      .execute(destination);
    expect(expected.friends!.length).toBe(2);
    expect(expected.friends!.map(friend => friend.userName)).toEqual([
      keyChild1,
      keyChild2
    ]);
  }, 10000);
});
