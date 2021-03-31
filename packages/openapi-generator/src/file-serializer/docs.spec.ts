import { OpenApiOperation } from '../openapi-types';
import { apiDocumentation, operationDocumentation, schemaDocumentation } from './docs';

describe('docs', () => {
  function getOperation(): OpenApiOperation {
    return {
      response: { type: 'string' },
      method: 'GET',
      pathPattern: 'my/Api',
      pathParameters: [] as any,
      queryParameters: [] as any
    } as OpenApiOperation;
  }

  it('creates documentation for the api', () => {
    expect(
      apiDocumentation(
        { name: 'TestApi' } as any,
        'TestService'
      )
    ).toMatchSnapshot();
  });

  it('creates a description for operations if not present', () => {
    const operation = getOperation();
    expect(operationDocumentation(operation)).toMatchSnapshot();
  });

  it('uses the description for operations if present', () => {
    const operation = {
      ...getOperation(),
      description: 'This is my Operation.'
    };
    expect(operationDocumentation(operation)).toMatch(/This is my Operation/);
  });

  it('creates documentation with path parameters', () => {
    const operation = getOperation();
    operation.pathParameters = [
      { name: 'pathParameter1' },
      { name: 'pathParameter2' }
    ] as any;
    expect(operationDocumentation(operation)).toMatchSnapshot();
  });

  it('uses path parameter description if present', () => {
    const operation = getOperation();
    operation.pathParameters = [
      {
        name: 'pathParameter1',
        description: 'This is my parameter description'
      }
    ] as any;
    expect(operationDocumentation(operation)).toMatch(
      /This is my parameter description/
    );
  });

  it('creates documentation with query parameters object', () => {
    const operation = getOperation();
    operation.queryParameters = [
      { name: 'queryParameter1' },
      { name: 'queryParameter2' }
    ] as any;
    expect(operationDocumentation(operation)).toMatchSnapshot();
  });

  it('creates documentation with body parameter', () => {
    const operation = getOperation();
    operation.requestBody = { schema: { type: 'string' }, required: true };
    expect(operationDocumentation(operation)).toMatchSnapshot();
  });

  it('uses the body description if present', () => {
    const operation = getOperation();
    operation.requestBody = { schema: { type: 'string' },description:'My body description', required: true };
    expect(operationDocumentation(operation)).toMatch(/My body description/);
  });

  it('creates the signature in order path parameter, body, queryParameter and returns last', () => {
    const operation = getOperation();
    operation.pathParameters = [{ name: 'pathParameter1' }] as any;
    operation.requestBody = { schema: { type: 'string' }, required: false };
    operation.queryParameters = [
      { name: 'queryParameter1' },
      { name: 'queryParameter2' }
    ] as any;
    operation.requestBody = { schema: { type: 'string' }, required: true };
    expect(operationDocumentation(operation)).toMatch(
      /@param pathParameter1.*\s.*@param body.*\s.*@param queryParameters.*\s.*@returns/
    );
  });

  it('creates schema documentation',()=>{
    expect(schemaDocumentation({ name:'mySchema' } as any)).toMatchSnapshot();
  });

  it('uses the schema description documentation if present',()=>{
    expect(schemaDocumentation({ name:'mySchema',description:'My schmema description.' } as any)).toMatch(/My schmema description/);
  });
});
