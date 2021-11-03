/* eslint-disable max-classes-per-file */
import {
  and,
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
  ODataRequestConfig
} from '../src';
import { CommonEntity } from './common-entity';
import { commonOdataUri } from './common-odata-uri';
import { commonEntitySerializer } from './common-serializer';
import {
  commonEntityDeserializer,
  commonExtractODataEtag
} from './common-deserializer';

interface Options {
  filter?: Filterable<CommonEntity, any>;
  headers?: Record<string, any>;
  keys?: Record<string, any>;
  payload?: EntityBase;
}

function addBaseOptions(requestConfig: ODataRequestConfig, options?: Options) {
  if (options?.headers) {
    requestConfig.addCustomHeaders(options.headers);
  }
  if (options?.payload) {
    requestConfig.payload = commonEntitySerializer.serializeEntity(
      options.payload,
      CommonEntity
    );
  }
}

export function getAllRequestConfig(
  options?: Options
): ODataGetAllRequestConfig<CommonEntity> {
  const requestConfig = new ODataGetAllRequestConfig<CommonEntity>(
    CommonEntity,
    commonOdataUri
  );
  if (options?.filter) {
    requestConfig.filter = and([options?.filter]);
  }
  addBaseOptions(requestConfig);
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
      commonOdataUri,
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
  return new CommonCreateRequestBuilder(
    CommonEntity,
    options!.payload! as CommonEntity,
    commonOdataUri,
    commonEntitySerializer,
    commonEntityDeserializer,
    responseDataAccessor
  );
}

export function updateRequestBuilder(
  options?: Options
): UpdateRequestBuilderBase<CommonEntity> {
  return new CommonUpdateRequestBuilder(
    CommonEntity,
    options!.payload! as CommonEntity,
    commonOdataUri,
    commonEntitySerializer,
    commonExtractODataEtag,
    body => body
  );
}

export function deleteRequestBuilder(
  options?: Options
): DeleteRequestBuilderBase<CommonEntity> {
  if (options?.keys) {
    return new CommonDeleteRequestBuilder(
      CommonEntity,
      commonOdataUri,
      options.keys
    );
  }
  if (options?.payload) {
    return new CommonDeleteRequestBuilder(
      CommonEntity,
      commonOdataUri,
      options.payload
    );
  }
  throw new Error(
    'For delete request either set entity for deletion or provide keys via options.'
  );
}

export function changeSet(
  requests: WriteBuilder[]
): BatchChangeSet<WriteBuilder> {
  return new BatchChangeSet<any>(requests, 'changeSet_boundary');
}

type ReadBuilders = CommonByKeyRequestBuilder | CommonGetAllRequestBuilder;
type WriteBuilder =
  | CommonDeleteRequestBuilder
  | CommonCreateRequestBuilder
  | CommonUpdateRequestBuilder;

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

const responseDataAccessor: any = () => {
  throw new Error('Response data accesor not implemented for test.');
};
