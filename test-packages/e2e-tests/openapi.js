/* eslint-disable @typescript-eslint/no-var-requires */
const OpenAPIBackend = require('openapi-backend').default;
const express = require('express');
const SwaggerParser = require('@apidevtools/swagger-parser');

const jsf = require('json-schema-faker');

async function getSchemas() {
  // SchemaObject
  const document = await SwaggerParser.dereference(
    '../../test-resources/openapi-service-specs/test-service.json'
  );

  return document.components.schemas;
}

function mockData(schemas, schemaName) {
  return jsf.resolve(schemas[schemaName]);
}

function mockTestEntity(schema) {
  return mockData(schema, 'TestEntity');
}

async function createApi() {
  const api = new OpenAPIBackend({
    definition: '../../test-resources/openapi-service-specs/test-service.json'
  });

  const schema = await getSchemas();
  const entities = [
    await mockTestEntity(schema),
    await mockTestEntity(schema),
    await mockTestEntity(schema),
    await mockTestEntity(schema)
  ];

  entities[0].keyProperty = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

  api.register({
    headEntities: (c, req, res) => {
      const hasCsrfFetchHeader = Object.entries(c.request.headers).some(
        ([key, value]) =>
          key.toLowerCase() === 'x-csrf-token' &&
          value.toLowerCase() === 'fetch'
      );
      if (hasCsrfFetchHeader) {
        return res.status(204).set('x-csrf-token', 'e2e-test-token').end();
      }
      return res.status(204).end();
    },
    getAllEntities: (c, req, res) => res.status(200).json(entities),
    countEntities: (c, req, res) => res.status(200).json(entities.length),
    getEntityByKey: (c, req, res) => {
      const entityId = c.request.params.entityId;
      const entity = entities.find(e => e.keyProperty === entityId);
      if (entity) {
        return res.status(200).json(entity);
      }
      return res.status(400).json({ err: 'Bad request' });
    },
    createEntity: (c, req, res) => {
      const hasCsrfHeader = Object.entries(c.request.headers).some(
        ([key, value]) =>
          key.toLowerCase() === 'x-csrf-token' &&
          value.toLowerCase() === 'e2e-test-token'
      );
      if (hasCsrfHeader) {
        entities.push(c.request.requestBody);
        return res.status(201).end();
      }
      return res.status(400).json({ err: 'Invalid or missing CSRF token.' });
    },
    validationFail: (c, req, res) => {
      res.status(400).json({ err: c.validation.errors });
    },
    notFound: (c, req, res) => res.status(404).json({ err: 'not found' })
  });

  api.init();

  return api;
}

module.exports = {
  async createOpenApiApp() {
    const api = await createApi();
    const app = express();
    app.use(express.json());
    app.use(async (req, res) => api.handleRequest(req, req, res));

    return app;
  }
};
