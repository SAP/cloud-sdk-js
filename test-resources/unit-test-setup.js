// Cleanup circuit breakers and nock to prevent test pollution across unit tests
// E2E tests should NOT include this file as they make real HTTP requests

function cleanupCircuitBreakers() {
  try {
    const { circuitBreakers } = require('@sap-cloud-sdk/resilience/internal');
    Object.keys(circuitBreakers).forEach(key => {
      try {
        circuitBreakers[key].shutdown();
      } catch (err) {
        // Ignore errors from already shutdown breakers
      }
      delete circuitBreakers[key];
    });
  } catch (err) {
    // Ignore if resilience package is not available
  }
}

function cleanupNock() {
  try {
    const nock = require('nock');
    // Abort any pending requests that haven't completed
    nock.abortPendingRequests();
    // Clean up any remaining interceptors from previous tests
    nock.cleanAll();
  } catch (err) {
    // Ignore if nock is not available
  }
}

beforeEach(() => {
  cleanupCircuitBreakers();
  cleanupNock();
});

afterEach(() => {
  cleanupCircuitBreakers();
  cleanupNock();
});
