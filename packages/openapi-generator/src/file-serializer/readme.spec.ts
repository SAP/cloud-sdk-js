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
        serviceDescription:
          'With the API, you can, for example, start new workflow instances and work with tasks.',
        originalFileName: '',
        operations: [],
        apis: []
      } as unknown as OpenApiDocument)
    ).toMatchSnapshot();
  });

  it('returns the readme content with usage example', () => {
    expect(
      readme({
        serviceOptions: {
          packageName: '@sap-cloud-sdk/workflow-service',
          directoryName: 'workflow-service'
        },
        serviceName: 'WorkflowAPI',
        serviceDescription:
          'With the API, you can, for example, start new workflow instances and work with tasks.',
        originalFileName: '',
        operations: [],
        apis: [
          {
            name: 'testApi',
            operations: [
              {
                operationId: 'getAll',
                method: 'get',
                responses: {
                  200: { description: 'some response description' }
                },
                tags: [],
                pathParameters: [],
                queryParameters: [],
                response: { type: 'any' },
                pathPattern: ''
              }
            ]
          }
        ]
      } as unknown as OpenApiDocument)
    ).toMatchSnapshot();
  });
});
