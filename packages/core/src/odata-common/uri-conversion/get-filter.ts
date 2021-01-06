import moment from 'moment';
import { Constructable, Entity } from '../entity';
import {
  Filterable,
  isFilterList,
  isFilterLink,
  isFilter,
  FilterFunction,
  FilterFunctionParameterType
} from '../filter';
import { EdmTypeShared } from '../edm-types';
import { ComplexTypeField, FieldType } from '../selectable';
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
   * @returns An object containing the query parameter or an empty object
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
          filter: filterExpression
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

    if (isFilterLink(filter)) {
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
          convertFilterValue(filter.value, field.edmType)
        ].join(' ');
      }
      return [
        filterFunctionToString(filter.field, parentFieldNames),
        filter.operator,
        convertFilterValue(filter.value, filter.edmType!)
      ].join(' ');
    }

    if (isFilterLambdaExpression(filter)) {
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

    throw new Error(
      `Could not construct query parameters from filter. Filter is not valid: ${filter}`
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

  return {
    getFilter
  };
}
