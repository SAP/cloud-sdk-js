import { VdmServiceMetadata } from '../../vdm-types';
import { serviceClass } from './class';

describe('class', () => {
  const service: VdmServiceMetadata = {
    oDataVersion: 'v2',
    originalFileName: 'API_A_SERV',
    directoryName: 'a-serv',
    npmPackageName: '@sap/a-serv',
    servicePath: '/path/to/serv',
    complexTypes: [],
    enumTypes: [],
    entities: [],
    functionImports: [],
    namespaces: ['namespace'],
    speakingModuleName: 'moduleName',
    className: 'AService',
    edmxPath: 'edmxPath'
  };

  it('contains no actionImports and functionImports if not in VDM', () => {
    const result = serviceClass(service);
    expect(result).not.toContain('functionImport');
    expect(result).not.toContain('actionImports');
  });

  it('contains functionImports if in VDM', () => {
    const result = serviceClass({
      ...service,
      functionImports: [
        { name: 'myFunction', parametersTypeName: 'paraName' } as any
      ]
    });
    expect(result).toContain('functionImport');
    expect(result).toContain(
      'myFunction:(parameter:paraName<DeSerializersT>)=>myFunction(parameter,this.deSerializers)'
    );
  });

  it('contains actionImports if in VDM', () => {
    const result = serviceClass({
      ...service,
      actionImports: [
        { name: 'myAction', parametersTypeName: 'paraName' } as any
      ]
    });
    expect(result).toContain('actionImport');
    expect(result).toContain(
      'myAction:(parameter:paraName<DeSerializersT>)=>myAction(parameter,this.deSerializers)'
    );
  });
});
