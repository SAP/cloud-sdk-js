/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EdmType } from '../../../edm-types';
import { Entity } from '../../../entity';
import { toStaticPropertyFormat } from '../../../../util';
import {
  Constructable,
  Filterable,
  isFilterList,
  isFilterLink,
  isFilter,
  ComplexTypeField,
  ComplexTypePropertyFields,
  FieldType,
  FilterFunction,
  FilterFunctionParameterType
} from '../../../../common';
import {
  convertToUriFormat,
  convertToUriForEdmString
} from './uri-value-converter';

/**
 * Get an object containing the given filter as query parameter, or an empty object if none was given.
 *
 * @typeparam EntityT - Type of the entity to filter on
 * @param filter - The filter to transform to a query parameter
 * @param entityConstructor - Constructor type of the entity to filter on
 * @returns An object containing the query parameter or an empty object
 */
export function getQueryParametersForFilter<EntityT extends Entity>(
  filter: Filterable<EntityT>,
  entityConstructor: Constructable<EntityT>
): Partial<{ filter: string }> {
  if (typeof filter !== 'undefined') {
    const filterExpression = getODataFilterExpression(
      filter,
      [],
      entityConstructor
    );
    if (filterExpression) {
      return {
        filter: filterExpression
      };
    }
  }
  return {};
}

function getODataFilterExpression<FilterEntityT extends Entity>(
  filter: Filterable<FilterEntityT>,
  parentFieldNames: string[] = [],
  targetEntityConstructor: Constructable<any>
): string | undefined {
  if (isFilterList(filter)) {
    filter.flatten();

    let andExp = filter.andFilters
      .map(subFilter =>
        getODataFilterExpression(
          subFilter,
          parentFieldNames,
          targetEntityConstructor
        )
      )
      .filter(f => !!f)
      .join(' and ');
    andExp = andExp ? `(${andExp})` : andExp;

    let orExp = filter.orFilters
      .map(subFilter =>
        getODataFilterExpression(
          subFilter,
          parentFieldNames,
          targetEntityConstructor
        )
      )
      .filter(f => !!f)
      .join(' or ');
    orExp = orExp ? `(${orExp})` : orExp;

    const exp: string[] = [];
    if (andExp) {
      exp.push(andExp);
    }

    if (orExp) {
      exp.push(orExp);
    }

    return exp.join(' and ');
  }

  if (isFilterLink(filter)) {
    let linkExp = filter.filters
      .map(subFilter =>
        getODataFilterExpression(
          subFilter,
          [...parentFieldNames, filter.link._fieldName],
          filter.link._linkedEntity
        )
      )
      .filter(f => !!f)
      .join(' and ');
    linkExp = linkExp ? `(${linkExp})` : linkExp;
    return linkExp;
  }

  if (isFilter(filter)) {
    if (typeof filter.field === 'string') {
      const field = retrieveField(
        filter.field,
        targetEntityConstructor,
        filter.edmType
      );
      return [
        [...parentFieldNames, filter.field].join('/'),
        filter.operator,
        convertToUriFormat(filter.value, field.edmType)
      ].join(' ');
    }
    return [
      filterFunctionToString(filter.field, parentFieldNames),
      filter.operator,
      convertToUriFormat(filter.value, filter.edmType!)
    ].join(' ');
  }
}

function retrieveField<FilterEntityT extends Entity>(
  filterField: string,
  targetEntityConstructor: Constructable<any>,
  filterEdmType?: EdmType
) {
  // In case of complex types there will be a property name as part of the filter.field
  const [fieldName] = filterField.split('/');
  const field = targetEntityConstructor[toStaticPropertyFormat(fieldName)];
  if (field instanceof ComplexTypeField) {
    return Object.values(field)
      .filter(pField => pField?.fieldPath) // Filter for ComplexTypePropertyFields only
      .find(
        (pField: ComplexTypePropertyFields<FilterEntityT>) =>
          pField.fieldPath() === filterField
      );
  }

  // In case of custom field we infer then the returned field from the filter edmType property
  return field || { edmType: filterEdmType };
}

function filterFunctionToString<
  EntityT extends Entity,
  FieldT extends FieldType
>(
  filterFunction: FilterFunction<EntityT, FieldT>,
  parentFieldNames: string[] = []
): string {
  const params = filterFunction.parameters
    .map(param => filterFunctionParameterToString(param, parentFieldNames))
    .join(', ');
  return `${filterFunction.functionName}(${params})`;
}

function filterFunctionParameterToString<EntityT extends Entity>(
  param: FilterFunctionParameterType<EntityT>,
  parentFieldNames: string[]
): string {
  if (typeof param === 'number') {
    return param.toString();
  }
  if (typeof param === 'string') {
    return convertToUriForEdmString(param);
  }
  if (param instanceof FilterFunction) {
    return filterFunctionToString(param, parentFieldNames);
  }
  return [...parentFieldNames, param._fieldName].join('/');
}
