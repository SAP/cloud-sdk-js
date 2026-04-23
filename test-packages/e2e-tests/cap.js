/* eslint-disable @typescript-eslint/no-var-requires */
const cds = require('@sap/cds');
const express = require('express');

module.exports = {
  async createCapApp() {
    const app = express();

    const model = await cds.load('*');
    cds.model = model;
    await cds.deploy(model).to('db');

    await cds
      .serve('all')
      .from(model)
      .to('odata') // Use odata format (default is 'fiori')
      .in(app);

    return app;
  }
};
