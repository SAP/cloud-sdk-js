import { Destination } from '@sap-cloud-sdk/connectivity';
import {
  getTestDestinationByAlias,
  GetTestDestinationOptions,
  getTestDestinations
} from './test-destination-provider';

/**
 * Add a destination with the given name from the `systems.json` and `credentials.json` files to the `destinations` environment variable.
 *
 * Throws an error if a destination with the same name as the given test destination already exists.
 * @param name - Name of the test destination to add to the `destinations` environment variable
 * @param options - References to the `systems.json` and `credentials.json` files
 */
export function mockTestDestination(
  name: string,
  options?: GetTestDestinationOptions
): void {
  const mockedDestination = getTestDestinationByAlias(name, options);
  setTestDestination(mockedDestination);
}

/**
 * Set a given destination in the `destinations` environment variable.
 *
 * Throws an error if a destination with the same name as the given test destination already exists.
 * @param destination - Test destination to add to the `destinations` environment variable
 * @param options - References to the `systems.json` and `credentials.json` files
 */
export function setTestDestination(destination: Destination): void {
  const currentDestinations = getDestinationsFromEnv();
  const existingNames = new Set<string>(
    currentDestinations.map(dest => {
      if (!dest.name) {
        throw Error('The destination name is undefined.');
      }
      return dest.name;
    })
  );
  if (!destination.name) {
    throw Error('The destination name is undefined.');
  }
  validateNameAvailable(destination.name, existingNames);
  destination.isTestDestination = true;
  setDestinationsInEnv([...currentDestinations, destination]);
}

/**
 * Removes a destination with the given name from the destinations environment variable. If the given destination name is not found calling this function has no effect.
 * This function should be called to invert the behavior of [[mockTestDestination]]() and [[setTestDestination]]().
 * @param name - Name of the mocked destination to remove
 */
export function unmockTestDestination(name: string): void {
  const currentDestinations = getDestinationsFromEnv();
  const cleanedDestinations = currentDestinations.filter(
    destination => !(destination.isTestDestination && destination.name === name)
  );
  setDestinationsInEnv(cleanedDestinations);
}

/**
 * Add all destinations from the `systems.json` and `credentials.json` files to the `destinations` environment variable.
 *
 * Throws an error if a destination with the same name as the given test destinations already exists.
 * @param options - References to the `systems.json` and `credentials.json` files
 */
export function mockAllTestDestinations(
  options?: GetTestDestinationOptions
): void {
  const testDestinations = getTestDestinations(options);
  const currentDestinations = getDestinationsFromEnv();
  const existingNames = new Set<string>(
    currentDestinations.map(dest => {
      if (!dest.name) {
        throw Error('The destination name is undefined.');
      }
      return dest.name;
    })
  );
  testDestinations.forEach(dest => {
    if (!dest.name) {
      throw Error(
        "At least one of the provided destinations is missing a the 'name' property!"
      );
    }
    validateNameAvailable(dest.name, existingNames);
    currentDestinations.push(dest);
  });
  setDestinationsInEnv(currentDestinations);
}

/**
 * Removes all test destinations stored in `systems.json` and `credentials.json` files or added through [[setTestDestination]]() from the `destinations` environment variable.
 *
 * This function should be called to invert the behavior of [[mockAllTestDestinations]]() and other add single mocked destination functions.
 */
export function unmockAllTestDestinations(): void {
  const currentDestinations = getDestinationsFromEnv();
  const cleanedDestinations = currentDestinations.filter(
    destination => !destination.isTestDestination
  );
  setDestinationsInEnv(cleanedDestinations);
}

export function validateNameAvailable(
  destinationName: string,
  existingNames: Set<string>
): void {
  if (existingNames.has(destinationName)) {
    throw new Error(
      `Parsing mocked destinations failed, destination with name "${destinationName}" already exists in the "destinations" environment variables.`
    );
  }
}

export function setDestinationsInEnv(destinations: Destination[]): void {
  process.env['destinations'] = JSON.stringify(destinations);
}

function getDestinationsFromEnv(): Destination[] {
  try {
    const envDestinations = process.env['destinations'] || '[]';
    return JSON.parse(envDestinations);
  } catch (error) {
    throw new Error(
      `Destinations environment variable cannot be read: ${error.message}`
    );
  }
}
