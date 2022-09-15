import { Protocol } from './protocol';

/**
 * Proxy settings for connecting to an on-premise destination via connectivity proxy or web proxies.
 * The ProxyConfiguration is `undefined` in most cases. The logic for setting it is as follows:
 * - If the destination has proxy type "OnPremise" the connectivity service proxy is used.
 * - Depending on the protocol in the destination URL the proxy environment variables `http_proxy` and `https_proxy` are considered.
 *
 * Valid form for the variable is `http://user:password@host:port` where everything besides the host is optional.
 * For user and password non alphanumeric characters need to be percent-encoded.
 * Note: The [no_proxy] environment variables contains a list of URLs for which no proxy will be used even if [http_proxy, https_proxy] are set.
 * Wildcards like *.some.domain.com are not supported while checking the no_proxy env.
 */
export interface ProxyConfiguration {
  /**
   * The host of the proxy.
   */
  host: string;

  /**
   * The port of the proxy.
   */
  port: number;

  /**
   * The protocol used by the proxy.
   *
   */
  protocol: Protocol;

  /**
   * HTTP headers to be added to a request if tunneled through the proxy.
   */
  headers?: ProxyConfigurationHeaders;

  /**
   * A JWT for proxy authorization, which is used when http headers are not applicable, e.g., using socket protocols.
   */
  'proxy-authorization'?: string;
}

/**
 * Represents the request headers when using a proxy like the connectivity proxy to reach On-Premise systems.
 */
export interface ProxyConfigurationHeaders {
  [header: string]: string | undefined;
  /**
   * `Proxy-Authorization` header sent to the proxy.
   */
  'Proxy-Authorization': string;
  /**
   * `SAP-Connectivity-Authentication` header sent via the proxy to the target system containing the propagated user.
   */
  'SAP-Connectivity-Authentication'?: string;
}
