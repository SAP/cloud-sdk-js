import { resolveDestinationWithType } from "./destination-accessor";
import { Destination } from "./destination-service-types";
import { pick } from "@sap-cloud-sdk/util";

describe('destination accessor', () => {
  const destination: Destination = {
    url: 'https://my.system.com',
    name: 'my-destination',
    proxyType: 'Internet',
    username: 'USER_NAME',
    password: 'password',
    authentication: 'BasicAuthentication',
    type: 'HTTP'
  };

  it('resolves destination when the destination type matches', async () => {
    const resolved = await resolveDestinationWithType(destination, 'HTTP');
    const keys = ['url', 'authentication', 'username', 'password'];
    expect(pick(keys, resolved)).toStrictEqual(pick(keys, destination));
  })

  it('throws an error, when destination type does not match', async () => {
    await expect(resolveDestinationWithType(destination, 'MAIL')).rejects.toThrowErrorMatchingSnapshot();
  })
})
