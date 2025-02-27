import { serviceClass } from './class';
import type { VdmOperation, VdmServiceMetadata } from '../../vdm-types';

describe('class', () => {
  const service: VdmServiceMetadata = {
    oDataVersion: 'v2',
    originalFileName: 'API_A_SERV',
    serviceOptions: {
      directoryName: 'a-serv',
      packageName: '@sap/a-serv',
      basePath: '/path/to/serv'
    },

    complexTypes: [],
    enumTypes: [],
    entities: [],
    operations: [],
    namespaces: ['namespace'],
    speakingModuleName: 'moduleName',
    className: 'AService',
    edmxPath: 'edmxPath'
  };

  it('contains no operations if not in VDM', () => {
    const result = serviceClass(service);
    expect(result).not.toContain('operations');
  });

  it('contains operations if in VDM', () => {
    const result = serviceClass({
      ...service,
      operations: [
        { name: 'myFunction', parametersTypeName: 'paraName' } as VdmOperation,
        { name: 'myAction', parametersTypeName: 'paraName' } as VdmOperation
      ]
    });
    expect(result).toContain('operations');
    expect(result).toContain(
      'myFunction:(parameter:paraName<DeSerializersT>)=>myFunction(parameter,this.deSerializers)'
    );
    expect(result).toContain(
      'myAction:(parameter:paraName<DeSerializersT>)=>myAction(parameter,this.deSerializers)'
    );
  });

  it('contains batch and changeset functions if there are entities', () => {
    const result = serviceClass({
      ...service,
      entities: [
        {
          entitySetName: 'entitySet',
          entityTypeName: 'entityType',
          className: 'className',
          creatable: false,
          updatable: false,
          deletable: false,
          keys: [
            {
              originalName: 'prop',
              description: 'desc',
              instancePropertyName: 'prop',
              propertyNameAsParam: 'prop',
              staticPropertyName: 'prop',
              isCollection: false,
              nullable: false,
              edmType: 'Edm.String',
              jsType: 'string',
              fieldType: 'Field'
            }
          ],
          properties: [
            {
              originalName: 'prop',
              description: 'desc',
              instancePropertyName: 'prop',
              propertyNameAsParam: 'prop',
              staticPropertyName: 'prop',
              isCollection: false,
              nullable: false,
              edmType: 'Edm.String',
              jsType: 'string',
              fieldType: 'Field'
            }
          ],
          navigationProperties: [],
          description: 'desc',
          entityTypeNamespace: 'ns',
          operations: []
        }
      ]
    });
    expect(result).toContain('get batch(): typeof batch');
    expect(result).toContain('get changeset(): typeof changeset');
  });

  it('does not contain batch nor changeset functions if there are no entities', () => {
    const result = serviceClass({
      ...service
    });
    expect(result).not.toContain('get batch(): typeof batch');
    expect(result).not.toContain('get changeset(): typeof changeset');
  });
});
