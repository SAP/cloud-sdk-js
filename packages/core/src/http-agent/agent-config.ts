import * as http from 'http';

/**
 * Interface for the http-agent within the Axios request config.
 */
export interface HttpAgentConfig {
  httpAgent: http.Agent;
}

/**
 * Interface for the https-agent within the Axios request config.
 */
export interface HttpsAgentConfig {
  httpsAgent: http.Agent;
}
