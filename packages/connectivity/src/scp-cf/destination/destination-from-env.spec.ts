import * as assert from 'assert';
import { createLogger, encodeBase64 } from '@sap-cloud-sdk/util';
import { JwtHeader, JwtPayload } from 'jsonwebtoken';
import {
  mockDestinationsEnv,
  unmockDestinationsEnv
} from '../../../../../test-resources/test/test-util/request-mocker';
import { Destination } from './destination-service-types';
import {
  getDestinationFromEnvByName,
  getDestinationsFromEnv
} from './destination-from-env';
import { getDestination } from './destination-accessor';
import {registerDestination} from "./destination-from-register";

const environmentDestination = {
  name: 'FINAL-DESTINATION',
  url: 'https://mys4hana.com',
  username: 'myuser',
  password: 'mypw'
};

const destinationFromEnv: Destination = {
  authTokens: [],
  authentication: 'BasicAuthentication',
  name: 'FINAL-DESTINATION',
  isTrustingAllCertificates: false,
  originalProperties: {
    name: 'FINAL-DESTINATION',
    url: 'https://mys4hana.com',
    username: 'myuser',
    password: 'mypw'
  },
  password: 'mypw',
  username: 'myuser',
  url: 'https://mys4hana.com'
};



const environmentDestinationConfig = {
  Name: 'TESTINATION',
  URL: 'https://mys4hana.com'
};

const destinationFromConfigEnv: Destination = {
  authTokens: [],
  authentication: 'NoAuthentication',
  name: 'TESTINATION',
  isTrustingAllCertificates: false,
  originalProperties: {
    Name: 'TESTINATION',
    URL: 'https://mys4hana.com'
  },
  url: 'https://mys4hana.com'
};

describe('env-destination-accessor', () => {
  afterEach(() => {
    unmockDestinationsEnv();
    jest.resetAllMocks();
  });


  describe('getDestinationsFromEnv()', () => {

    it('infos if destination are read from enviorment and forwardAuthToken is not enabled.', async () => {
      mockDestinationsEnv(destinationFromEnv);

      const logger = createLogger('env-destination-accessor');
      const infoSpy = jest.spyOn(logger, 'info');
      await getDestination({ destinationName: 'FINAL-DESTINATION' });
      expect(infoSpy).toHaveBeenCalledWith(
          expect.stringMatching(
              /Successfully retrieved destination 'FINAL-DESTINATION' from environment variable./
          )
      );
    });

    it('should return all destinations from environment variables', () => {
      mockDestinationsEnv(environmentDestination, environmentDestinationConfig);

      const expected = [destinationFromEnv, destinationFromConfigEnv];
      const actual = getDestinationsFromEnv();
      expected.forEach((e, index) => {
        expect(actual[index]).toMatchObject(e);
      });
    });

    it('should return an empty array if no destinations can be found', () => {
      assert.deepEqual([], getDestinationsFromEnv());
    });

    it('should log a warning when destinations exist but do not contain a `name` or `Name` key', () => {
      const destinationMissingName = { url: 'example.com' };
      mockDestinationsEnv(environmentDestination, destinationMissingName);
      const logger = createLogger('env-destination-accessor');
      const warnSpy = jest.spyOn(logger, 'warn');

      getDestinationsFromEnv();
      expect(warnSpy).toBeCalledWith(
        expect.stringMatching(
          "Destination from 'destinations' env variable is missing 'name' or 'Name' property."
        )
      );
    });
  });

  describe('getDestinationByName()', () => {
    it('should return a destination for a name', () => {
      mockDestinationsEnv(environmentDestination);

      const actual = getDestinationFromEnvByName('FINAL-DESTINATION');
      expect(actual).toMatchObject(destinationFromEnv);
    });

    it('should return a destination for a name, that is given as a destination configuration', () => {
      mockDestinationsEnv(environmentDestinationConfig);

      const actual = getDestinationFromEnvByName('TESTINATION');
      expect(actual).toMatchObject(destinationFromConfigEnv);
    });

    it('should return null when no destination can be found', () => {
      const expected = null;
      const actual = getDestinationFromEnvByName('FINAL-DESTINATION');

      assert.equal(actual, expected, 'Expected null, but got something.');
    });

    it('should log a warning when there are multiple destinations for the given name', () => {
      mockDestinationsEnv(environmentDestination, {
        Name: 'FINAL-DESTINATION',
        URL: 'example.com'
      });

      const logger = createLogger('env-destination-accessor');
      const warnSpy = jest.spyOn(logger, 'warn');

      getDestinationFromEnvByName('FINAL-DESTINATION');
      expect(warnSpy).toBeCalledWith(
        "The 'destinations' env variable contains multiple destinations with the name 'FINAL-DESTINATION'. Only the first entry will be respected."
      );
    });

    it('should take the first destination if multiple have the same name', () => {
      mockDestinationsEnv(
        {
          Name: 'FINAL-DESTINATION',
          URL: 'example-1.com'
        },
        {
          Name: 'FINAL-DESTINATION-DIFFERENT',
          URL: 'example-2.com'
        },
        {
          Name: 'FINAL-DESTINATION',
          URL: 'example-3.com'
        }
      );

      expect(getDestinationFromEnvByName('FINAL-DESTINATION')!.url).toEqual(
        'example-1.com'
      );
    });

    it('should throw for ill formatted JSON', () => {
      process.env.destinations = 'Improper JSON string';
      expect(() => getDestinationsFromEnv()).toThrowErrorMatchingInlineSnapshot(
        '"Error in parsing the destinations from the environment variable."'
      );
    });
  });
});

describe('registerDestination', () => {
  const mockDestination = {
    name: 'MockedDestination',
    url: 'https://example.com'
  };

  const mockDestinationFromEnv: Destination = {
    name: 'MockedDestination',
    url: 'https://example.com',
    authTokens: [],
    certificates: [],
    authentication: 'NoAuthentication',
    isTrustingAllCertificates: false,
    originalProperties: {
      name: 'MockedDestination',
      url: 'https://example.com',
      authTokens: [],
      certificates: [],
      authentication: 'NoAuthentication',
      isTrustingAllCertificates: false
    }
  };

  afterEach(() => {
    unmockDestinationsEnv();
    jest.resetAllMocks();
  });

  // it('should set the destination in the environment variables', () => {
  //   mockDestinationsEnv(environmentDestination);
  //
  //   registerDestination(mockDestination);
  //   const actual = getDestinationsFromEnv();
  //
  //   const expected = [destinationFromEnv, mockDestination];
  //   expected.forEach((e, index) => {
  //     expect(actual[index]).toMatchObject(e);
  //   });
  //   expect(
  //     getDestination({ destinationName: 'MockedDestination' })
  //   ).resolves.toMatchObject(mockDestinationFromEnv);
  // });

  // it('should throw an exception if a name conflict occurs', () => {
  //   registerDestination(mockDestination);
  //   expect(() => {
  //     registerDestination(mockDestination);
  //   }).toThrowErrorMatchingInlineSnapshot(
  //     '"Parsing destinations failed, destination with name \\"MockedDestination\\" already exists in the \\"destinations\\" environment variables."'
  //   );
  // });
});
