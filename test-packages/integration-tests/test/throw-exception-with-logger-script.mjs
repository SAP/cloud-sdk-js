import { createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger('throw-exception-with-logger');
logger.info('Some log statement.');
throw new Error('Test Exception Logger');
