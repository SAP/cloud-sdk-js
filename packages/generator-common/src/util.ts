import { codeBlock, createLogger } from '@sap-cloud-sdk/util';
import voca from 'voca';

/**
 * @returns A copyright header
 * @internal
 */
export function getCopyrightHeader(): string {
  return codeBlock`
/*
 * Copyright (c) ${new Date().getFullYear()} SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
 `;
}

const logger = createLogger('generator-common-util');
const npmMaxLength = 214;
const npmRegex = /^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

/**
 * Checks whether a name is compliant with npm naming rules. Logs a warning if not.
 * @param packageName - The name to be checked.
 * @internal
 */
export function validateNpmCompliance(packageName: string): void {
  if (packageName.length > npmMaxLength) {
    logger.warn(
      `Provided package name "${packageName}" is longer than 214 chars and will be cut!`
    );
  }
  if (!isCompliant(packageName)) {
    const newPackageName = npmCompliantName(packageName);
    logger.warn(
      `Provided package name "${packageName}" is not compliant with NPM naming rules and was transformed to ${newPackageName}!`
    );
  }
}

/**
 * Takes a name and returns a transformation that is guaranteed to be compliant with NPM naming rules.
 * @param packageName - The name to be transformed, if necessary.
 * @returns Name that is guaranteed to be NPM compliant.
 * @internal
 */
export function npmCompliantName(packageName: string): string {
  packageName = packageName.substring(0, npmMaxLength);
  return isScoped(packageName)
    ? transformScopedName(packageName)
    : transformUnscopedName(packageName);
}

function isCompliant(packageName: string): boolean {
  return !!npmRegex.exec(packageName);
}

function isScoped(packageName: string): boolean {
  return packageName.startsWith('@') && packageName.includes('/');
}

function transformScopedName(packageName: string) {
  return (
    '@' +
    splitAtFirstOccurrence(packageName, '/')
      .map(scopeOrName => transformUnscopedName(scopeOrName))
      .join('/')
  );
}

function transformUnscopedName(packageName: string) {
  let compliantName = packageName.toLowerCase();
  compliantName = stripLeadingDotsAndUnderscores(compliantName);
  compliantName = replaceNonNpmPackageCharacters(compliantName);
  return compliantName;
}

/**
 * This is taken from version 2.0
 * @internal
 */
export function directoryToSpeakingModuleName(packageName: string): string {
  return voca.titleCase(packageName.replace(/[-,_]/g, ' '));
}

/**
 * This is taken from version 2.0
 * @internal
 */
export function directoryToServiceName(name: string): string {
  return `${directoryToSpeakingModuleName(name).replace(/ /g, '')}`;
}

function stripLeadingDotsAndUnderscores(str: string): string {
  return str.replace(/^[._]*/g, '');
}

function replaceNonNpmPackageCharacters(str: string): string {
  return str.replace(/[^a-z0-9-~._]/g, '');
}

function splitAtFirstOccurrence(str: string, separator: string) {
  return [
    str.slice(0, str.indexOf(separator)),
    str.slice(str.indexOf(separator) + 1)
  ];
}
