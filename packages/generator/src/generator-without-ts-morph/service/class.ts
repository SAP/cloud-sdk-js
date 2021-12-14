import { codeBlock } from '@sap-cloud-sdk/util';
import voca from 'voca';
import { VdmEntity, VdmServiceMetadata } from '../../vdm-types';
import {
  getGenericTypes,
  getGenericTypesWithDefault
} from '../de-serializers-generic-types';
import { matchEntity } from '../entity-api/match-entity';

export function serviceClass(service: VdmServiceMetadata): string {
  return codeBlock`export class ${
    service.className
  }<${getGenericTypesWithDefault(service.oDataVersion)}> {
    private apis: Record<string, any> = {};
    private deSerializers: DeSerializers<${getGenericTypes(
      service.oDataVersion
    )}>;

    constructor(deSerializers: Partial<DeSerializers<${getGenericTypes(
      service.oDataVersion
    )}>> = defaultDeSerializers as any) {
      this.deSerializers = mergeDefaultDeSerializersWith(deSerializers);
    }

    private initApi(key: string, ctor: new (...args: any[]) => any): any {
      if (!this.apis[key]) {
        this.apis[key] = new ctor(this.deSerializers);
      }
      return this.apis[key];
    }

    ${service.entities
      .map(entity => getEntityApiFunction(entity, service))
      .join('\n\n')}
  }`;
}

function getEntityApiFunction(
  entity: VdmEntity,
  service: VdmServiceMetadata
): string {
  return codeBlock`get ${voca.decapitalize(entity.className)}Api(): ${
    entity.className
  }Api<${getGenericTypes(service.oDataVersion)}> {
    const api = ${getApiInitializer(entity.className)};
    ${entity.navigationProperties.length ? addLinkedApis(entity, service) : ''}
    return api;
  }`;
}

function addLinkedApis(entity: VdmEntity, service: VdmServiceMetadata): string {
  return `const linkedApis = [
    ${entity.navigationProperties
      .map(navProp =>
        getApiInitializer(matchEntity(navProp, service).className)
      )
      .join(',\n')}
  ];
  api._addNavigationProperties(linkedApis);`;
}

function getApiInitializer(entityClassName: string): string {
  return `this.initApi('${voca.decapitalize(
    entityClassName
  )}Api', ${entityClassName}Api)`;
}
