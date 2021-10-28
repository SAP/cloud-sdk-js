import { createLogger, pick, removeTrailingSlashes } from '@sap-cloud-sdk/util';
import { EntityBase } from '../entity-base';
import type { GetAllRequestBuilderBase } from '../request-builder/get-all-request-builder-base';
import { ODataRequestConfig } from './odata-request-config';

const logger = createLogger({
  package: 'core',
  messageContext: 'count-request-config'
});

/**
 * OData count request configuration for an entity type.
 * @typeparam EntityT - Type of the entity to setup a request for
 * @internal
 */
export class ODataCountRequestConfig<
  EntityT extends EntityBase
> extends ODataRequestConfig {
  /**
   * Creates an instance of ODataGetAllRequestConfig.
   * @param entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(readonly getAllRequest: GetAllRequestBuilderBase<EntityT>) {
    super('get', getAllRequest._entityConstructor._defaultServicePath);
  }

  resourcePath(): string {
    return `${removeTrailingSlashes(
      this.getAllRequest._entityConstructor._entityName
    )}/$count`;
  }

  queryParameters(): Record<string, any> {
    const parametersAllowedInCount = ['$apply', '$search', '$filter'];
    const defaultParameters = ['$format'];
    const parameters = this.getAllRequest.requestConfig.queryParameters();

    Object.keys(parameters).forEach(key => {
      if (
        !parametersAllowedInCount.includes(key) &&
        !defaultParameters.includes(key)
      ) {
        logger.warn(
          `The query parameter ${key} must not be used in a count request and has been ignored.`
        );
      }
    });

    return pick(parametersAllowedInCount, parameters);
  }
}
