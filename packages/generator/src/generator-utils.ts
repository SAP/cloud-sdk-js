import { EdmTypeShared } from '@sap-cloud-sdk/core';
import { createLogger, ODataVersion } from '@sap-cloud-sdk/util';
import {
  VdmNavigationProperty,
  VdmProperty,
  VdmServiceMetadata
} from './vdm-types';

const logger = createLogger({
  package: 'generator',
  messageContext: 'generator-utils'
});

function hasCapability(object: any, capability: string) {
  return !(capability in object) || object[capability] === 'true';
}

/**
 * Checks if the 'sap:deletable' property is present on the given input.
 * @param entity - Object to be checked.
 * @returns true per default or if {sap:deletable:'true'} is in the object.
 */
export function isDeletable(entity: any): boolean {
  return hasCapability(entity, 'sap:deletable');
}

/**
 * Checks if the 'sap:updatable' property is present on the given input.
 * @param entity - Object to be checked.
 * @returns true per default or if {sap:updatable:'true'} is in the object.
 */
export function isUpdatable(entity: any): boolean {
  return hasCapability(entity, 'sap:updatable');
}

/**
 * Checks if the 'sap:creatable' property is present on the given input.
 * @param entity - Object to be checked.
 * @returns true per default or if {sap:creatable:'true'} is in the object.
 */
export function isCreatable(entity: any): boolean {
  return hasCapability(entity, 'sap:creatable');
}

/**
 * Checks if the 'sap:sortable' property is present on the given input.
 * @param property - Object to be checked.
 * @returns true per default or if {sap:sortable:'true'} is in the object.
 */
export function isSortable(property: any): boolean {
  return hasCapability(property, 'sap:sortable');
}

/**
 * Checks if the 'sap:filterable' property is present on the given input.
 * @param property - Object to be checked.
 * @returns true per default or if {sap:filterable:'true'} is in the object.
 */
export function isFilterable(property: any): boolean {
  return hasCapability(property, 'sap:filterable');
}

/**
 * Checks if the 'Nullable' property is present on the given input.
 * @param property - Object to be checked.
 * @returns true per default or if {Nullable:'true'} is in the object.
 */
export function isNullableProperty(property: any): boolean {
  return hasCapability(property, 'Nullable');
}

/**
 * Checks if the 'Nullable' property is present on the given input.
 * @param parameter - Object to be checked.
 * @returns false per default or if {Nullable:'false'} is in the object.
 */
export function isNullableParameter(parameter: any): boolean {
  return !!parameter['Nullable'] && parameter['Nullable'] !== 'false';
}

export type EdmTypeMapping = {
  [key in EdmTypeShared<'any'>]: string | undefined;
};

type EdmTypeMappingWithoutEnum = {
  [key in Exclude<EdmTypeShared<'any'>, 'Edm.Enum'>]: string | undefined;
};

const edmToTsTypeMapping: EdmTypeMappingWithoutEnum = {
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
  'Edm.DateTimeOffset': 'Moment',
  'Edm.Binary': 'string',
  'Edm.Any': 'any',

  // OData v2 specific
  'Edm.DateTime': 'Moment',
  'Edm.Time': 'Time',

  // OData v4 specific
  'Edm.Date': 'Moment',
  'Edm.Duration': 'Duration',
  'Edm.TimeOfDay': 'Time'
};

const edmToFieldTypeMapping: EdmTypeMapping = {
  'Edm.String': 'EdmTypeField',
  'Edm.Boolean': 'EdmTypeField',
  'Edm.Guid': 'EdmTypeField',
  'Edm.Decimal': 'OrderableEdmTypeField',
  'Edm.Int16': 'OrderableEdmTypeField',
  'Edm.Int32': 'OrderableEdmTypeField',
  'Edm.Int64': 'OrderableEdmTypeField',
  'Edm.Single': 'OrderableEdmTypeField',
  'Edm.Double': 'OrderableEdmTypeField',
  'Edm.Float': 'OrderableEdmTypeField', // ABAP CDS compatibility
  'Edm.Byte': 'OrderableEdmTypeField',
  'Edm.SByte': 'OrderableEdmTypeField',
  'Edm.DateTimeOffset': 'OrderableEdmTypeField',
  'Edm.Binary': 'EdmTypeField',
  'Edm.Any': 'EdmTypeField',

  // OData v2 specific
  'Edm.DateTime': 'OrderableEdmTypeField',
  'Edm.Time': 'OrderableEdmTypeField',

  // OData v4 specific
  'Edm.Date': 'OrderableEdmTypeField',
  'Edm.Duration': 'OrderableEdmTypeField',
  'Edm.TimeOfDay': 'OrderableEdmTypeField',
  'Edm.Enum': 'EdmTypeField'
};

export function getFallbackEdmTypeIfNeeded(
  edmType: string
): EdmTypeShared<any> {
  if (edmType in edmToTsTypeMapping) {
    return edmType as EdmTypeShared<any>;
  }
  logger.warn(
    `The EDM type '${edmType}' is unknown or not supported by the SAP Cloud SDK. Using "any" as fallback.`
  );
  return 'Edm.Any';
}

export function edmToTsType(edmType: string): string {
  const tsType = edmToTsTypeMapping[edmType];
  if (!tsType) {
    throw new Error(
      `Could not determine TypeScript type for EDM type: '${edmType}'.`
    );
  }
  return tsType;
}

export function edmToFieldType(edmType: string): string {
  const fieldType = edmToFieldTypeMapping[edmType];
  if (!fieldType) {
    throw new Error(
      `Could not determine field type for EDM type: '${edmType}'.`
    );
  }
  return fieldType;
}

export function edmToComplexPropertyType(edmType: string): string {
  const fieldType = edmToFieldType(edmType);
  if (!fieldType) {
    throw new Error(
      `Could not determine complex field type for EDM type: '${edmType}'.`
    );
  }
  return fieldType;
}

export function forceArray(obj: any): any[] {
  if (!obj) {
    return [];
  }
  if (!(obj instanceof Array)) {
    return [obj];
  }
  return obj;
}

export function ensureString(obj: any): string {
  if (typeof obj === 'undefined' || obj === null) {
    return '';
  }
  if (typeof obj === 'string') {
    return obj;
  }
  return `${obj}`;
}

export function endWithDot(text: string): string {
  return !text || text.endsWith('.') || text.endsWith(':') ? text : `${text}.`;
}

export function linkClass(
  navProperty: VdmNavigationProperty,
  oDataVersion: ODataVersion
): string {
  return navProperty.isCollection
    ? oDataVersion === 'v4'
      ? 'OneToManyLink'
      : 'Link'
    : 'OneToOneLink';
}

export function getGenericParameters(
  entityClassName: string,
  prop: VdmProperty,
  isSelectable: boolean
): string {
  const params = [entityClassName];
  if (prop.isCollection) {
    if (prop.isEnum) {
      params.push(`typeof ${prop.jsType}`);
    } else if (prop.isComplex) {
      params.push(prop.jsType);
    } else {
      params.push(`'${prop.edmType}'`);
    }
  } else {
    if (prop.isEnum) {
      params.push(`${prop.jsType}`);
    } else if (prop.isComplex) {
      // prettier-ignore
    } else {
      params.push(`'${prop.edmType}'`);
    }
  }

  params.push(prop.nullable.toString());
  params.push(isSelectable.toString());

  return params.join(', ');
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
  let compliantName = trimToNpmMaxLength(name);
  compliantName = transformIfNecessary(compliantName);
  return compliantName;
}

// We use this function to still be able to generate the "cloud-sdk-vdm" package, even though the prefix + name logic does not allow it normally
export function cloudSdkVdmHack(name: string): string {
  return name === '@sap/cloud-sdk-vdm-' ? name.slice(0, -1) : name;
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

const splitAtFirstOccurrence = (str: string, separator: string) => [
  str.slice(0, str.indexOf(separator)),
  str.slice(str.indexOf(separator) + 1)
];

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

const npmMaxLength = 214;
const npmRegex = /^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

export function hasEntities(service: VdmServiceMetadata): boolean {
  return !!service.entities?.length;
}
