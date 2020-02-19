/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { MapType } from '@sap-cloud-sdk/util';
import * as http from 'http';
import * as https from 'https';

export interface DestinationHttpRequestConfig {
  baseURL: string;
  headers: MapType<string>;
  httpAgent?: http.Agent;
  httpsAgent?: https.Agent;
}

export enum HttpMethod {
  GET = 'GET',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH'
}

/**
 * This interface is compatible with AxiosRequestConfig.
 */
export interface HttpRequestConfig {
  url?: string;
  method: HttpMethod;
  data?: MapType<any>;
  params?: MapType<string>;
  timeout?: number;
  maxContentLength?: number;
}

export type HttpRequest = DestinationHttpRequestConfig & HttpRequestConfig;

export type ExecuteHttpRequestFn = (request: HttpRequest) => Promise<HttpResponse>;

interface KnownHttpResponseFields {
  data: any;
  status: number;
  headers: any;
}

export interface HttpResponse extends KnownHttpResponseFields {
  [otherKey: string]: any;
}

/**
 * @deprecated Since v1.6.4. Use [[HttpResponse]] instead.
 */
export interface HttpReponse extends KnownHttpResponseFields {
  [otherKey: string]: any;
}
