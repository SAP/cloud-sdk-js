/* eslint-disable max-classes-per-file */
import {
  and,
  DefaultDeSerializers,
  defaultDeSerializersRaw,
  BatchChangeSet,
  ODataCreateRequestConfig,
  Filterable,
  GetAllRequestBuilderBase,
  BatchRequestBuilder,
  EntityBase,
  ODataDeleteRequestConfig,
  ODataUpdateRequestConfig,
  DeleteRequestBuilderBase,
  UpdateRequestBuilderBase,
  CreateRequestBuilderBase,
  ODataGetByKeyRequestConfig,
  ODataGetAllRequestConfig,
  GetByKeyRequestBuilderBase,
  entitySerializer,
  createUriConverter,
  createODataUri,
  defaultDeSerializers,
  entityDeserializer
} from '../src/internal';
import { CommonEntity, commonEntityApi } from './common-entity';

export const commonUriConverter = createUriConverter(defaultDeSerializersRaw);
export const commonODataUri = createODataUri(
  defaultDeSerializers,
  () => undefined as any,
  selects =>
    selects?.length ? { select: selects.map(s => s._fieldName).join(',') } : {}
);
const commonEntitySerializer = entitySerializer(defaultDeSerializers);
const commonExtractODataEtag = () => undefined;
const commonEntityDeserializer = entityDeserializer(
  defaultDeSerializers,
  commonExtractODataEtag,
  () => undefined as any
);

interface Options {
  filter?: Filterable<CommonEntity, any>;
  headers?: Record<string, any>;
  keys?: Record<string, any>;
  payload?: EntityBase;
}

export function getAllRequestConfig(
  options?: Options
): ODataGetAllRequestConfig<CommonEntity, DefaultDeSerializers> {
  const requestConfig = new ODataGetAllRequestConfig<
    CommonEntity,
    DefaultDeSerializers
  >(commonEntityApi, commonODataUri);
  if (options?.filter) {
    requestConfig.filter = and([options?.filter]);
  }
  if (options?.headers) {
    requestConfig.addCustomHeaders(options.headers);
  }
  return requestConfig;
}

export function getByKeyRequestConfig(
  options?: Options
): ODataGetByKeyRequestConfig<CommonEntity, DefaultDeSerializers> {
  return getByKeyRequestBuilder(options).requestConfig;
}

export function deleteRequestConfig(
  options?: Options
): ODataDeleteRequestConfig<CommonEntity, DefaultDeSerializers> {
  return deleteRequestBuilder(options).requestConfig;
}

export function createRequestConfig(
  options?: Options
): ODataCreateRequestConfig<CommonEntity, DefaultDeSerializers> {
  return createRequestBuilder(options).requestConfig;
}

export function updateRequestConfig(
  options?: Options
): ODataUpdateRequestConfig<CommonEntity, DefaultDeSerializers> {
  return updateRequestBuilder(options).requestConfig;
}

export function getAllRequestBuilder(
  options?: Options
): GetAllRequestBuilderBase<CommonEntity, DefaultDeSerializers> {
  const builder = new CommonGetAllRequestBuilder(
    commonEntityApi,
    getAllRequestConfig(options),
    commonEntityDeserializer,
    responseDataAccessor
  );
  if (options?.headers) {
    builder.addCustomHeaders(options?.headers);
  }
  return builder;
}

export function getByKeyRequestBuilder(
  options?: Options
): GetByKeyRequestBuilderBase<CommonEntity, DefaultDeSerializers> {
  if (options?.keys) {
    return new CommonByKeyRequestBuilder(
      commonEntityApi,
      options?.keys,
      commonODataUri,
      commonEntityDeserializer,
      responseDataAccessor
    );
  }
  throw new Error(
    'You need to specify the keys in the options for a getByKey request builder.'
  );
}

export function createRequestBuilder(
  options?: Options
): CreateRequestBuilderBase<CommonEntity, DefaultDeSerializers> {
  if (options?.payload) {
    return new CommonCreateRequestBuilder(
      commonEntityApi,
      options.payload! as CommonEntity,
      commonODataUri,
      commonEntitySerializer,
      commonEntityDeserializer,
      responseDataAccessor
    );
  }

  throw new Error(
    'You need to specify the payload in the options for a create request builder.'
  );
}

export function updateRequestBuilder(
  options?: Options
): UpdateRequestBuilderBase<CommonEntity, DefaultDeSerializers> {
  if (options?.payload) {
    return new CommonUpdateRequestBuilder(
      commonEntityApi,
      options.payload as CommonEntity,
      commonODataUri,
      commonEntitySerializer,
      commonExtractODataEtag,
      body => body
    );
  }
  throw new Error(
    'You need to specify the payload in the options for update request builder.'
  );
}

export function deleteRequestBuilder(
  options?: Options
): DeleteRequestBuilderBase<CommonEntity, DefaultDeSerializers> {
  if (options?.keys) {
    return new CommonDeleteRequestBuilder(
      commonEntityApi,
      commonODataUri,
      options.keys
    );
  }
  if (options?.payload) {
    return new CommonDeleteRequestBuilder(
      commonEntityApi,
      commonODataUri,
      options.payload
    );
  }
  throw new Error(
    'For delete request either set entity for deletion or provide keys via options.'
  );
}

export function batchRequestBuilder(
  requests: (ReadBuilders | BatchChangeSet)[]
): BatchRequestBuilder<DefaultDeSerializers> {
  const builder = new CommonBatchRequestBuilder(
    CommonEntity._defaultServicePath,
    requests
  );
  Object.assign(builder.requestConfig, {
    boundary: 'batch_fixed_boundary_for_testing'
  });
  return builder;
}

class CommonGetAllRequestBuilder extends GetAllRequestBuilderBase<
  CommonEntity,
  DefaultDeSerializers
> {}

class CommonUpdateRequestBuilder extends UpdateRequestBuilderBase<
  CommonEntity,
  DefaultDeSerializers
> {}

class CommonCreateRequestBuilder extends CreateRequestBuilderBase<
  CommonEntity,
  DefaultDeSerializers
> {}

class CommonDeleteRequestBuilder extends DeleteRequestBuilderBase<
  CommonEntity,
  DefaultDeSerializers
> {
  setVersionIdentifier(eTag: string): this {
    if (eTag) {
      // In principle this is v2/v4 specific, but the method is called in the request config so we provide some dummy implementation.
      this.addCustomHeaders({ 'some-implementation-for-test': eTag });
    }
    return this;
  }
}

class CommonByKeyRequestBuilder extends GetByKeyRequestBuilderBase<
  CommonEntity,
  DefaultDeSerializers
> {}

class CommonBatchRequestBuilder extends BatchRequestBuilder<DefaultDeSerializers> {}

type ReadBuilders = CommonByKeyRequestBuilder | CommonGetAllRequestBuilder;
export type WriteBuilder =
  | CommonDeleteRequestBuilder
  | CommonCreateRequestBuilder
  | CommonUpdateRequestBuilder;

const responseDataAccessor: any = () => {
  throw new Error('Response data accesor not implemented for test.');
};
