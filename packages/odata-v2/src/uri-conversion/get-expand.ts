import { Selectable, Link } from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import { Entity } from '../entity';

/**
 * @internal
 * Get an object containing the given expand as a query parameter, or an empty object if none was given.
 * In this OData v2 expand, selected properties are automatically added to the expand.
 * @typeparam EntityT - Type of the entity to expand on.
 * @typeparam DeSerializersT - Type of the (de-)serializers.
 * @param selects - The selects which are expanded if necessary.
 * @returns An object containing the query parameter or an empty object.
 */
export function getExpand<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers
>(
  selects: Selectable<EntityT, DeSerializersT>[] = []
): Partial<{ expand: string }> {
  const expand = getExpandsAsString(selects);
  return expand.length ? { expand: expand.join(',') } : {};
}

function getExpandsAsString<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers
>(
  selectables: Selectable<EntityT, DeSerializersT>[],
  initialExpand: string[] = [],
  parent = ''
): string[] {
  return selectables.reduce((combination: string[], selectable) => {
    const fullFieldName = getPath(parent, selectable._fieldName);
    if (selectable instanceof Link) {
      combination = [...combination, fullFieldName];
      if (selectable._selects.length) {
        return getExpandsAsString(
          selectable._selects,
          combination,
          fullFieldName
        );
      }
    }
    return combination;
  }, initialExpand);
}

function getPath(parent: string, fieldName: string): string {
  if (parent) {
    return `${parent}/${fieldName}`;
  }
  return fieldName;
}
