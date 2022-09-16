import {
  WriteResponses as WriteResponsesCommon,
  ReadResponse as ReadResponseCommon,
  WriteResponse as WriteResponseCommon,
  ErrorResponse
} from '@sap-cloud-sdk/odata-common/internal';
import { DefaultDeSerializers, DeSerializers } from './de-serializers';

/**
 * Union of the possible batch responses: {@link @sap-cloud-sdk/odata-common!ReadResponse | ReadResponseCommon}, {@link @sap-cloud-sdk/odata-common!WriteResponses | WriteResponsesCommon} and {@link @sap-cloud-sdk/odata-common!ErrorResponse}.
 */
export type BatchResponse<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> =
  | ReadResponseCommon<DeSerializersT>
  | WriteResponsesCommon<DeSerializersT>
  | ErrorResponse;

/**
 * @internal
 */
export type WriteResponses<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> = WriteResponsesCommon<DeSerializersT>;

/**
 * @internal
 */
export type ReadResponse<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> = ReadResponseCommon<DeSerializersT>;

/**
 * @internal
 */
export type WriteResponse<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> = WriteResponseCommon<DeSerializersT>;
