import {
  createEntityClassNames,
  joinEntityMetadata,
  navigationPropertyBase,
  transformEntityBase
} from '../common/entity';
import {
  VdmComplexType,
  VdmEntity,
  VdmNavigationProperty
} from '../../vdm-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import {
  EdmxEntitySetBase,
  JoinedEntityMetadata
} from '../../edmx-parser/common/edmx-types';
import {
  EdmxAssociation,
  EdmxAssociationSet,
  EdmxEntityTypeV2,
  End,
  JoinedAssociationMetadata
} from '../../edmx-parser/v2/edm-types';
import {
  parseAssociation,
  parseAssociationSets,
  parseEntitySetsV2,
  parseEntityTypes
} from '../../edmx-parser/v2/edmx-parser';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import { stripNamespace } from '../edmx-to-vdm-util';

/**
 * @internal
 */
export function generateEntitiesV2(
  serviceMetadata: ServiceMetadata,
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): VdmEntity[] {
  const entitySets = parseEntitySetsV2(serviceMetadata.edmx.root);
  const entityTypes = parseEntityTypes(serviceMetadata.edmx.root);
  const entitiesMetadata = joinEntityMetadata(
    entitySets,
    entityTypes,
    serviceMetadata.swagger
  );
  const classNames = createEntityClassNames(entitiesMetadata, formatter);

  const associations = joinAssociationMetadata(
    parseAssociationSets(serviceMetadata.edmx.root),
    parseAssociation(serviceMetadata.edmx.root)
  );

  return entitiesMetadata.map(entityMetadata => ({
    ...transformEntityBase(
      entityMetadata,
      classNames,
      complexTypes,
      [],
      [],
      [],
      formatter
    ),
    navigationProperties: navigationProperties(
      entityMetadata,
      associations,
      classNames,
      formatter
    )
  }));
}

function navigationProperties(
  entity: JoinedEntityMetadata<EdmxEntitySetBase, EdmxEntityTypeV2>,
  associations: JoinedAssociationMetadata[],
  classNames: { [originalName: string]: string },
  formatter: ServiceNameFormatter
): VdmNavigationProperty[] {
  const entityType = entity.entityType;

  return entityType.NavigationProperty.map(navProp => {
    const relationship = navProp.Relationship.split('.').pop();
    const association = associations
      .filter(ass => ass.Name === relationship)
      .pop();
    if (!association) {
      throw Error(
        `Unable to find the association with the name: ${relationship}`
      );
    }
    const from = association.Ends.find(end => end.Role === navProp.FromRole);
    const to = association.Ends.find(end => end.Role === navProp.ToRole);

    if (!from) {
      throw Error(
        `Unable to get the role property of the association ends: ${association.Ends} with the name: ${navProp.FromRole}`
      );
    }
    if (!to) {
      throw Error(
        `Unable to get the role property of the association ends: ${association.Ends} with the name: ${navProp.ToRole}`
      );
    }

    return {
      ...navigationPropertyBase(navProp.Name, entity.entitySet.Name, formatter),
      from: entity.entityType.Name,
      to: to.EntitySet,
      toEntityClassName: classNames[to.EntitySet],
      isCollection: to.Multiplicity.endsWith('*')
    };
  });
}
/**
 * @internal
 */
export function joinAssociationMetadata(
  associationSets: EdmxAssociationSet[],
  associations: EdmxAssociation[]
): JoinedAssociationMetadata[] {
  return associationSets.map(assocSet => {
    const matchingAssoc = associations.find(
      a => a.Name === stripNamespace(assocSet.Association)
    );

    if (!matchingAssoc) {
      throw Error(
        `Unable to match the association set: ${assocSet.Association} with associations: ${associations}.`
      );
    }

    const ends = assocSet.End.map(
      assocSetEnd =>
        ({
          ...assocSetEnd,
          ...matchingAssoc.End.find(end => end.Role === assocSetEnd.Role)
        } as End)
    );

    return {
      Name: matchingAssoc.Name,
      'sap:creatable': assocSet['sap:creatable'],
      'sap:updatable': assocSet['sap:updatable'],
      'sap:deletable': assocSet['sap:deletable'],
      'sap:content-version': assocSet['sap:content-version'],
      Ends: ends
    };
  });
}
