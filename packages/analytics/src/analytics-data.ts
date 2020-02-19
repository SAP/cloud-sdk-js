/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { findProjectRoot, MapType } from '@sap-cloud-sdk/util';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { UsageAnalyticsProjectConfig } from './analytics-types';
import { enforceValidConfig } from './config';
import { hash } from './util';

const sdkModulePrefix = '@sap';

/**
 * Collects insensitive data for SAP Web Analytics.
 * For details, check the following blog post: https://blogs.sap.com/2018/10/23/usage-analytics-s4sdk/
 * @param config Usage analytics config of the given project
 * @returns An object that includes information on project development environment
 * @hidden
 */
export async function getAnalyticsData(config: UsageAnalyticsProjectConfig): Promise<AnalyticsData> {
  const projectRootDir = findProjectRoot(path.resolve());
  const packageJson = JSON.parse(fs.readFileSync(path.resolve(projectRootDir, 'package.json'), 'utf8'));

  return {
    project_id: getProjectIdentifier(config, packageJson),
    os: Object.values(getOperatingSystemInfo()).join(','),
    node: getNodeVersion(),
    npm: getNpmVersion(),
    typescript: usesTypeScript(packageJson),
    sdk_dependencies: getSapCloudSdkDependencies(packageJson),
    third_party_dependencies: getThirdPartyDependencies(packageJson)
  }; // SWA expects a certain column order: please do not change the order of this object!
}

export function getProjectIdentifier(config: UsageAnalyticsProjectConfig, packageJson: PackageJson): string {
  if (!config.salt) {
    throw Error('Salt is missing in config!');
  }

  config = enforceValidConfig(config);
  const projectName = packageJson.name + config.salt;
  return hash(projectName);
}

function usesTypeScript(packageJson: PackageJson): string {
  const mergedDeps = { ...packageJson.dependencies, ...packageJson.devDependencies } as MapType<string>;
  return mergedDeps.typescript ? 'true' : 'false';
}

function getSapCloudSdkDependencies(packageJson: PackageJson): string {
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  return Object.entries(dependencies)
    .filter(([name]) => name.startsWith(sdkModulePrefix))
    .map(dep => dep.join('@'))
    .sort()
    .join(', ');
}

function getThirdPartyDependencies(packageJson: PackageJson) {
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  return Object.entries(dependencies)
    .filter(([name]) => !name.startsWith(sdkModulePrefix))
    .map(dep => dep.join('@'))
    .sort()
    .join(', ');
}

function getNpmVersion(): string {
  const userAgent = process.env.npm_config_user_agent;
  if (!userAgent) {
    return 'no version detected'; // rather return something and get some data than throwing and getting no data
  }
  // npm_config_user_agent has "npm/x.x.x node/x.x.x operatingSystemName architecture" format
  const npmInfo = userAgent.split(' ')[0];
  return sanitizeVersionFormat(npmInfo.slice(4));
}

function getNodeVersion(): string {
  const userAgent = process.env.npm_config_user_agent;
  if (!userAgent) {
    return 'no version detected'; // rather return something and get some data than throwing and getting no data
  }
  const nodeInfo = userAgent.split(' ')[1];
  return sanitizeVersionFormat(nodeInfo.slice(5));
}

function sanitizeVersionFormat(version: string): string {
  return version.startsWith('v') || version.startsWith('^') ? version.slice(1) : version;
}

function getOperatingSystemInfo(): OperatingSystemInfo {
  return { name: os.platform(), version: os.release(), architecture: os.arch() };
}

/**
 * SAP Web Analytics data.
 * @hidden
 */
export interface AnalyticsData {
  /**
   * A unique hash for a given project and salt
   */
  project_id: string;
  /**
   * Node.js version.
   */
  node: string;
  /**
   * NPM version.
   */
  npm: string;
  /**
   * Operating system information.
   */
  os: string;
  /**
   * Installed SAP cloud SDK modules.
   */
  sdk_dependencies: string;
  /**
   * Installed third party dependencies.
   */
  third_party_dependencies: string;
  /**
   * A flag specifying whether TypeScript is installed.
   */
  typescript: string;
}

interface PackageJson {
  name: string;
  dependencies?: MapType<string>;
  devDependencies?: MapType<string>;
}

interface OperatingSystemInfo {
  name: string;
  version: string;
  architecture: string;
}
