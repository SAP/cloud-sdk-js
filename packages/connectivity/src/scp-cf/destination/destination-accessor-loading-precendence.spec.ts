import { mockServiceBindings } from '../../../../../test-resources/test/test-util';
import { getDestination, useOrFetchDestination } from './destination-accessor';
import { registerDestination } from './destination-from-registration';
import { registerDestinationCache } from './register-destination-cache';
import type { DestinationWithName } from './destination-from-registration';
import type { MockServiceBindings } from '../../../../../test-resources/test/test-util';

function mockEnvDestinations() {
  process.env['destinations'] = JSON.stringify([
    testDestination('http://env-dest.com')
  ]);
}

function mockServiceBindingDestination(existingMock: MockServiceBindings) {
  const serviceBindings = {
    's4-hana-cloud': [
      {
        binding_name: null,
        credentials: {
          Authentication: 'BasicAuthentication',
          Password: '<redacted>',
          URL: 'https://service-binding-dest.com',
          User: 'adaa579f-3583-4812-a172-52a44194cb6f'
        },
        instance_name: 'instance-name',
        label: 's4-hana-cloud',
        name: destinationName,
        plan: 'some-plan',
        provider: null,
        syslog_drain_url: null,
        tags: ['s4-hana-cloud'],
        volume_mounts: []
      }
    ],
    ...existingMock
  };

  process.env.VCAP_SERVICES = JSON.stringify(serviceBindings);
}

const destinationName = 'TESTINATION';

function testDestination(url: string): DestinationWithName {
  return {
    name: destinationName,
    url
  };
}

describe('destination loading precedence', () => {
  beforeEach(() => {
    const serviceBindings = mockServiceBindings();
    mockEnvDestinations();
    mockServiceBindingDestination(serviceBindings);
    registerDestination(testDestination('http://register-dest.com'));
  });

  afterEach(() => {
    delete process.env['VCAP_SERVICES'];
    delete process.env['destinations'];
    registerDestinationCache.destination.clear();
    registerDestinationCache.mtls.clear();
  });

  it('retrieves env destinations first', async () => {
    const actual = await getDestination({
      destinationName
    });
    expect(actual?.url).toEqual('http://env-dest.com');
  });

  it('retrieves registered destinations second', async () => {
    delete process.env['destinations'];
    const actual = await getDestination({
      destinationName
    });

    expect(actual?.url).toEqual('http://register-dest.com');
  });

  it('retrieves service binding destinations third', async () => {
    delete process.env['destinations'];
    await registerDestinationCache.destination.clear();
    const actual = await getDestination({
      destinationName
    });
    expect(actual?.url).toEqual('https://service-binding-dest.com');
  });

  it('retrieves destinations from destination-service last', async () => {
    delete process.env['destinations'];
    await registerDestinationCache.destination.clear();
    mockServiceBindings();

    await expect(
      useOrFetchDestination({
        destinationName: 'non-existent',
        cacheVerificationKeys: false
      })
    ).rejects.toThrow(
      'Could not fetch client credentials token for service of type "destination".'
    );
  }, 15000);
});
