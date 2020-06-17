/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase } from '../entity';
import { toStaticPropertyFormat } from '../../../util';
import {
  Filterable,
  isFilterList,
  isFilterLink,
  isFilter,
  FilterFunction,
  FilterFunctionParameterType, Filter
} from '../filter';
import { Constructable } from '../constructable';
import { EdmTypeShared } from '../edm-types';
import {
  ComplexTypeField,
  ComplexTypePropertyFields,
  FieldType
} from '../selectable';
import { UriConverter } from '../request';
import { convertToUriForEdmString } from './uri-value-converter';
import { FilterLambdaExpression, isFilterLambdaExpression } from '../filter/filter-lambda-expression';

// eslint-disable-next-line valid-jsdoc
/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export function createGetFilter(uriConverter: UriConverter) {
  /**
   * Get an object containing the given filter as query parameter, or an empty object if none was given.
   *
   * @typeparam EntityT - Type of the entity to filter on
   * @param filter - The filter to transform to a query parameter
   * @param entityConstructor - Constructor type of the entity to filter on
   * @returns An object containing the query parameter or an empty object
   */
  function getFilter<EntityT extends EntityBase>(
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

  function getODataFilterExpression<FilterEntityT extends EntityBase>(
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
          uriConverter.convertToUriFormat(filter.value, field.edmType)
        ].join(' ');
      }
      return [
        filterFunctionToString(filter.field, parentFieldNames),
        filter.operator,
        uriConverter.convertToUriFormat(filter.value, filter.edmType!)
      ].join(' ');
    }

    if(isFilterLambdaExpression(filter)){
      return getODataFilterExpressionWhenBeingFilterLambdaExpression(filter, parentFieldNames, targetEntityConstructor);
    }
  }

  function getODataFilterExpressionWhenBeingFilterLambdaExpression<FilterEntityT extends EntityBase>(
    filter: FilterLambdaExpression<FilterEntityT, FieldType>,
    parentFieldNames: string[] = [],
    targetEntityConstructor: Constructable<any>){
    const alias = 'a';
    if (typeof filter.innerFilter.field !== 'string') {
      throw new Error(`The type of the field: ${filter.innerFilter.field} is not string, but ${typeof filter.innerFilter.field}.`);
    }
    const field = retrieveField(
      filter.innerFilter.field,
      targetEntityConstructor,
      filter.innerFilter.edmType
    );
    const filterExp = [
      [...parentFieldNames, filter.innerFilter.field].join('/'),
      filter.innerFilter.operator,
      uriConverter.convertToUriFormat(filter.innerFilter.value, field.edmType)
    ].join(' ');
    return `${filter.navigationPropertyName}/${filter.lambdaOperator}(${alias}:${alias}/${filterExp})`;
  }

  function retrieveField<FilterEntityT extends EntityBase>(
    filterField: string,
    targetEntityConstructor: Constructable<any>,
    filterEdmType?: EdmTypeShared<'v2'>
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
    EntityT extends EntityBase,
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

  function filterFunctionParameterToString<EntityT extends EntityBase>(
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

  return {
    getFilter
  };
}
