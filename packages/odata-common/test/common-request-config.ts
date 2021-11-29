/* eslint-disable max-classes-per-file */
import {
  and,
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
  deserializersCommon,
  entityDeserializer as entityDeserializerBase,
  entitySerializer as entitySerializerBase,
  createUriConverter,
  serializersCommon,
  createODataUri,
  createEdmToTs
} from '../src/internal';
import { CommonEntity } from './common-entity';

export const commonUriConverter = createUriConverter(defaultDeSerializersRaw);
export const commonODataUri = createODataUri(
  commonUriConverter,
  () => undefined as any,
  selects =>
    selects?.length ? { select: selects.map(s => s._fieldName).join(',') } : {}
);
const commonEntitySerializer = entitySerializerBase(
  createEdmToTs(serializersCommon)
);
const commonExtractODataEtag = () => undefined;
const commonEntityDeserializer = entityDeserializerBase(
  createEdmToTs(deserializersCommon),
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
): ODataGetAllRequestConfig<CommonEntity> {
  const requestConfig = new ODataGetAllRequestConfig<CommonEntity>(
    CommonEntity,
    commonODataUri
  );
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
): ODataGetByKeyRequestConfig<CommonEntity> {
  return getByKeyRequestBuilder(options).requestConfig;
}

export function deleteRequestConfig(
  options?: Options
): ODataDeleteRequestConfig<CommonEntity> {
  return deleteRequestBuilder(options).requestConfig;
}

export function createRequestConfig(
  options?: Options
): ODataCreateRequestConfig<CommonEntity> {
  return createRequestBuilder(options).requestConfig;
}

export function updateRequestConfig(
  options?: Options
): ODataUpdateRequestConfig<CommonEntity> {
  return updateRequestBuilder(options).requestConfig;
}

export function getAllRequestBuilder(
  options?: Options
): GetAllRequestBuilderBase<CommonEntity> {
  const builder = new CommonGetAllRequestBuilder(
    CommonEntity,
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
): GetByKeyRequestBuilderBase<CommonEntity> {
  if (options?.keys) {
    return new CommonByKeyRequestBuilder(
      CommonEntity,
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
): CreateRequestBuilderBase<CommonEntity> {
  if (options?.payload) {
    return new CommonCreateRequestBuilder(
      CommonEntity,
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
): UpdateRequestBuilderBase<CommonEntity> {
  if (options?.payload) {
    return new CommonUpdateRequestBuilder(
      CommonEntity,
      options.payload! as CommonEntity,
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
): DeleteRequestBuilderBase<CommonEntity> {
  if (options?.keys) {
    return new CommonDeleteRequestBuilder(
      CommonEntity,
      commonODataUri,
      options.keys
    );
  }
  if (options?.payload) {
    return new CommonDeleteRequestBuilder(
      CommonEntity,
      commonODataUri,
      options.payload
    );
  }
  throw new Error(
    'For delete request either set entity for deletion or provide keys via options.'
  );
}

export function batchRequestBuilder(
  requests: (ReadBuilders | BatchChangeSet<WriteBuilder>)[]
): BatchRequestBuilder {
  const builder = new CommonBacthRequestBuilder(
    CommonEntity._defaultServicePath,
    requests,
    { A_CommonEntity: CommonEntity }
  );
  Object.assign(builder.requestConfig, {
    boundary: 'batch_fixed_boundary_for_testing'
  });
  return builder;
}

class CommonGetAllRequestBuilder extends GetAllRequestBuilderBase<CommonEntity> {}

class CommonUpdateRequestBuilder extends UpdateRequestBuilderBase<CommonEntity> {}

class CommonCreateRequestBuilder extends CreateRequestBuilderBase<CommonEntity> {}

class CommonDeleteRequestBuilder extends DeleteRequestBuilderBase<CommonEntity> {
  setVersionIdentifier(eTag: string): this {
    if (eTag) {
      // In principle this is v2/v4 specific, but the method is called in the request config so we provide some dummy implementation.
      this.addCustomHeaders({ 'some-implementation-for-test': eTag });
    }
    return this;
  }
}

class CommonByKeyRequestBuilder extends GetByKeyRequestBuilderBase<CommonEntity> {}

class CommonBacthRequestBuilder extends BatchRequestBuilder {}

type ReadBuilders = CommonByKeyRequestBuilder | CommonGetAllRequestBuilder;
export type WriteBuilder =
  | CommonDeleteRequestBuilder
  | CommonCreateRequestBuilder
  | CommonUpdateRequestBuilder;

const responseDataAccessor: any = () => {
  throw new Error('Response data accesor not implemented for test.');
};
