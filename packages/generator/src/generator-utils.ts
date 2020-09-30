import { EdmTypeShared } from '@sap-cloud-sdk/core';
import { createLogger, ODataVersion } from '@sap-cloud-sdk/util';
import { pipe } from 'rambda';
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
  'Edm.DateTimeOffset': 'DateField',
  'Edm.Binary': 'BinaryField',
  'Edm.Any': 'AnyField',

  // OData v2 specific
  'Edm.DateTime': 'DateField',
  'Edm.Time': 'TimeField',

  // OData v4 specific
  'Edm.Date': 'DateField',
  'Edm.Duration': 'DurationField',
  'Edm.TimeOfDay': 'TimeField',
  'Edm.Enum': 'EnumField'
};

const fieldTypeToComplexPropertyTypeMapping = {
  BigNumberField: 'ComplexTypeBigNumberPropertyField',
  BinaryField: 'ComplexTypeBinaryPropertyField',
  BooleanField: 'ComplexTypeBooleanPropertyField',
  DateField: 'ComplexTypeDatePropertyField',
  NumberField: 'ComplexTypeNumberPropertyField',
  StringField: 'ComplexTypeStringPropertyField',
  TimeField: 'ComplexTypeTimePropertyField',
  AnyField: 'ComplexTypeAnyPropertyField'
};

export function getFallbackEdmTypeIfNeeded(
  edmType: string
): EdmTypeShared<any> {
  if (edmType in edmToTsTypeMapping) {
    return edmType as EdmTypeShared<any>;
  }
  logger.warn(
    `The type ${edmType} is currently not supported by the sdk. Type "any" is used as fallback.`
  );
  return 'Edm.Any';
}

export function edmToTsType(edmType: string): string {
  const tsType = edmToTsTypeMapping[edmType];
  if (!tsType) {
    throw new Error(`No ts type found for edm type: ${edmType}`);
  }
  return tsType;
}

export function edmToFieldType(edmType: string): string {
  const fieldType = edmToFieldTypeMapping[edmType];
  if (!fieldType) {
    throw new Error(`No field type found for edm type: ${edmType}`);
  }
  return fieldType;
}

export function edmToComplexPropertyType(edmType: string): string {
  const fieldType =
    fieldTypeToComplexPropertyTypeMapping[edmToFieldType(edmType)];
  if (!fieldType) {
    throw new Error(`No complex field type found for edm type: ${edmType}`);
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
  prop: VdmProperty
): string {
  let param: string[] = [];
  if (prop.isCollection) {
    if (prop.isComplex) {
      param = [`${prop.jsType}`];
    } else if (prop.isEnum) {
      param = ["'Edm.Enum'"];
    } else {
      param = [`'${prop.edmType}'`];
    }
  }
  return [entityClassName, ...param].join(', ');
}

export function createPropertyFieldInitializer(
  property: VdmProperty,
  entityClassName: string
) {
  const edmOrComplexTypeOrEnumType =
    property.isComplex || property.isEnum
      ? property.jsType
      : `'${property.edmType}'`;
  let collectionTypeOrEdmType: string | undefined = edmOrComplexTypeOrEnumType;
  if (property.isComplex && !property.isCollection) {
    collectionTypeOrEdmType = undefined;
  } else if (property.isEnum && !property.isCollection) {
    collectionTypeOrEdmType = undefined;
  } else if (property.isEnum && property.isCollection) {
    collectionTypeOrEdmType = "'Edm.Enum'";
  }
  return `new ${property.fieldType}(${[
    `'${property.originalName}'`,
    entityClassName,
    ...(typeof collectionTypeOrEdmType === 'undefined'
      ? []
      : [collectionTypeOrEdmType])
  ].join(', ')})`;
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
  str.replace(/^[\._]*/g, '');
const replaceNonNpmPackageCharacters = (str: string): string =>
  str.replace(/[^a-z0-9-~._]/g, '');

const makeNpmCompliant = pipe(
  lowerCase,
  stripLeadingDotsAndUnderscores,
  replaceNonNpmPackageCharacters
);

const npmMaxLength = 214;
const npmRegex = /^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

export function hasEntities(service: VdmServiceMetadata): boolean {
  return !!service.entities?.length;
}
