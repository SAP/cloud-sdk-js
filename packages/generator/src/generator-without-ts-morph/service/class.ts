import { codeBlock, ODataVersion } from '@sap-cloud-sdk/util';
import voca from 'voca';
import { VdmEntity, VdmServiceMetadata } from '../../vdm-types';
import { matchEntity } from '../entity-api/match-entity';
import {
  getGenericTypes,
  getGenericTypesWithDefault
} from '../de-serializers-generic-types';
import { hasEntities } from '../../generator-utils';

/**
 * @internal
 */
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

/**
 * @internal
 */
export function serviceClass(service: VdmServiceMetadata): string {
  const serviceHasEntities = hasEntities(service);
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
    
    ${getActionFunctionImports(service, 'functionImports')}
    
    ${getActionFunctionImports(service, 'actionImports')}
    
    ${serviceHasEntities ? getBatch() : ''}

    ${serviceHasEntities ? getChangeset() : ''}
  }`;
}

function getActionFunctionImports(
  service: VdmServiceMetadata,
  type: 'functionImports' | 'actionImports'
): string {
  if (service[type] === undefined || service[type]!.length === 0) {
    return '';
  }

  const lines = service[type]!.map(
    f =>
      `${f.name}:(parameter:${f.parametersTypeName}<DeSerializersT>)=>${f.name}(parameter,this.deSerializers)`
  );

  return codeBlock`
  get ${type}( ) {
    return {${lines.join(',')}}
  }
  `;
}

function getBatch() {
  return codeBlock`
  get batch(): typeof batch {
    return batch;
  }
  `;
}

function getChangeset() {
  return codeBlock`
  get changeset(): typeof changeset {
    return changeset;
  }
  `;
}

function getEntityApiFunction(
  entity: VdmEntity,
  service: VdmServiceMetadata
): string {
  return codeBlock`get ${getApiName(entity.className)}(): ${
    entity.className
  }Api<DeSerializersT> { 
    ${
      entity.navigationProperties.length
        ? withLinks(entity, service)
        : withoutLinks(entity)
    }    
  }`;
}

function withoutLinks(entity: VdmEntity) {
  return `return ${getApiInitializer(entity.className)}`;
}

function withLinks(entity: VdmEntity, service: VdmServiceMetadata): string {
  return `const api = ${getApiInitializer(entity.className)};
  const linkedApis = [
    ${entity.navigationProperties
      .map(navProp =>
        getApiInitializer(matchEntity(navProp, service).className)
      )
      .join(',\n')}
  ];
  api._addNavigationProperties(linkedApis);
  return api`;
}

function getApiInitializer(entityClassName: string): string {
  return `this.initApi('${getApiName(
    entityClassName
  )}', ${entityClassName}Api)`;
}

/**
 * @internal
 * @param entityName - Name of the Entity for which the api property name is build.
 * @returns apiName e.g. testEntityApi if the entity is called TestEntity.
 */
export function getApiName(entityName: string): string {
  return `${voca.decapitalize(entityName)}Api`;
}
