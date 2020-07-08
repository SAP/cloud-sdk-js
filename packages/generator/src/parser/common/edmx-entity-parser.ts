import { EdmxNamed, EdmxProperty } from './parser-types';
import { forceArray } from '../../generator-utils';
import { EdmxMetadataBase } from '../edmx-parser';

export interface EdmxEntitySetBase extends EdmxNamed {
  EntityType: string;
  'sap:content-version': string;
  'sap:creatable': string;
  'sap:deletable': string;
  'sap:pageable': string;
  'sap:updatable': string;
}

export function parseEntitySetsBase(root): EdmxEntitySetBase[] {
  return forceArray(root.EntityContainer.EntitySet)
}

export function getEntitySetNames(edmxData:EdmxMetadataBase):string[]{
  throw new Error('Not yet implemented')
}


export interface EdmxKey {
  PropertyRef: EdmxNamed[];
}

export interface EdmxEntityType<NavigationType> extends EdmxNamed {
  Key: EdmxKey;
  Property: EdmxProperty[];
  'sap:content-version': string;
  'sap:label'?: string;
  NavigationProperty:NavigationType[]
}

//TODO more elegant way to pass the type in?
export function parseEntityTypesBase<NavigationType>(root,foo:NavigationType): EdmxEntityType<NavigationType>[] {
  return forceArray(root.EntityType).map(e => {
    if (!e.Key) {
      e.Key = {};
    }
    e.Key.PropertyRef = forceArray(e.Key.PropertyRef);
    e.NavigationProperty = forceArray(e.NavigationProperty);
    e.Property = forceArray(e.Property);
    return e;
  });
}
