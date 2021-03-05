import { OpenApiDocument } from '../openapi-types';
import { readme } from './readme';

describe('readme', () => {
  it('returns the readme content', () => {
    expect(
      readme(({
        npmPackageName: '@sap-cloud-sdk/workflow-service',
        serviceName: 'WorkflowAPI',
        directoryName: '',
        originalFileName: '',
        operations: []
      } as unknown) as OpenApiDocument)
    ).toMatchSnapshot();
  });
});
