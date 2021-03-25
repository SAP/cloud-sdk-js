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
      entities.push(c.request.requestBody);
      return res.status(201).end();
    },
    validationFail: (c, req, res) => {
      console.log('fail');
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
