import { v4 as uuid } from 'uuid';
import { MethodRequestBuilder } from './request-builder-base';
import type { HttpDestinationOrFetchOptions } from '@sap-cloud-sdk/connectivity';
import type { HttpResponse } from '@sap-cloud-sdk/http-client';
import type {
  ODataRequestConfig,
  BatchReference,
  WithBatchReference
} from '../request';
import type { DeSerializers } from '../de-serializers';

/**
 * Create OData request to execute an action or function.
 * @typeParam DeSerializersT - Type of the (de-)serializers.
 * @typeParam ReturnT - Type of the function return value.
 * @typeParam RequestConfigT - Type of the request config.
 */
export abstract class OperationRequestBuilderBase<
  DeSerializersT extends DeSerializers,
  ReturnT,
  RequestConfigT extends ODataRequestConfig
>
  extends MethodRequestBuilder<RequestConfigT>
  implements WithBatchReference
{
  private _batchReference: BatchReference;
  /**
   * Base class for function and action request builder.
   * @param responseTransformer - Transformation function for the response.
   * @param requestConfig - Request config for an action or function.
   * @param _deSerializers - (De-)serializers used for transformation.
   */
  protected constructor(
    readonly responseTransformer: (data: any) => ReturnT,
    requestConfig: RequestConfigT,
    readonly _deSerializers: DeSerializersT
  ) {
    super(requestConfig);
  }
  /**
   * Execute request.
   * @param destination - Destination or DestinationFetchOptions to execute the request against.
   * @param dataAccessor - A function to modify the received response data.
   * @returns A promise resolving to the requested return type.
   */
  async execute(
    destination: HttpDestinationOrFetchOptions,
    dataAccessor?: (data: any) => any
  ): Promise<ReturnT> {
    return this.executeRaw(destination).then(response => {
      const data = dataAccessor
        ? { d: dataAccessor(response.data) }
        : response.data;
      return this.responseTransformer(data);
    });
  }

  /**
   * Execute request and return an {@link @sap-cloud-sdk/http-client!HttpResponse}.
   * @param destination - Destination or DestinationFetchOptions to execute the request against.
   * @returns A promise resolving to an {@link @sap-cloud-sdk/http-client!HttpResponse}.
   */
  async executeRaw(
    destination: HttpDestinationOrFetchOptions
  ): Promise<HttpResponse> {
    return this.build(destination).then(request => request.execute());
  }

  /**
   * Gets identifier for the batch request.
   * @returns Batch request identifier.
   */
  getBatchReference(): BatchReference {
    if (!this._batchReference) {
      this.setBatchId(uuid());
    }
    return this._batchReference;
  }

  /**
   * Sets user-defined identifier for the batch reference.
   * @param id - User-defined batch request identifier.
   */
  setBatchId(id: string): void {
    this._batchReference = { id };
  }
}
