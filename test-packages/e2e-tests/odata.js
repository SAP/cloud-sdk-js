/* eslint-disable @typescript-eslint/no-var-requires */
const cds = require('@sap/cds');
const express = require('express');

module.exports = {
  createODataApp() {
    const app = express();
    cds
      .serve('all')
      .to('odata') // Use odata format (default is 'fiori')
      .in(app);

    return app;
  }
};
