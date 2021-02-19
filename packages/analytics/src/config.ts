import { existsSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { createLogger, findProjectRoot } from '@sap-cloud-sdk/util';
import { UsageAnalyticsProjectConfig } from './analytics-types';
import { randomSalt } from './util';

const logger = createLogger('analytics');

/**
 * Name of the configuration file
 * @hidden
 */
export const configFileName = 'sap-cloud-sdk-analytics.json';

/**
 * Write the given configuration to the given path.
 * @param config - Config to be written
 * @param path - Path to write the config to. Defaults to the result of [[findConfigPath]]
 * @hidden
 */
export function writeConfig(
  config: UsageAnalyticsProjectConfig,
  path?: string
): void {
  // WriteConfig is only called from generateConfig (where a path is provided)
  // Or when the salt is missing and the config needs to be updated, so we can assume findConfigPath to find something
  const configPath = path ? resolve(path, configFileName) : findConfigPath()!;
  writeFileSync(configPath, JSON.stringify(config, undefined, 2), 'utf8');
}

/**
 * Find the path to the configuration file.
 * @returns The path to the config file if it exists and was found, otherwise `undefined`.
 * @hidden
 */
export function findConfigPath(): string | undefined {
  const path = findProjectRoot(resolve());
  if (path && existsSync(resolve(path, configFileName))) {
    return resolve(path, configFileName);
  }
}

/**
 * Create configuration and write to the given path.
 * @param path - Path to the directory in which a new config file should be generated.
 * @hidden
 */
export function generateConfig(path: string): void {
  if (existsSync(join(path, configFileName))) {
    logger.warn(
      `A ${configFileName} at path ${path} already exists. Skipping generation of new config file!`
    );
    return;
  }

  writeConfig(newConfig(), path);
}

/**
 * Validates the given config and updates it if necessary.
 *
 * @param config - The config to validate
 * @returns The config in a valid state.
 * @hidden
 */
export function enforceValidConfig(
  config: UsageAnalyticsProjectConfig
): UsageAnalyticsProjectConfig {
  if (!config.salt) {
    config.salt = randomSalt();
    writeConfig(config);
  }

  return config;
}

function newConfig(): UsageAnalyticsProjectConfig {
  return {
    enabled: true,
    salt: randomSalt()
  };
}
