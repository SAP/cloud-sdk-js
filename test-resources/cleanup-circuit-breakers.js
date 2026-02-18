// Cleanup circuit breakers and nock to prevent test pollution across files

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

function setupNockForConnectionChecks() {
  try {
    const nock = require('nock');
    // @mswjs/interceptors 0.41.x sends HEAD requests for connection checking
    // during parallel test execution. Set up a catch-all HEAD interceptor.
    // Use persist() so it applies to all tests without being consumed.
    nock(/https?:\/\/.*/)
      .persist()
      .head(/.*/)
      .optionally()
      .reply(200);
  } catch (err) {
    // Ignore if nock is not available
  }
}

beforeEach(() => {
  cleanupCircuitBreakers();
  cleanupNock();
  setupNockForConnectionChecks();
});

afterEach(() => {
  cleanupCircuitBreakers();
  cleanupNock();
});
