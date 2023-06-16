// eslint-disable-next-line @typescript-eslint/no-var-requires
const util = require('@sap-cloud-sdk/util');
util.muteLoggers();

if (typeof $jsDebugIsRegistered !== 'undefined') {
  jest.setTimeout(5 * 60 * 1000);
}
