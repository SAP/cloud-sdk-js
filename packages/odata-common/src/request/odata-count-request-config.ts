import { createLogger, pick, removeTrailingSlashes } from '@sap-cloud-sdk/util';
import { DeSerializers } from '../de-serializers';
import { EntityBase } from '../entity-base';
import type { GetAllRequestBuilderBase } from '../request-builder';
import { ODataRequestConfig } from './odata-request-config';

const logger = createLogger({
  package: 'odata-common',
  messageContext: 'count-request-config'
});

/**
 * OData count request configuration for an entity type.
 * @typeparam EntityT - Type of the entity to setup a request for
 * @internal
 */
export class ODataCountRequestConfig<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> extends ODataRequestConfig {
  /**
   * Creates an instance of ODataGetAllRequestConfig.
   * @param getAllRequest - Get all request builder to count result for.
   */
  constructor(
    readonly getAllRequest: GetAllRequestBuilderBase<EntityT, DeSerializersT>
  ) {
    super(
      'get',
      getAllRequest._entityApi.entityConstructor._defaultServicePath
    );
  }

  resourcePath(): string {
    return `${removeTrailingSlashes(
      this.getAllRequest._entityApi.entityConstructor._entityName
    )}/$count`;
  }

  queryParameters(): Record<string, any> {
    const parametersAllowedInCount = ['$apply', '$search', '$filter'];
    const parameters = this.getAllRequest.requestConfig.queryParameters();

    Object.keys(parameters).forEach(key => {
      if (!parametersAllowedInCount.includes(key)) {
        logger.warn(
          `The query parameter ${key} must not be used in a count request and has been ignored.`
        );
      }
    });

    return pick(parametersAllowedInCount, parameters);
  }
}
