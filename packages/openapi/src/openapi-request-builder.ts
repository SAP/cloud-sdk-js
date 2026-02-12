/* eslint-disable max-classes-per-file */
// eslint-disable-next-line import/named
import {
  createLogger,
  ErrorWithCause,
  isNullish,
  pickValueIgnoreCase,
  removeSlashes,
  transformVariadicArgumentToArray
} from '@sap-cloud-sdk/util';
import { useOrFetchDestination } from '@sap-cloud-sdk/connectivity';
import {
  assertHttpDestination,
  noDestinationErrorMessage
} from '@sap-cloud-sdk/connectivity/internal';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';
import { filterCustomRequestConfig } from '@sap-cloud-sdk/http-client/internal';
import type {
  Method,
  HttpResponse,
  HttpRequestConfigWithOrigin,
  CustomRequestConfig
} from '@sap-cloud-sdk/http-client';
import type {
  OriginOptions,
  HttpMiddleware
} from '@sap-cloud-sdk/http-client/internal';
import type { HttpDestinationOrFetchOptions } from '@sap-cloud-sdk/connectivity';
import type { AxiosResponse } from 'axios';

const logger = createLogger({
  package: 'openapi',
  messageContext: 'openapi-request-builder'
});

/**
 * @internal
 */
interface EncodingMetadata {
  contentType: string;
  isImplicit: boolean;
  parsedContentTypes: {
    type: string;
    parameters: { [key: string]: string };
  }[];
}

/**
 * Builder class for constructing FormData from a request body with encoding metadata.
 * @internal
 */
class FormDataBuilder {
  constructor(
    private readonly body: Record<string, any>,
    private readonly encoding: Record<string, EncodingMetadata>
  ) {}

  /**
   * Build and return a FormData object from the body and encoding metadata.
   * @returns The constructed FormData object.
   */
  build(): FormData {
    const formData = new FormData();

    for (const [key, value] of Object.entries(this.body ?? {})) {
      if (!this.encoding || !this.encoding[key]) {
        throw new Error(
          `Missing encoding metadata for property '${key}'. ` +
            'This indicates a code generation issue. ' +
            'Please regenerate your API client.'
        );
      }

      const metadata = this.encoding[key];
      const allowedTypes = new Set(
        metadata.parsedContentTypes.map(ct => ct.type.toLowerCase())
      );

      if (value instanceof Blob) {
        this.appendBlob(formData, key, value, metadata);
      } else {
        this.appendString(formData, key, value, metadata, allowedTypes);
      }
    }

    return formData;
  }

  private checkIsFlexibleContentType(metadata: EncodingMetadata, allowedTypes: Set<string>): boolean {
    const { contentType: targetContentType, parsedContentTypes } = metadata;
    return (Boolean(targetContentType) &&
      (targetContentType.includes('*') ||
        parsedContentTypes.length > 1 ||
        allowedTypes.has('any')));
    }

  /**
   * Append a Blob value to the FormData with appropriate content type handling.
   * @param formData - The FormData object to append to.
   * @param key - The field name.
   * @param value - The Blob value to append.
   * @param metadata - Encoding metadata for this field.
   */
  private appendBlob(
    formData: FormData,
    key: string,
    value: Blob,
    metadata: EncodingMetadata
  ): void {
    const { contentType: targetContentType, isImplicit: targetIsImplicit, parsedContentTypes } = metadata;
    const allowedTypes = new Set(
      parsedContentTypes.map(ct => ct.type.toLowerCase())
    );

    const isFlexibleContentType = this.checkIsFlexibleContentType(metadata, allowedTypes);

    // If `Blob` has no type, we use value from the specification unless the target content type is complex (multiple choices or wildcards)
    if (
      !value.type &&
      !isFlexibleContentType &&
      // If the encoding has additional requirements regarding parameters (e.g. charset)
      // we don't want to add a content type that may not meet those requirements,
      // even if the main type should match - in that case the user should provide a Blob with appropriate content type themselves
      !Object.keys(parsedContentTypes[0].parameters).length
    ) {
      logger.debug(
        `Adding missing content type '${targetContentType}' to Blob for key '${key}' as per encoding specification.`
      );
      const withType = new Blob([value], {
        type: targetContentType
      });
      formData.append(key, withType);
      return;
    }

    // If `Blob` has a type, we do a surface-level check to warn users about potential mismatches with the specification
    // unless the target content type is complex (multiple choices or wildcards)
    // or the encoding is implicit (in which case we are more lenient as there was no specific request from the spec)
    const valueContentTypeBase = value.type.split(';')[0].trim();
    if (
      // Don't warn about implicit encodings (less likely to be relevant)
      !targetIsImplicit &&
      // We do not handle more complex content types
      !isFlexibleContentType &&
      // Do the actual comparison
      valueContentTypeBase.toLowerCase() !== targetContentType.toLowerCase()
    ) {
      logger.warn(
        `Content type mismatch for key '${key}': value has type '${value.type}' but encoding specifies '${targetContentType}'.`
      );
    }
    formData.append(key, value);
  }

  /**
   * Append a string value to the FormData with appropriate charset encoding.
   * @param formData - The FormData object to append to.
   * @param key - The field name.
   * @param value - The value to append (will be stringified).
   * @param metadata - Encoding metadata for this field.
   * @param allowedTypes - Set of allowed content types for this field.
   */
  private appendString(
    formData: FormData,
    key: string,
    value: any,
    metadata: EncodingMetadata,
    allowedTypes: Set<string>
  ): void {
    // Handle string data
    // Only use JSON.stringify for application/json content type - otherwise may unduly escape e.g. stringified XML
    // To avoid stringifying pre-stringified JSON, users should use `Blob` or raw `FormData`
    const stringValue = allowedTypes.has('application/json')
      ? JSON.stringify(value)
      : String(value);

    // If a charset is specified in the encoding, we encode the string accordingly (if unambiguous)
    const targetCharset = new Set(
      metadata.parsedContentTypes.map(ct => ct.parameters.charset)
    );

    if (
      targetCharset.size === 1 &&
      targetCharset.values().next().value !== undefined
    ) {
      const targetCharsetValue = targetCharset.values().next().value;

      // Wrap in try-catch to provide better error message if charset encoding fails (e.g. due to unsupported charset or invalid characters for the charset)
      let buffer: Buffer;
      try {
        buffer = Buffer.from(
          stringValue,
          targetCharsetValue as BufferEncoding
        );
      } catch (e: any) {
        throw new ErrorWithCause(
          `Failed to encode form data field '${key}' with charset '${targetCharsetValue}'.`,
          e
        );
      }

      // Append as Blob with appropriate content type if unambiguous
      const isFlexibleContentType = this.checkIsFlexibleContentType(metadata, allowedTypes);
      const maybeContentType = !isFlexibleContentType ? { type: metadata.contentType } : undefined;
      const blob = new Blob([buffer], maybeContentType);
      formData.append(key, blob);
      return;
    }

    formData.append(key, stringValue);
  }
}

/**
 * Request builder for OpenAPI requests.
 * @template ResponseT - Type of the response for the request.
 */
export class OpenApiRequestBuilder<ResponseT = any> {
  private _fetchCsrfToken = true;
  private customHeaders: Record<string, string> = {};
  private customRequestConfiguration: CustomRequestConfig = {};
  private _middlewares: HttpMiddleware[] = [];

  /**
   * Create an instance of `OpenApiRequestBuilder`.
   * @param method - HTTP method of the request to be built.
   * @param pathPattern - Path for the request containing path parameter references as in the OpenAPI specification.
   * @param parameters - Query parameters and or body to pass to the request.
   * @param basePath - The custom path to be prefixed to the API path pattern.
   */
  constructor(
    public method: Method,
    private pathPattern: string,
    private parameters?: OpenApiRequestParameters,
    private basePath?: string
  ) {}

  /**
   * Add custom headers to the request. If a header field with the given name already exists it is overwritten.
   * @param headers - Key-value pairs denoting additional custom headers.
   * @returns The request builder itself, to facilitate method chaining.
   */
  addCustomHeaders(headers: Record<string, string>): this {
    Object.entries(headers).forEach(([key, value]) => {
      this.customHeaders[key.toLowerCase()] = value;
    });
    return this;
  }

  /**
   * Add custom request configuration to the request. Typically, this is used when specifying response type for downloading files.
   * If the custom request configuration contains keys in this list {@link @sap-cloud-sdk/http-client!defaultDisallowedKeys}, they will be removed.
   * @param requestConfiguration - Key-value pairs denoting additional custom request configuration options to be set in the request.
   * @returns The request builder itself, to facilitate method chaining.
   */
  addCustomRequestConfiguration(
    requestConfiguration: CustomRequestConfig
  ): this {
    Object.entries(requestConfiguration).forEach(([key, value]) => {
      this.customRequestConfiguration[key] = value;
    });
    return this;
  }

  /**
   * Skip fetching csrf token for this request, which is typically useful when the csrf token is not required.
   * @returns The request builder itself, to facilitate method chaining.
   */
  skipCsrfTokenFetching(): this {
    this._fetchCsrfToken = false;
    return this;
  }

  /**
   * Set middleware for requests towards the target system given in the destination.
   * @param middlewares - Middlewares to be applied to the executeHttpRequest().
   * @returns The request builder itself, to facilitate method chaining.
   */
  middleware(middlewares: HttpMiddleware | HttpMiddleware[]): this;
  middleware(...middlewares: HttpMiddleware[]): this;
  middleware(
    first: undefined | HttpMiddleware | HttpMiddleware[],
    ...rest: HttpMiddleware[]
  ): this {
    this._middlewares = transformVariadicArgumentToArray(first, rest);
    return this;
  }

  /**
   * Execute request and get a raw {@link @sap-cloud-sdk/http-client!HttpResponse}, including all information about the HTTP response.
   * This especially comes in handy, when you need to access the headers or status code of the response.
   * @param destination - Destination or DestinationFetchOptions to execute the request against.
   * @returns A promise resolving to an {@link @sap-cloud-sdk/http-client!HttpResponse}.
   */
  async executeRaw(
    destination: HttpDestinationOrFetchOptions
  ): Promise<HttpResponse> {
    const fetchCsrfToken =
      this._fetchCsrfToken &&
      ['post', 'put', 'patch', 'delete'].includes(this.method.toLowerCase());

    const resolvedDestination = await useOrFetchDestination(destination);
    if (isNullish(destination)) {
      throw Error(noDestinationErrorMessage(destination));
    }
    assertHttpDestination(resolvedDestination!);

    return executeHttpRequest(resolvedDestination, await this.requestConfig(), {
      fetchCsrfToken
    });
  }

  /**
   * Execute request and get the response data. Use this to conveniently access the data of a service without technical information about the response.
   * @param destination - Destination or DestinationFetchOptions to execute the request against.
   * @returns A promise resolving to the requested return type.
   */
  async execute(
    destination: HttpDestinationOrFetchOptions
  ): Promise<ResponseT> {
    const response = await this.executeRaw(destination);
    if (isAxiosResponse(response)) {
      return response.data;
    }
    throw new Error(
      'Could not access response data. Response was not an axios response.'
    );
  }

  /**
   * Set the custom base path that gets prefixed to the API path parameter before a request.
   * @param basePath - Base path to be set.
   * @returns The request builder itself, to facilitate method chaining.
   */
  setBasePath(basePath: string): this {
    this.basePath = basePath;
    return this;
  }

  /**
   * Get HTTP request config.
   * @returns Promise of the HTTP request config with origin.
   */
  protected async requestConfig(): Promise<HttpRequestConfigWithOrigin> {
    const defaultConfig = {
      method: this.method,
      url: this.getPath(),
      headers: this.getHeaders(),
      params: this.getParameters(),
      middleware: this._middlewares,
      data: this.getBody()
    };
    return {
      ...defaultConfig,
      ...filterCustomRequestConfig(this.customRequestConfiguration)
    };
  }

  private getHeaders(): OriginOptions {
    const options = { requestConfig: this.parameters?.headerParameters || {} };
    if (Object.keys(this.customHeaders).length) {
      return { custom: this.customHeaders, ...options };
    }
    return options;
  }

  private getParameters(): OriginOptions {
    return { requestConfig: this.parameters?.queryParameters || {} };
  }

  private getBody(): any {
    const body = this.parameters?.body;
    const contentType = pickValueIgnoreCase(
      this.parameters?.headerParameters,
      'content-type'
    );

    // Handle multipart/form-data body unless the body is already a FormData instance
    if (contentType === 'multipart/form-data' && !(body instanceof FormData)) {
      const encoding = this.parameters!._encoding!;
      const builder = new FormDataBuilder(body, encoding);
      return builder.build();
    }

    return body;
  }

  private getPath(): string {
    const pathParameters = this.parameters?.pathParameters || {};

    // Get the innermost curly bracket pairs with non-empty and legal content as placeholders.
    const placeholders: string[] = this.pathPattern.match(/{[^/?#{}]+}/g) || [];

    return (
      (this.basePath ? removeSlashes(this.basePath) : '') +
      placeholders.reduce((path: string, placeholder: string) => {
        const strippedPlaceholder = placeholder.slice(1, -1);
        const parameterValue = pathParameters[strippedPlaceholder];
        return path.replace(placeholder, encodeURIComponent(parameterValue));
      }, this.pathPattern)
    );
  }
}

// TODO: Tighten types
/**
 * Type of the request parameters to be passed to {@link OpenApiRequestBuilder}.
 */
export interface OpenApiRequestParameters {
  /**
   * Collection of path parameters.
   */
  pathParameters?: Record<string, any>;
  /**
   * Collection of query parameters.
   */
  queryParameters?: Record<string, any>;
  /**
   * Collection of header parameters.
   */
  headerParameters?: Record<string, any>;
  /**
   * Request body typically used with "create" and "update" operations (POST, PUT, PATCH).
   */
  body?: any;
  /**
   * Encoding metadata for multipart/form-data properties.
   * @internal
   */
  _encoding?: Record<
    string,
    {
      contentType: string;
      isImplicit: boolean;
      parsedContentTypes: {
        type: string;
        parameters: { [key: string]: string };
      }[];
    }
  >;
}

function isAxiosResponse(val: any): val is AxiosResponse {
  return 'data' in val;
}
