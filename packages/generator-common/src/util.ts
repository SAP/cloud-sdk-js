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
 * Takes a name and returns a transformation that is guaranteed to be compliant with npm naming rules.
 * @param name - The name to be transformed if necessary.
 * @returns Name that is guaranteed to be compliant.
 * @internal
 */
export function npmCompliantName(name: string): string {
  let compliantName = trimToNpmMaxLength(name);
  compliantName = transformIfNecessary(compliantName);
  return compliantName;
}

const trimToNpmMaxLength = (str: string): string => {
  if (str.length > npmMaxLength) {
    logger.warn(
      `Provided package name ${str} is longer than 214 chars and will be cut!`
    );
    return str.substr(0, npmMaxLength);
  }
  return str;
};

const transformIfNecessary = (packageName: string): string => {
  if (npmRegex.exec(packageName)) {
    return packageName;
  }
  const newName = _npmCompliantName(packageName);
  logger.warn(
    `Provided name ${packageName} is not compliant with npm naming rules and was transformed to ${newName}!`
  );
  return newName;
};

const _npmCompliantName = (name: string): string => {
  if (name.startsWith('@') && name.includes('/')) {
    return (
      '@' +
      splitAtFirstOccurrence(name, '/')
        .map(x => makeNpmCompliant(x))
        .join('/')
    );
  }
  return makeNpmCompliant(name);
};

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

const lowerCase = (str: string): string => str.toLowerCase();

const stripLeadingDotsAndUnderscores = (str: string): string =>
  str.replace(/^[._]*/g, '');
const replaceNonNpmPackageCharacters = (str: string): string =>
  str.replace(/[^a-z0-9-~._]/g, '');

const makeNpmCompliant = (name: string) => {
  let compliantName = lowerCase(name);
  compliantName = stripLeadingDotsAndUnderscores(compliantName);
  compliantName = replaceNonNpmPackageCharacters(compliantName);
  return compliantName;
};

const splitAtFirstOccurrence = (str: string, separator: string) => [
  str.slice(0, str.indexOf(separator)),
  str.slice(str.indexOf(separator) + 1)
];
