/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Constructable, ConstructableODataV4 } from '../../constructable';
import { EdmType } from '../../edm-types';
import { Entity, EntityODataV4 } from '../../entity';
import {
  Filterable,
  FilterableODataV4,
  isFilter,
  isFilterLink,
  isFilterLinkODataV4,
  isFilterList,
  isFilterListODataV4, isFilterODataV4
} from '../../filter';
import { ComplexTypeField, ComplexTypePropertyFieldsODataV4 } from '../../selectable';
import { ComplexTypePropertyFields } from '../../selectable/complex-type-property-fields';
import { convertToUriFormat } from '../../uri-value-converter';
import { toStaticPropertyFormat } from '../../util';

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

export function getQueryParametersForFilterODataV4<EntityT extends EntityODataV4>(
  filter: FilterableODataV4<EntityT>,
  entityConstructor: ConstructableODataV4<EntityT>
): Partial<{ filter: string }> {
  if (typeof filter !== 'undefined') {
    const filterExpression = getODataFilterExpressionODataV4(
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
      const value = convertToUriFormat(filter.value, field.edmType);
      return [
        [...parentFieldNames, filter.field].join('/'),
        filter.operator,
        value
      ].join(' ');
    } else {
      const value = convertToUriFormat(filter.value, filter.edmType!);
      return [
        filter.field.toString(parentFieldNames),
        filter.operator,
        value
      ].join(' ');
    }
  }
}

function getODataFilterExpressionODataV4<FilterEntityT extends EntityODataV4>(
  filter: FilterableODataV4<FilterEntityT>,
  parentFieldNames: string[] = [],
  targetEntityConstructor: ConstructableODataV4<any>
): string | undefined {
  if (isFilterListODataV4(filter)) {
    filter.flatten();

    let andExp = filter.andFilters
      .map(subFilter =>
        getODataFilterExpressionODataV4(
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
        getODataFilterExpressionODataV4(
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

  if (isFilterLinkODataV4(filter)) {
    let linkExp = filter.filters
      .map(subFilter =>
        getODataFilterExpressionODataV4(
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

  if (isFilterODataV4(filter)) {
    if (typeof filter.field === 'string') {
      const field = retrieveFieldODataV4(
        filter.field,
        targetEntityConstructor,
        filter.edmType
      );
      const value = convertToUriFormat(filter.value, field.edmType);
      return [
        [...parentFieldNames, filter.field].join('/'),
        filter.operator,
        value
      ].join(' ');
    } else {
      const value = convertToUriFormat(filter.value, filter.edmType!);
      return [
        filter.field.toString(parentFieldNames),
        filter.operator,
        value
      ].join(' ');
    }
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

function retrieveFieldODataV4<FilterEntityT extends EntityODataV4>(
  filterField: string,
  targetEntityConstructor: ConstructableODataV4<any>,
  filterEdmType?: EdmType
) {
  // In case of complex types there will be a property name as part of the filter.field
  const [fieldName] = filterField.split('/');
  const field = targetEntityConstructor[toStaticPropertyFormat(fieldName)];
  if (field instanceof ComplexTypeField) {
    return Object.values(field)
      .filter(pField => pField?.fieldPath) // Filter for ComplexTypePropertyFields only
      .find(
        (pField: ComplexTypePropertyFieldsODataV4<FilterEntityT>) =>
          pField.fieldPath() === filterField
      );
  }

  // In case of custom field we infer then the returned field from the filter edmType property
  return field || { edmType: filterEdmType };
}
