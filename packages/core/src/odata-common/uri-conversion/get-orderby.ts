import { Entity } from '../entity';
import { Orderable, OrderLink, Order } from '../order';

/**
 * Get an object containing the given order bys as query parameter, or an empty object if none was given.
 * @typeparam EntityT - Type of the entity to order
 * @param orderBy - A list of orderables to get the query parameters for
 * @returns An object containing the query parameter or an empty object
 */
export function getOrderBy<EntityT extends Entity>(
  orderBy: Orderable<EntityT>[]
): Partial<{ orderby: string }> {
  if (typeof orderBy !== 'undefined' && orderBy.length) {
    return {
      orderby: getODataOrderByExpressions(orderBy).join(',')
    };
  }
  return {};
}

function getODataOrderByExpressions<OrderByEntityT extends Entity>(
  orderBys: Orderable<OrderByEntityT>[],
  parentFieldNames: string[] = []
): string[] {
  return orderBys.reduce(
    (expressions: string[], orderBy: Orderable<OrderByEntityT>) => {
      if (orderBy instanceof OrderLink) {
        return [
          ...expressions,
          getOrderByExpressionForOrderLink(orderBy, [...parentFieldNames])
        ];
      }
      return [
        ...expressions,
        getOrderByExpressionForOrder(orderBy, parentFieldNames)
      ];
    },
    []
  );
}

function getOrderByExpressionForOrderLink<
  OrderByEntityT extends Entity,
  LinkedEntityT extends Entity
>(
  orderBy: OrderLink<OrderByEntityT, LinkedEntityT>,
  parentFieldNames: string[] = []
): string {
  return getODataOrderByExpressions(orderBy.orderBy, [
    ...parentFieldNames,
    orderBy.link._fieldName
  ]).join(',');
}

function getOrderByExpressionForOrder<OrderByEntityT extends Entity>(
  orderBy: Order<OrderByEntityT>,
  parentFieldNames: string[] = []
): string {
  return [
    [...parentFieldNames, orderBy._fieldName].join('/'),
    orderBy.orderType
  ].join(' ');
}
