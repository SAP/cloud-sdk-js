import { forceArray } from '../../generator-utils';
import { EdmxEntityType } from '../common/edmx-entity-parser';
 import {EdmxEntitySetBase,parseEntitySetsBase,parseEntityTypesBase} from '../common/edmx-entity-parser'
import { ParsedServiceMetadata } from '../parsed-service-metadata';
import { VdmComplexType, VdmEntity } from '../../vdm-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { EdmxMetadata } from './parser-types';
import { createEntityClassNames, joinEntityMetadata, transformEntity } from '../common';
import { joinAssociationMetadata } from './edmx-to-vdm';



export function parseEntitySets(root): EdmxEntitySetBase[] {
  return parseEntitySetsBase(root)
}

interface EdmxNavigationProperty {
  FromRole: string;
  Name: string;
  Relationship: string;
  ToRole: string;
}

function parseEntityType(root):EdmxEntityType<EdmxNavigationProperty>{
  return parseEntityTypesBase(root,{}as EdmxNavigationProperty)
}

interface EdmxAssociationEnd {
  Type: string;
  Multiplicity: string;
  Role: string;
}


export interface EdmxAssociation {
  Name: string;
  'sap:content-version': string;
  End: EdmxAssociationEnd[];
}

export interface EdmxAssociationSet {
  Name: string;
  Association: string;
  'sap:creatable': string;
  'sap:updatable': string;
  'sap:deletable': string;
  'sap:content-version': string;
  End: EdmxAssociationSetEnd[];
}

interface EdmxAssociationSetEnd {
  Role: string;
  EntitySet: string;
}

export function parseAssociationSets(root):EdmxAssociationSet[]{
  return forceArray(root.EntityContainer.AssociationSet)
}

export function parseAssociation(root):EdmxAssociation[]{
  return forceArray(root.Association)
}

export function transformEntitiesV2(
  serviceMetadata: ParsedServiceMetadata,
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): VdmEntity[] {
  const edmxMetadata = serviceMetadata.edmx as EdmxMetadata;
  const entitiesMetadata = joinEntityMetadata(serviceMetadata);
  const classNames = createEntityClassNames(entitiesMetadata, formatter);

  const associations = joinAssociationMetadata(
    edmxMetadata.associationSets,
    edmxMetadata.associations
  );

  return entitiesMetadata.map(entityMetadata => ({
    ...transformEntity(entityMetadata, classNames, complexTypes, formatter),
    navigationProperties: navigationProperties(
      entityMetadata,
      associations,
      classNames,
      formatter
    )
  }));
}
