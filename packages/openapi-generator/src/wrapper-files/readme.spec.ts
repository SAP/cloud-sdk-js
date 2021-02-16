import { readme } from './readme';

describe('readme', () => {
  it('returns the readme content', () => {
    expect(
      readme({
        npmPackageName: '@sap-cloud-sdk/workflow-service',
        apiName: 'WorkflowAPI',
        directoryName: '',
        originalFileName: '',
        operations: []
      })
    ).toMatchSnapshot();
  });
});
