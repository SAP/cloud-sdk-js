import { sanitizeDestination } from './destination';
import { useOrFetchDestination } from './destination-accessor';

function mockEnvDestinations() {
  process.env['destinations'] = JSON.stringify(environmentDestinations);
}

const environmentDestinations = [
  {
    name: 'TESTINATION',
    url: 'https://my.system.com',
    username: 'myuser',
    password: 'mypw'
  }
];
describe('destination loading precedence', () => {
  afterEach(() => {
    delete process.env['VCAP_SERVICES'];
    delete process.env['destinations'];
  });

  it('reads from env when only destinationName specified', async () => {
    mockEnvDestinations();

    const expected = sanitizeDestination(environmentDestinations[0]);
    const actual = await useOrFetchDestination(
      { destinationName: 'TESTINATION' },
      { cacheVerificationKeys: false }
    );
    expect(actual).toMatchObject(expected);
  });

  it('tries to build a destination from service bindings when there are no destinations mocked', async () => {
    const serviceBindings = {
      's4-hana-cloud': [
        {
          binding_name: null,
          credentials: {
            Authentication: 'BasicAuthentication',
            Password: '<redacted>',
            URL: 'https://my.system.com',
            User: 'adaa579f-3583-4812-a172-52a44194cb6f'
          },
          instance_name: 'instance-name',
          label: 'label',
          name: 'destination-name',
          plan: 'some-plan',
          provider: null,
          syslog_drain_url: null,
          tags: ['s4-hana-cloud'],
          volume_mounts: []
        }
      ]
    };

    process.env.VCAP_SERVICES = JSON.stringify(serviceBindings);

    const expectedXFS4cloud = {
      url: 'https://my.system.com',
      authentication: 'BasicAuthentication',
      username: 'adaa579f-3583-4812-a172-52a44194cb6f',
      password: '<redacted>'
    };

    expect(
      await useOrFetchDestination({ destinationName: 'destination-name' })
    ).toEqual(expectedXFS4cloud);

    delete process.env.VCAP_SERVICES;
  });

  it('tries to fetch destinations normally when neither the destinations env variables is there nor a service binding exists for a given name', async () => {
    await expect(
      useOrFetchDestination(
        { destinationName: 'non-existent' },
        { cacheVerificationKeys: false }
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Unable to get access token for \\"destination\\" service. No service instance of type \\"destination\\" found."'
    );
  });
});
