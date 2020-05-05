/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity, EntityODataV4 } from '../../entity';
import { Order, Orderable, OrderableODataV4, OrderLink, OrderLinkODataV4, OrderODataV4 } from '../../order';

/**
 * Get an object containing the given order bys as query parameter, or an empty object if none was given.
 *
 * @typeparam EntityT - Type of the entity to order
 * @param orderBy - A list of orderables to get the query parameters for
 * @returns An object containing the query parameter or an empty object
 */
export function getQueryParametersForOrderBy<EntityT extends Entity>(
  orderBy: Orderable<EntityT>[]
): Partial<{ orderby: string }> {
  if (typeof orderBy !== 'undefined' && orderBy.length) {
    return {
      orderby: getODataOrderByExpressions(orderBy).join(',')
    };
  }
  return {};
}

export function getQueryParametersForOrderByODataV4<EntityT extends EntityODataV4>(
  orderBy: OrderableODataV4<EntityT>[]
): Partial<{ orderby: string }> {
  if (typeof orderBy !== 'undefined' && orderBy.length) {
    return {
      orderby: getODataOrderByExpressionsODataV4(orderBy).join(',')
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

function getODataOrderByExpressionsODataV4<OrderByEntityT extends EntityODataV4>(
  orderBys: OrderableODataV4<OrderByEntityT>[],
  parentFieldNames: string[] = []
): string[] {
  return orderBys.reduce(
    (expressions: string[], orderBy: OrderableODataV4<OrderByEntityT>) => {
      if (orderBy instanceof OrderLinkODataV4) {
        return [
          ...expressions,
          getOrderByExpressionForOrderLinkODataV4(orderBy, [...parentFieldNames])
        ];
      }
      return [
        ...expressions,
        getOrderByExpressionForOrderODataV4(orderBy, parentFieldNames)
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

function getOrderByExpressionForOrderLinkODataV4<
  OrderByEntityT extends EntityODataV4,
  LinkedEntityT extends EntityODataV4
  >(
  orderBy: OrderLinkODataV4<OrderByEntityT, LinkedEntityT>,
  parentFieldNames: string[] = []
): string {
  return getODataOrderByExpressionsODataV4(orderBy.orderBy, [
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

function getOrderByExpressionForOrderODataV4<OrderByEntityT extends EntityODataV4>(
  orderBy: OrderODataV4<OrderByEntityT>,
  parentFieldNames: string[] = []
): string {
  return [
    [...parentFieldNames, orderBy._fieldName].join('/'),
    orderBy.orderType
  ].join(' ');
}
