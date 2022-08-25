import { existsSync, readdirSync, readFileSync } from 'fs';
import { join, parse, resolve, sep } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import { Destination } from '@sap-cloud-sdk/connectivity';

const logger = createLogger({
  package: 'test-util',
  messageContext: 'test-destination-provider'
});

const SYSTEMS_FILE = 'systems.json';
const CREDENTIALS_FILE = 'credentials.json';

/**
 * An interface to define `systems.json` and `credentials.json` for loading destinations.
 */
export interface GetTestDestinationOptions {
  /**
   * The path of the `systems.json` file.
   */
  systemsFilePath?: string;
  /**
   * The path of the `credentials.json` file.
   */
  credentialsFilePath?: string;
}

interface System {
  alias: string;
  uri: string;
  sapClient?: string;
}

interface SystemsFile {
  systems: System[];
}

interface Credentials {
  alias: string;
  username: string;
  password: string;
}

interface CredentialsFile {
  credentials: Credentials[];
}

const formatSystemJson = `Format of systems.json is:
{
  systems:[
  {
    alias:     A unique identifier. Used for matching a system and credentials.
    uri:       A unique resource identifier like "http://mySystem.com"
    sapClient?: The sap client as string e.g. "001"
  },...
  ]
}`;

const formatCredentials = `Format of credentials.json is:
{
  credentials:[
  {
    alias:     A unique identifier. Used for matching a system and credentials.
    username:  The username used for basic authentication.
    password: The password used for basic autentication.
  },...
  ]
}`;

/**
 * Loads a destination matching the provided alias stored in `systems.json` and `credentials.json`.
 * By default, this function starts looking in the directory the test process has been started in (i.e. '.')
 * and traverses the file hierarchy upwards until it finds a systems.json and credentials.json file.
 * Alternatively, you can supply paths to the systems and the credentials file directly.
 *
 * Throws an error when no systems.json can be found, the alias does not match any of the available destinations,
 * the JSON is malformed or one of the supplied paths is invalid.
 * Does not throw an error when no credentials.json can be found, but will print a warning.
 * @param alias - The alias identifying the destination.
 * @param options - References to the `systems.json` and `credentials.json` files.
 * @returns An array of destinations.
 */
export function getTestDestinationByAlias(
  alias: string,
  options?: GetTestDestinationOptions
): Destination {
  const destinations = getTestDestinations(options);
  const matchingDestination = destinations.find(d => d.name === alias);

  if (!matchingDestination) {
    throw new Error(
      `Couldn't find destination that matches the provided name "${alias}".
      The following destinations could be found: ${destinations
        .map(d => d.name)
        .join(', ')}`
    );
  }

  return matchingDestination;
}

/**
 * Loads all destinations stored in `systems.json` and `credentials.json` files.
 *
 * By default, this functions starts looking in the directory the test process has been started in (i.e. '.')
 * and traverses the file hierarchy upwards until it finds a systems.json and credentials.json file.
 * Alternatively, you can supply paths to the systems and the credentials file directly.
 *
 * Throws an error when no systems.json can be found, the JSON is malformed or one of the supplied paths is invalid.
 * Does not throw an error when no credentials.json can be found, but will print a warning.
 * @param options - References to the `systems.json` and `credentials.json` files.
 * @returns An array of destinations.
 */
export function getTestDestinations(
  options?: GetTestDestinationOptions
): Destination[] {
  const systems = readSystemsOrFail(options);
  const credentials = readCredentialsOrFail(options);

  return toDestinations(mergeSystemsAndCredentials(systems, credentials));
}

function readSystemsOrFail(options?: GetTestDestinationOptions): System[] {
  if (options && options.systemsFilePath) {
    if (!existsSync(options.systemsFilePath)) {
      throw new Error(
        `The provided path (${options.systemsFilePath}) to the systems file is invalid!`
      );
    }
    return readSystems(options.systemsFilePath).systems;
  }
  const foundPath = findFileSearchingUpwards(process.cwd(), SYSTEMS_FILE);

  if (!foundPath) {
    throw new Error(
      `No ${SYSTEMS_FILE} could be found when searching in directory ${process.cwd()} and upwards and no paths have been provided directly. ${formatSystemJson}`
    );
  }

  return readSystems(join(foundPath, SYSTEMS_FILE)).systems;
}

function readCredentialsOrFail(
  options?: GetTestDestinationOptions
): Credentials[] {
  if (options && options.credentialsFilePath) {
    if (existsSync(options.credentialsFilePath)) {
      return readCredentials(options.credentialsFilePath).credentials;
    }
    throw new Error(
      `The provided path (${options.credentialsFilePath}) to the credentials file is invalid!`
    );
  }

  const foundPath = findFileSearchingUpwards(process.cwd(), CREDENTIALS_FILE);

  if (foundPath && existsSync(join(foundPath, CREDENTIALS_FILE))) {
    return readCredentials(join(foundPath, CREDENTIALS_FILE)).credentials;
  }

  logger.warn(
    `No path to a ${CREDENTIALS_FILE} provided and none found next to ${foundPath}${sep}${SYSTEMS_FILE}. Proceeding without credentials.`
  );
  return [];
}

function mergeSystemsAndCredentials(systems, credentials) {
  return systems.map(system => ({
    ...system,
    ...credentials.find(cred => cred.alias === system.alias)
  }));
}

function toDestinations(systemsAndCredentials): Destination[] {
  return systemsAndCredentials.map(sysAndCred => ({
    name: sysAndCred.alias,
    url: sysAndCred.uri,
    username: sysAndCred.username,
    password: sysAndCred.password,
    sapClient: sysAndCred.sapClient,
    isTestDestination: true
  }));
}

function findFileSearchingUpwards(
  dir: string,
  fileName: string
): string | null {
  const files = readdirSync(dir);
  // TODO: use util method to find proper project root instead of the overall root
  const rootPath = parse(process.cwd()).root;

  if (files.includes(fileName)) {
    return dir;
  }

  if (dir === rootPath) {
    return null;
  }

  const oneDirUp = resolve(dir, '..');
  return findFileSearchingUpwards(oneDirUp, fileName);
}

function readSystems(filePath: string): SystemsFile {
  const systemfile = readJson(filePath) as SystemsFile;
  if (!systemfile.systems || systemfile.systems.length === 0) {
    throw new Error(`No systems provided in ${filePath}.
                     If you do not want to define systems just remove the file. ${formatSystemJson}`);
  }

  systemfile.systems.forEach(system => {
    if (!system.alias || !system.uri) {
      throw new Error(`A system in ${filePath} is not valid - Mandatory alias or url missing.
                       Broken entry is: ${JSON.stringify(
                         system
                       )}. ${formatSystemJson}`);
    }
  });
  return systemfile;
}

function readCredentials(filePath: string): CredentialsFile {
  const credentialsFile = readJson(filePath) as CredentialsFile;
  if (
    !credentialsFile.credentials ||
    credentialsFile.credentials.length === 0
  ) {
    throw new Error(`No credentials provided in ${filePath}.
                     If you do not want to define credentials just remove the file. ${formatCredentials}`);
  }

  credentialsFile.credentials.forEach(cred => {
    if (!cred.alias || !cred.username || !cred.password) {
      throw new Error(`A credential in ${filePath} is not valid - Mandatory alias, username or password missing.
                       Broken entry is: ${JSON.stringify(
                         cred
                       )}. ${formatCredentials}`);
    }
  });
  return credentialsFile;
}

function readJson(filePath: string): { [key: string]: any } {
  let content;
  try {
    content = readFileSync(filePath, 'utf8');
  } catch (error) {
    throw new Error(
      `Failed to read file at path: ${filePath}.
      Original error: ${error.message}`
    );
  }

  try {
    return JSON.parse(content);
  } catch (error) {
    throw new Error(
      `File read from path ${filePath} is not valid JSON.
      Original error: ${error.message}`
    );
  }
}
