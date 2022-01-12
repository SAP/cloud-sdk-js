import { EntityApi, EntityBase } from '../entity-base';
import { Orderable, OrderLink, Order } from '../order';
import { DeSerializers } from '../de-serializers';

/**
 * Get an object containing the given order bys as query parameter, or an empty object if none was given.
 * @typeparam EntityT - Type of the entity to order
 * @param orderBy - A list of orderables to get the query parameters for
 * @returns An object containing the query parameter or an empty object
 * @internal
 */
export function getOrderBy<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(
  orderBy: Orderable<
    EntityT,
    DeSerializersT,
    EntityApi<EntityBase, DeSerializersT>
  >[]
): Partial<{ orderby: string }> {
  if (typeof orderBy !== 'undefined' && orderBy.length) {
    return {
      orderby: getODataOrderByExpressions(orderBy).join(',')
    };
  }
  return {};
}

function getODataOrderByExpressions<
  OrderByEntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT>
>(
  orderBys: Orderable<OrderByEntityT, DeSerializersT, LinkedEntityApiT>[],
  parentFieldNames: string[] = []
): string[] {
  return orderBys.reduce(
    (
      expressions: string[],
      orderBy: Orderable<OrderByEntityT, DeSerializersT, LinkedEntityApiT>
    ) => {
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
  OrderByEntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT>
>(
  orderBy: OrderLink<OrderByEntityT, DeSerializersT, LinkedEntityApiT>,
  parentFieldNames: string[] = []
): string {
  return getODataOrderByExpressions(orderBy.orderBy, [
    ...parentFieldNames,
    orderBy.link._fieldName
  ]).join(',');
}

function getOrderByExpressionForOrder<OrderByEntityT extends EntityBase>(
  orderBy: Order<OrderByEntityT>,
  parentFieldNames: string[] = []
): string {
  return [
    [...parentFieldNames, orderBy._fieldName].join('/'),
    orderBy.orderType
  ].join(encodeURIComponent(' '));
}
