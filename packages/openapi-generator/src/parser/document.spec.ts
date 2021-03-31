import { OpenAPIV3 } from 'openapi-types';
import { createRefs, emptyDocument } from '../../test/test-util';
import { OpenApiObjectSchema } from '../openapi-types';
import { parseOpenApiDocument, parseSchemas } from './document';
import ResponseObject = OpenAPIV3.ResponseObject;
import ComponentsObject = OpenAPIV3.ComponentsObject;

describe('parseOpenApiDocument', () => {
  it('does not modify input service specification', () => {
    const input = {
      ...emptyDocument,
      paths: {
        '/entity': {
          parameters: [{ name: 'param1', in: 'query' }],
          get: {
            parameters: [{ name: 'param2', in: 'query' }]
          }
        }
      }
    };

    const clonedInput = JSON.parse(JSON.stringify(input));
    const parsedDocument = parseOpenApiDocument(
      input,
      'TestService',
      'openapi/test-service.json',
      {
        'test-service': {
          npmPackageName: '@sap/cloud-sdk-openapi-vdm-test-service',
          directoryName: 'test-service'
        }
      }
    );

    expect(input).toStrictEqual(clonedInput);
    expect(parsedDocument).not.toBe(input);
  });

  it('parses simple schema with description',()=>{
    const components: OpenAPIV3.ComponentsObject={
      schemas:{
        'SimpleSchema':{
          description: 'Schema Description',
          type: 'string'
        }
      }
    };

    const input: OpenAPIV3.Document = getDocument(getResponse('SimpleSchema'),components);

    expect(parseSchemas(input,{}as any)).toStrictEqual([{ 'description': 'Schema Description', 'name': 'SimpleSchema', 'schema': { 'type': 'string' } }]);
  });

  it('parses object schemas with description referenced',async()=>{
    const components: OpenAPIV3.ComponentsObject={
      schemas:{
        'PropertySchema':{
          description: 'Property Description',
              type: 'string'
          },
      'ObjectSchema':{
        description: 'Object Description',
        type: 'object',
        properties: {
          prop1: {
            $ref: '#/components/schemas/PropertySchema'
          }
        }
      }
    }
    };

    const input: OpenAPIV3.Document = getDocument(getResponse('ObjectSchema'),components);

    const parsed = parseSchemas(input,await createRefs(components));
    const objectSchema = parsed.find(schema=>schema.name==='ObjectSchema');
    const propertySchema = parsed.find(schema=>schema.name==='PropertySchema');
    expect(objectSchema!.description).toBe('Object Description');
    expect((objectSchema!.schema as OpenApiObjectSchema).properties[0].description).toBe('Property Description');
    expect(propertySchema!.description).toBe('Property Description');
  });

  it('parses object schemas with description inline',async()=>{
    const components: OpenAPIV3.ComponentsObject={
      schemas:{
        'ObjectSchema':{
          description: 'Object Description',
          type: 'object',
          properties: {
            prop1: {
              description: 'Property Description',
              type: 'string'
            }
          }
        }
      }
    };

    const input: OpenAPIV3.Document = getDocument(getResponse('ObjectSchema'),components);

    const parsed = parseSchemas(input,await createRefs(components));
    const objectSchema = parsed.find(schema=>schema.name==='ObjectSchema');
    expect(objectSchema!.description).toBe('Object Description');
    expect((objectSchema!.schema as OpenApiObjectSchema).properties[0].description).toBe('Property Description');
  });

  function getDocument(responseObject: OpenAPIV3.ResponseObject,components: OpenAPIV3.ComponentsObject): OpenAPIV3.Document{
    return {
      ...emptyDocument,
      paths: {
        '/entity': {
          parameters: [{ name: 'param1', in: 'query' }],
          get: {
            parameters: [{ name: 'param2', in: 'query' }],
            responses: { '200':responseObject }
          }
        }
      },
      components
    };
  }

  function getResponse(schemaName: string): OpenAPIV3.ResponseObject{
    return {
    description: 'Response description',
    content: {
      'application/json': {
        schema: {
          $ref: `#/components/schemas/${schemaName}`
        }
      }
    }
  };
  }
});
