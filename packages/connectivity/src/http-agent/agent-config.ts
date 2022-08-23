import * as http from 'http';

/**
 * Interface for the `http-agent` within the Axios request config.
 */
export interface HttpAgentConfig {
  /**
   * TODO-JSDOC.
   */
  httpAgent: http.Agent;
}

/**
 * Interface for the `https-agent` within the Axios request config.
 */
export interface HttpsAgentConfig {
  /**
   * TODO-JSDOC.
   */
  httpsAgent: http.Agent;
}
