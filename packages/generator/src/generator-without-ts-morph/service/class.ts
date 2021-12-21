import { codeBlock, ODataVersion } from '@sap-cloud-sdk/util';
import voca from 'voca';
import { VdmEntity, VdmServiceMetadata } from '../../vdm-types';
import { matchEntity } from '../entity-api/match-entity';
import {
  getGenericTypes,
  getGenericTypesWithDefault
} from '../de-serializers-generic-types';

export function serviceBuilder(
  serviceName: string,
  oDataVersion: ODataVersion
): string {
  return codeBlock`
  export function ${voca.decapitalize(
    serviceName
  )}<${getGenericTypesWithDefault(oDataVersion)}>(
  deSerializers: Partial<DeSerializers<${getGenericTypes(
    oDataVersion
  )}>> = defaultDeSerializers as any
  ):${serviceName}<DeSerializers<${getGenericTypes(oDataVersion)}>>  
  {
  return new ${serviceName}(mergeDefaultDeSerializersWith(deSerializers))
  }
  `;
}

export function serviceClass(service: VdmServiceMetadata): string {
  return codeBlock`export class ${
    service.className
  }<DeSerializersT extends DeSerializers = DefaultDeSerializers> {
    private apis: Record<string, any> = {};
    private deSerializers: DeSerializersT;

    constructor(deSerializers: DeSerializersT) {
      this.deSerializers = deSerializers;
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
  return codeBlock`get ${getApiName(entity.className)}(): ${
    entity.className
  }Api<DeSerializersT> {
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
  return `this.initApi('${getApiName(
    entityClassName
  )}Api', ${entityClassName}Api)`;
}

/**
 * @internal
 * @param entityName - Name of the Entity for which the api property name is build.
 * @returns apiName e.g. testEntityApi if the entity is called TestEntity.
 */
export function getApiName(entityName: string): string {
  return `${voca.decapitalize(entityName)}Api`;
}
