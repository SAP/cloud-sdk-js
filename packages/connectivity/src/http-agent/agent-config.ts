import * as http from 'http';

/**
 * Interface for the `http-agent` within the Axios request config.
 */
export interface HttpAgentConfig {
  /**
   * HTTP agent either the node default or an HTTP proxy agent if needed.
   */
  httpAgent: http.Agent;
}

/**
 * Interface for the `https-agent` within the Axios request config.
 */
export interface HttpsAgentConfig {
  /**
   * HTTPS agent either the node default or an HTTPS proxy agent if needed.
   */
  httpsAgent: http.Agent;
}
