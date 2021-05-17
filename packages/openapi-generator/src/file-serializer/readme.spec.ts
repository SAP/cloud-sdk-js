import { OpenApiDocument } from '../openapi-types';
import { readme } from './readme';

describe('readme', () => {
  it('returns the readme content', () => {
    expect(
      readme({
        serviceOptions: {
          packageName: '@sap-cloud-sdk/workflow-service',
          directoryName: ''
        },
        serviceName: 'WorkflowAPI',
        originalFileName: '',
        operations: []
      } as unknown as OpenApiDocument)
    ).toMatchSnapshot();
  });
});
