import { apiDocumentation, operationDocumentation } from './docs';
import { OpenApiOperation } from '../openapi-types';

describe('docs',()=>{
  function getOperation():OpenApiOperation{
    return  {
      response:{type:'string'},
      method: 'GET',
      pathPattern: 'my/Api',
      pathParameters:[]as any,
      queryParameters:[] as any
    }as OpenApiOperation
  }

  it('creates documentation for the api',()=>{
    expect(apiDocumentation({name:'TestApi'}as any,{serviceName:"TestService"} as any)).toMatchSnapshot()
  })

  it('creates a description if not present',()=>{
    const operation = getOperation()
    expect(operationDocumentation(operation)).toMatchSnapshot()
  })

  it('uses the description if present',()=>{
    const operation= {...getOperation(),description:'This is my Operation.'}
    expect(operationDocumentation(operation)).toMatch(/This is my Operation/)
  })

  it('creates documentation with path parameters',()=>{
    const operation = getOperation();
    operation.pathParameters = [{name:'pathParameter1'},{name:'pathParameter2'}] as any
    expect(operationDocumentation(operation)).toMatchSnapshot()
  })

  it('creates documentation with query parameters object',()=>{
    const operation = getOperation();
    operation.queryParameters = [{name:'pathParameter1'},{name:'pathParameter2'}] as any
    expect(operationDocumentation(operation)).toMatchSnapshot()
  })

  it('creates documentation with body parameter',()=>{
    const operation = getOperation();
    operation.requestBody = {} as any
    expect(operationDocumentation(operation)).toMatchSnapshot()
  })

})
