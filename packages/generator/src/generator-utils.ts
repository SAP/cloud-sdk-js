/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { EdmType } from '@sap-cloud-sdk/core';
import { createLogger } from '@sap-cloud-sdk/util';
import { pipe } from 'rambda';
import { VdmNavigationProperty } from './vdm-types';

const logger = createLogger({
  package: 'generator',
  messageContext: 'generator-utils'
});

function hasCapability(object: any, capability: string) {
  return !(capability in object) || object[capability] === 'true';
}

export function isDeletable(entity: any) {
  return hasCapability(entity, 'sap:deletable');
}

export function isUpdatable(entity: any) {
  return hasCapability(entity, 'sap:updatable');
}

export function isCreatable(entity: any) {
  return hasCapability(entity, 'sap:creatable');
}

export function isSortable(property: any) {
  return hasCapability(property, 'sap:sortable');
}

export function isFilterable(property: any) {
  return hasCapability(property, 'sap:filterable');
}

export function isNullableProperty(property: any) {
  return hasCapability(property, 'Nullable');
}

export function isNullableParameter(parameter: any) {
  return !!parameter['Nullable'] && parameter['Nullable'] !== 'false';
}

type EdmTypeMapping = { [key in EdmType]: string };

const edmToTsTypeMapping: EdmTypeMapping = {
  'Edm.String': 'string',
  'Edm.Boolean': 'boolean',
  'Edm.Guid': 'string',
  'Edm.Decimal': 'BigNumber',
  'Edm.Int16': 'number',
  'Edm.Int32': 'number',
  'Edm.Int64': 'BigNumber',
  'Edm.Single': 'number',
  'Edm.Double': 'number',
  'Edm.Float': 'number', // ABAP CDS compatibility
  'Edm.Byte': 'number',
  'Edm.SByte': 'number',
  'Edm.DateTime': 'Moment',
  'Edm.DateTimeOffset': 'Moment',
  'Edm.Binary': 'string',
  'Edm.Time': 'Time'
};

const edmToFieldTypeMapping: EdmTypeMapping = {
  'Edm.String': 'StringField',
  'Edm.Boolean': 'BooleanField',
  'Edm.Guid': 'StringField',
  'Edm.Decimal': 'BigNumberField',
  'Edm.Int16': 'NumberField',
  'Edm.Int32': 'NumberField',
  'Edm.Int64': 'BigNumberField',
  'Edm.Single': 'NumberField',
  'Edm.Double': 'NumberField',
  'Edm.Float': 'NumberField', // ABAP CDS compatibility
  'Edm.Byte': 'NumberField',
  'Edm.SByte': 'NumberField',
  'Edm.DateTime': 'DateField',
  'Edm.DateTimeOffset': 'DateField',
  'Edm.Binary': 'BinaryField',
  'Edm.Time': 'TimeField'
};

const fieldTypeToComplexPropertyTypeMapping = {
  BigNumberField: 'ComplexTypeBigNumberPropertyField',
  BinaryField: 'ComplexTypeBinaryPropertyField',
  BooleanField: 'ComplexTypeBooleanPropertyField',
  DateField: 'ComplexTypeDatePropertyField',
  NumberField: 'ComplexTypeNumberPropertyField',
  StringField: 'ComplexTypeStringPropertyField',
  TimeField: 'ComplexTypeTimePropertyField'
};

export function edmToTsType(edmType: string): string {
  if (edmToTsTypeMapping[edmType]) {
    return edmToTsTypeMapping[edmType];
  }
  logger.warn(`No type mapping defined for edm type ${edmType}! Will use "any" instead.`);
  return 'any';
}

export function edmToFieldType(edmType: string): string {
  return edmToFieldTypeMapping[edmType];
}

export function edmToComplexPropertyType(edmType: string): string {
  return fieldTypeToComplexPropertyTypeMapping[edmToFieldType(edmType)];
}

export function forceArray(obj: any): any[] {
  if (!obj) {
    return [];
  } else if (!(obj instanceof Array)) {
    return [obj];
  } else {
    return obj;
  }
}

export function ensureString(obj: any): string {
  if (typeof obj === 'undefined' || obj === null) {
    return '';
  } else if (typeof obj === 'string') {
    return obj;
  } else {
    return `${obj}`;
  }
}

export function endWithDot(text: string): string {
  return !text || text.endsWith('.') || text.endsWith(':') ? text : `${text}.`;
}

export function linkClass(navProperty: VdmNavigationProperty): string {
  return navProperty.isMultiLink ? 'Link' : 'OneToOneLink';
}

/**
 * Applies a prefix to a string if present.
 *
 * @param string - The string to be prefixed.
 * @param prefix - The optional prefix.
 * @returns Prefixed string.
 */
export function prefixString(string: string, prefix?: string): string {
  return prefix ? `${prefix}${string}` : string;
}

/**
 * Takes a name and returns a transformation that is guaranteed to be compliant with npm naming rules.
 *
 * @param name - The name to be transformed if necessary.
 * @returns Name that is guaranteed to be compliant.
 */
export function npmCompliantName(name: string): string {
  return pipe(trimToNpmMaxLength, transformIfNecessary)(name);
}

// we use this function to still be able to generate the "cloud-sdk-vdm" package, even though the prefix + name logic does not allow it normally
export function cloudSdkVdmHack(name: string): string {
  return name === '@sap/cloud-sdk-vdm-' ? name.slice(0, -1) : name;
}

const trimToNpmMaxLength = (str: string): string => {
  if (str.length > npmMaxLength) {
    logger.warn(`Provided package name ${str} is longer than 214 chars and will be cut!`);
    return str.substr(0, npmMaxLength);
  }
  return str;
};

const transformIfNecessary = (packageName: string): string => {
  if (npmRegex.exec(packageName)) {
    return packageName;
  }
  const newName = _npmCompliantName(packageName);
  logger.warn(`Provided name ${packageName} is not compliant with npm naming rules and was transformed to ${newName}!`);
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
  } else {
    return makeNpmCompliant(name);
  }
};

const splitAtFirstOccurrence = (str: string, separator: string) => [str.slice(0, str.indexOf(separator)), str.slice(str.indexOf(separator) + 1)];

const lowerCase = (str: string): string => str.toLowerCase();
const stripLeadingDotsAndUnderscores = (str: string): string => str.replace(/^[\._]*/g, '');
const replaceNonNpmPackageCharacters = (str: string): string => str.replace(/[^a-z0-9-~._]/g, '');

const makeNpmCompliant = pipe(lowerCase, stripLeadingDotsAndUnderscores, replaceNonNpmPackageCharacters);

const npmMaxLength = 214;
const npmRegex = /^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
