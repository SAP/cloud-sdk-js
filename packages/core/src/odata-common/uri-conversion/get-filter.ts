import moment from 'moment';
import { Constructable, Entity } from '../entity';
import {
  Filterable,
  isFilterList,
  isFilterLink,
  isFilter,
  FilterFunction,
  FilterFunctionParameterType,
  isBooleanFilterFunction,
  isUnaryFilter,
  UnaryFilter,
  FilterLambdaExpression,
  FilterList,
  FilterLink,
  Filter
} from '../filter';
import { EdmTypeShared } from '../edm-types';
import { ComplexTypeField, FieldType, OneToManyLink } from '../selectable';
import { UriConverter } from '../uri-conversion';
import { isFilterLambdaExpression } from '../filter/filter-lambda-expression';
import { toStaticPropertyFormat } from '../name-converter';

type GetFilterType<EntityT extends Entity> = (
  filter: Filterable<EntityT>,
  entityConstructor: Constructable<EntityT>
) => Partial<{ filter: string }>;

/**
 * Interface representing the return of the getFilter creator [[createGetFilter]].
 */
export interface GetFilter<EntityT extends Entity = any> {
  getFilter: GetFilterType<EntityT>;
}

/**
 * Creates a getFilter function using the OData v2 or OData v4 URI converter.
 * The concrete filter getters are initiated in odata/v2/uri-conversion/odata-uri.ts and odata/v4/uri-conversion/odata-uri.ts.
 *
 * @param uriConverter Uri converter for v2 or v4.
 * @returns The filter getter. See interface [[GetFilter]]
 */
export function createGetFilter(uriConverter: UriConverter): GetFilter {
  /**
   * Get an object containing the given filter as query parameter, or an empty object if none was given.
   *
   * @typeparam EntityT - Type of the entity to filter on
   * @param filter - The filter to transform to a query parameter
   * @param entityConstructor - Constructor type of the entity to filter on
   * @returns An object containing the query parameter with encoding or an empty object
   */
  function getFilter<EntityT extends Entity>(
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
          filter: encodeURIComponent(filterExpression)
        };
      }
    }
    return {};
  }

  function getODataFilterExpression<FilterEntityT extends Entity>(
    filter: Filterable<FilterEntityT>,
    parentFieldNames: string[] = [],
    targetEntityConstructor: Constructable<any>,
    lambdaExpressionLevel = 0
  ): string {
    if (isFilterList(filter)) {
      return getODataFilterExpressionForFilterList(
        filter,
        parentFieldNames,
        targetEntityConstructor,
        lambdaExpressionLevel
      );
    }

    if (isFilterLink(filter)) {
      return getODataFilterExpressionForFilterLink(
        filter,
        parentFieldNames,
        targetEntityConstructor,
        lambdaExpressionLevel
      );
    }

    if (isFilter(filter)) {
      return getODataFilterExpressionForFilter(
        filter,
        parentFieldNames,
        targetEntityConstructor
      );
    }

    if (isBooleanFilterFunction(filter)) {
      return filterFunctionToString(filter, parentFieldNames);
    }

    if (isUnaryFilter(filter)) {
      return getODataFilterExpressionForUnaryFilter(
        filter,
        parentFieldNames,
        targetEntityConstructor
      );
    }

    if (isFilterLambdaExpression(filter)) {
      return getODataFilterExpressionForFilterLambdaExpression(
        filter,
        parentFieldNames,
        targetEntityConstructor,
        lambdaExpressionLevel
      );
    }

    if (filter instanceof OneToManyLink) {
      return getODataFilterExpressionForFilterLink(
        filter._filters,
        parentFieldNames,
        targetEntityConstructor,
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
    targetEntityConstructor: Constructable<any>,
    filterEdmType?: EdmTypeShared<'v2'>
  ) {
    // In case of complex types there will be a property name as part of the filter.field
    const [fieldName] = filterField.split('/');
    const field = targetEntityConstructor[toStaticPropertyFormat(fieldName)];
    if (field instanceof ComplexTypeField) {
      return Object.values(field)
        .filter(pField => pField?.fieldPath) // Filter for ComplexTypePropertyFields only
        .find(pField => pField.fieldPath() === filterField);
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
      return uriConverter.convertToUriFormat(param, 'Edm.String');
    }
    if (param instanceof FilterFunction) {
      return filterFunctionToString(param, parentFieldNames);
    }
    if (moment.isMoment(param)) {
      return uriConverter.convertToUriFormat(param, 'Edm.DateTimeOffset');
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
      ? `[${value
          .map(v => uriConverter.convertToUriFormat(v, edmType))
          .join(',')}]`
      : uriConverter.convertToUriFormat(value, edmType);
  }

  function getODataFilterExpressionForUnaryFilter<FilterEntityT extends Entity>(
    filter: UnaryFilter<FilterEntityT>,
    parentFieldNames: string[],
    targetEntityConstructor: Constructable<any>
  ): string {
    return `${filter.operator} (${getODataFilterExpression(
      filter.singleOperand,
      parentFieldNames,
      targetEntityConstructor
    )})`;
  }

  function getODataFilterExpressionForFilterLambdaExpression<
    FilterEntityT extends Entity
  >(
    filter: FilterLambdaExpression<FilterEntityT>,
    parentFieldNames: string[],
    targetEntityConstructor: Constructable<any>,
    lambdaExpressionLevel: number
  ): string {
    const alias = `a${lambdaExpressionLevel}`;
    const filterExp = getODataFilterExpression(
      filter.filters,
      [alias],
      targetEntityConstructor,
      lambdaExpressionLevel + 1
    );
    return `${parentFieldNames.join('/')}/${
      filter.lambdaOperator
    }(${alias}:${filterExp})`;
  }

  function getODataFilterExpressionForFilterList<FilterEntityT extends Entity>(
    filter: FilterList<FilterEntityT>,
    parentFieldNames: string[],
    targetEntityConstructor: Constructable<any>,
    lambdaExpressionLevel: number
  ): string {
    let andExp = filter.andFilters
      .map(subFilter =>
        getODataFilterExpression(
          subFilter,
          parentFieldNames,
          targetEntityConstructor,
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
          targetEntityConstructor,
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

  function getODataFilterExpressionForFilterLink<FilterEntityT extends Entity>(
    filter: FilterLink<FilterEntityT>,
    parentFieldNames: string[],
    targetEntityConstructor: Constructable<any>,
    lambdaExpressionLevel: number
  ): string {
    let linkExp = filter.filters
      .map(subFilter =>
        getODataFilterExpression(
          subFilter,
          [...parentFieldNames, filter.link._fieldName],
          filter.link._linkedEntity,
          lambdaExpressionLevel
        )
      )
      .filter(f => !!f)
      .join(' and ');
    linkExp = linkExp ? `(${linkExp})` : linkExp;
    return linkExp;
  }

  function getODataFilterExpressionForFilter<FilterEntityT extends Entity>(
    filter: Filter<FilterEntityT, FieldType | FieldType[]>,
    parentFieldNames: string[],
    targetEntityConstructor: Constructable<any>
  ): string {
    if (typeof filter.field === 'string') {
      const field = retrieveField(
        filter.field,
        targetEntityConstructor,
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
