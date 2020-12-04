/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const { createCapApp } = require('./cap');
const { createOpenApiApp } = require('./openapi');

async function startServer() {
  const app = express();
  const odataApp = createCapApp();
  const restApp = await createOpenApiApp();

  app.use('/odata', odataApp);
  app.use('/openapi', restApp);

  app.listen(4004, () => {
    console.info('listening at http://localhost:4004');
  });
}

startServer();
