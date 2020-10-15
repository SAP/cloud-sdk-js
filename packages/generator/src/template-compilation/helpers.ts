/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { registerHelper, SafeString } from 'handlebars';
import { toTitleFormat } from '@sap-cloud-sdk/core';
import { VdmProperty } from '../vdm-types';
import { allFieldTypes, getImports, otherEntityImports } from './entity';

function indentString(str: string, context): string {
  const indent = context.loc.start.column;
  return ' '.repeat(indent) + str;
}

function prependStar(str: string): string {
  return ` * ${str}`;
}

function getGenericParameters(
  entityClassName: string,
  prop: VdmProperty
): string {
  const param = prop.isCollection
    ? prop.isComplex
      ? [`${prop.jsType}`]
      : [`'${prop.edmType}'`]
    : [];
  return [entityClassName, ...param].join(', ');
}

export function registerHelpers() {
  registerHelper('blockComment', function (value, context) {
    const commentLines = typeof value === 'string' ? [value] : value;
    return ['/**', ...commentLines.map(line => prependStar(line)), ' */']
      .map(line => indentString(line, context))
      .join('\n');
  });

  registerHelper('titleFormat', function (value) {
    return toTitleFormat(value).trim();
  });

  registerHelper('fieldType', function (
    property: VdmProperty,
    entityClassName
  ) {
    return new SafeString(
      `${property.fieldType}<${getGenericParameters(
        entityClassName,
        property
      )}>`
    );
  });

  // registerHelper('instanceNavigationProperty', function (value) {
  //   return value.fn(instanceNavigationProperty(this));
  // });

  registerHelper('lowerCase', function (value) {
    return value.toLowerCase();
  });

  registerHelper('upperCase', function (value) {
    return value.toUpperCase();
  });

  registerHelper('oDataVersionSuffix', function (context) {
    return context.data.root.service.oDataVersion.toUpperCase();
  });

  registerHelper('year', function () {
    return new Date().getFullYear();
  });

  registerHelper('and', function (val1, val2, options) {
    return val1 && val2 ? options.fn(this) : options.inverse(this);
  });

  registerHelper('getImports', function (entity, service) {
    return getImports(entity, service.oDataVersion);
  });

  registerHelper('getOtherImports', function (entity, service) {
    return otherEntityImports(entity, service);
  });

  registerHelper('getAllFieldTypes', function (entity, service) {
    return new SafeString(allFieldTypes(entity, service).join(' | '));
  });
}
