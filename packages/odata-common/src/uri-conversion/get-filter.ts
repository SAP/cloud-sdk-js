import moment from 'moment';
import { upperCaseSnakeCase } from '@sap-cloud-sdk/util';
import { EntityBase } from '../entity-base';
import { EdmTypeShared } from '../edm-types';
import {
  FilterLambdaExpression,
  isFilterLambdaExpression,
  Filterable,
  FilterList,
  isFilterList,
  isBooleanFilterFunction,
  FilterLink,
  isFilterLink,
  isUnaryFilter,
  UnaryFilter,
  FilterFunction,
  FilterFunctionParameterType,
  Filter,
  isFilter
} from '../filter';
import {
  DefaultDeSerializers,
  DeSerializers,
  UriConverter
} from '../de-serializers';
import { ComplexTypeField, OneToManyLink } from '../selectable';
import { EntityApi } from '../entity-api';

type GetFilterType = <
  EntityT extends EntityBase,
  TargetEntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(
  filter: Filterable<EntityT, DeSerializersT, any>,
  entityApi: EntityApi<TargetEntityT, DeSerializersT>
) => Partial<{ filter: string }>;

/**
 * Interface representing the return of the getFilter creator [[createGetFilter]].
 * @internal
 */
export interface GetFilter {
  getFilter: GetFilterType;
}

/**
 * Creates a getFilter function using the OData v2 or OData v4 URI converter.
 * The concrete filter getters are initiated in odata/v2/uri-conversion/odata-uri.ts and odata/v4/uri-conversion/odata-uri.ts.
 * @param uriConverter - URI converter for v2 or v4.
 * @returns The filter getter. See interface [[GetFilter]]
 * @internal
 */
export function createGetFilter(uriConverter: UriConverter): GetFilter {
  /**
   * Get an object containing the given filter as query parameter, or an empty object if none was given.
   * @typeparam EntityT - Type of the entity to filter on.
   * @param filter - The filter to transform to a query parameter.
   * @param entityApi - Entity API for building the filter.
   * @returns An object containing the query parameter with encoding or an empty object.
   */
  function getFilter<
    EntityT extends EntityBase,
    TargetEntityT extends EntityBase,
    DeSerializersT extends DeSerializers
  >(
    filter: Filterable<EntityT, DeSerializersT>,
    entityApi: EntityApi<TargetEntityT, any>
  ): Partial<{ filter: string }> {
    if (typeof filter !== 'undefined') {
      const filterExpression = getODataFilterExpression(filter, [], entityApi);
      if (filterExpression) {
        return {
          filter: encodeURIComponent(filterExpression)
        };
      }
    }
    return {};
  }

  function getODataFilterExpression<
    FilterEntityT extends EntityBase,
    DeSerializersT extends DeSerializers
  >(
    filter: Filterable<FilterEntityT, DeSerializersT>,
    parentFieldNames: string[] = [],
    targetEntityApi: EntityApi<EntityBase, any>,
    lambdaExpressionLevel = 0
  ): string {
    if (isFilterList(filter)) {
      return getODataFilterExpressionForFilterList(
        filter,
        parentFieldNames,
        targetEntityApi,
        lambdaExpressionLevel
      );
    }

    if (isFilterLink(filter)) {
      return getODataFilterExpressionForFilterLink(
        filter,
        parentFieldNames,
        lambdaExpressionLevel
      );
    }

    if (isFilter(filter)) {
      return getODataFilterExpressionForFilter(
        filter,
        parentFieldNames,
        targetEntityApi
      );
    }

    if (isBooleanFilterFunction(filter)) {
      return filterFunctionToString(filter, parentFieldNames);
    }

    if (isUnaryFilter(filter)) {
      return getODataFilterExpressionForUnaryFilter(
        filter,
        parentFieldNames,
        targetEntityApi
      );
    }

    if (isFilterLambdaExpression(filter)) {
      return getODataFilterExpressionForFilterLambdaExpression(
        filter,
        parentFieldNames,
        targetEntityApi,
        lambdaExpressionLevel
      );
    }

    if (filter instanceof OneToManyLink) {
      return getODataFilterExpressionForFilterLink(
        filter._filters,
        parentFieldNames,
        lambdaExpressionLevel
      );
    }

    throw new Error(
      `Could not construct query parameters from filter. Filter is not valid: ${JSON.stringify(
        filter
      )}`
    );
  }

  function retrieveField(
    filterField: string,
    targetEntityApi: EntityApi<EntityBase, any>,
    filterEdmType?: EdmTypeShared<'v2'>
  ) {
    // In case of complex types there will be a property name as part of the filter.field
    const [fieldName] = filterField.split('/');
    const field = targetEntityApi.schema[upperCaseSnakeCase(fieldName)];
    if (field instanceof ComplexTypeField) {
      return Object.values(field)
        .filter(pField => pField?.fieldPath) // Filter for ComplexTypePropertyFields only
        .find(pField => pField.fieldPath() === filterField);
    }

    // In case of custom field we infer then the returned field from the filter edmType property
    return field || { edmType: filterEdmType };
  }

  function filterFunctionToString<EntityT extends EntityBase, FieldT>(
    filterFunction: FilterFunction<EntityT, FieldT>,
    parentFieldNames: string[] = []
  ): string {
    const params = filterFunction.parameters
      .map(param => filterFunctionParameterToString(param, parentFieldNames))
      .join(',');
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
      return uriConverter(param, 'Edm.String');
    }
    if (param instanceof FilterFunction) {
      return filterFunctionToString(param, parentFieldNames);
    }
    if (moment.isMoment(param)) {
      return uriConverter(param, 'Edm.DateTimeOffset');
    }
    if (Array.isArray(param)) {
      return `[${param
        .map(p => filterFunctionParameterToString(p, parentFieldNames))
        .join(',')}]`;
    }
    return [...parentFieldNames, param._fieldName].join('/');
  }

  function convertFilterValue(
    value: any | any[],
    edmType: EdmTypeShared<'any'>
  ): string {
    return Array.isArray(value)
      ? `[${value.map(v => uriConverter(v, edmType)).join(',')}]`
      : uriConverter(value, edmType);
  }

  function getODataFilterExpressionForUnaryFilter<
    FilterEntityT extends EntityBase,
    DeSerializersT extends DeSerializers
  >(
    filter: UnaryFilter<FilterEntityT, DeSerializersT>,
    parentFieldNames: string[],
    targetEntityApi: EntityApi<EntityBase, any>
  ): string {
    return `${filter.operator} (${getODataFilterExpression(
      filter.singleOperand,
      parentFieldNames,
      targetEntityApi
    )})`;
  }

  function getODataFilterExpressionForFilterLambdaExpression<
    FilterEntityT extends EntityBase,
    DeSerializersT extends DeSerializers,
    LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT>
  >(
    filter: FilterLambdaExpression<FilterEntityT, DeSerializersT>,
    parentFieldNames: string[],
    targetEntityApi: EntityApi<EntityBase, any>,
    lambdaExpressionLevel: number
  ): string {
    const alias = `a${lambdaExpressionLevel}`;
    const filterExp = getODataFilterExpression(
      filter.filters,
      [alias],
      targetEntityApi,
      lambdaExpressionLevel + 1
    );
    return `${parentFieldNames.join('/')}/${
      filter.lambdaOperator
    }(${alias}:${filterExp})`;
  }

  function getODataFilterExpressionForFilterList<
    FilterEntityT extends EntityBase,
    DeSerializersT extends DeSerializers,
    LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT>
  >(
    filter: FilterList<FilterEntityT, DeSerializersT>,
    parentFieldNames: string[],
    targetEntityApi: EntityApi<EntityBase, any>,
    lambdaExpressionLevel: number
  ): string {
    let andExp = filter.andFilters
      .map(subFilter =>
        getODataFilterExpression(
          subFilter,
          parentFieldNames,
          targetEntityApi,
          lambdaExpressionLevel
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
          targetEntityApi,
          lambdaExpressionLevel
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

  function getODataFilterExpressionForFilterLink<
    FilterEntityT extends EntityBase,
    DeSerializersT extends DeSerializers
  >(
    filter: FilterLink<
      FilterEntityT,
      DeSerializersT,
      EntityApi<EntityBase, DeSerializersT>
    >,
    parentFieldNames: string[],
    lambdaExpressionLevel: number
  ): string {
    let linkExp = filter.filters
      .map(subFilter =>
        getODataFilterExpression(
          subFilter,
          [...parentFieldNames, filter.link._fieldName],
          filter.link._linkedEntityApi,
          lambdaExpressionLevel
        )
      )
      .filter(f => !!f)
      .join(' and ');
    linkExp = linkExp ? `(${linkExp})` : linkExp;
    return linkExp;
  }

  function getODataFilterExpressionForFilter<FilterEntityT extends EntityBase>(
    filter: Filter<FilterEntityT, DefaultDeSerializers, any>,
    parentFieldNames: string[],
    targetEntityApi: EntityApi<EntityBase, any>
  ): string {
    if (typeof filter.field === 'string') {
      const field = retrieveField(
        filter.field,
        targetEntityApi,
        filter.edmType
      );
      return [
        [...parentFieldNames, filter.field].join('/'),
        filter.operator,
        convertFilterValue(filter.value, field.edmType)
      ].join(' ');
    }
    return [
      filterFunctionToString(filter.field, parentFieldNames),
      filter.operator,
      convertFilterValue(filter.value, filter.edmType!)
    ].join(' ');
  }

  return {
    getFilter
  };
}
