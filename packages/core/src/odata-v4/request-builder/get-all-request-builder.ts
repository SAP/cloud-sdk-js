import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { EntityV4 } from '../entity';
import { entityDeserializerV4 } from '../entity-deserializer';
import {
  EntityIdentifiable,
  Constructable,
  Filterable,
  and,
  ODataGetAllRequestConfig,
  Expandable,
  GetAllRequestBuilderBase,
  toFilterableList,
  OneToManyLink
} from '../../odata-common';
import { oDataUriV4 } from '../uri-conversion';
import { EdmTypeMappingV4 } from '../../odata-v4/payload-value-converter';
import { DateTime } from '../../temporal-deserializers';
import { responseDataAccessorV4 } from './response-data-accessor';
export class GetAllRequestBuilderV4<
    EntityT extends EntityV4<DateTimeT>,
    DateTimeT extends DateTime
  >
  extends GetAllRequestBuilderBase<EntityT, DateTimeT>
  implements EntityIdentifiable<EntityT> {
  readonly _entity: EntityT;

  /**
   * Creates an instance of GetAllRequestBuilder.
   *
   * @param entityConstructor - Constructor of the entity to create the request for
   */
  constructor(entityConstructor: Constructable<EntityT>, dateTime?: DateTimeT) {
    super(
      entityConstructor,
      new ODataGetAllRequestConfig(entityConstructor, oDataUriV4),
      entityDeserializerV4,
      responseDataAccessorV4
    );
  }

  expand(expands: Expandable<EntityT>[]): this;
  expand(...expands: Expandable<EntityT>[]): this;
  expand(
    first: undefined | Expandable<EntityT> | Expandable<EntityT>[],
    ...rest: Expandable<EntityT>[]
  ): this {
    this.requestConfig.expands = variadicArgumentToArray(first, rest);
    return this;
  }

  // TODO: Reconsider the OneToManyLink here
  /**
   * Add filter statements to the request.
   *
   * @param expressions - Filter expressions to restrict the response
   * @returns The request builder itself, to facilitate method chaining
   */
  filter(
    ...expressions: (Filterable<EntityT> | OneToManyLink<EntityT, any>)[]
  ): this {
    this.requestConfig.filter = and(toFilterableList(expressions));
    return this;
  }
  // TODO make global config to avoid calling all the time
  transformV3<
    targetDateTimeT extends DateTime,
    targetEntityT extends EntityV4<targetDateTimeT>
  >(
    dateTimeMiddleware: targetDateTimeT,
    entityCons: Constructable<targetEntityT>
  ): GetAllRequestBuilderV4<targetEntityT, targetDateTimeT> {
    this.dateTimeMiddleware = dateTimeMiddleware;

    return new GetAllRequestBuilderV4(entityCons, dateTimeMiddleware);
  }
}
