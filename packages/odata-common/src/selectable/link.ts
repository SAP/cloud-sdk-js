import { DeSerializers } from '../de-serializers';
import { EntityBase, EntityIdentifiable } from '../entity-base';
import type { Expandable } from '../expandable';
import { EntityApi, EntityType } from '../entity-api';
import type { Selectable } from './selectable';

/**
 * Represents a navigation property of an OData entity.
 *
 * OData is a relational data model, i.e. entities can be related to one another.
 * For example, BusinessPartner is in a 1:n relation with BusinessPartnerAddress and in a 1:1 relation with Customer.
 * Like normal properties, navigation properties can be used for selecting (expanding) and filtering.
 * For example, when constructing a query on the BusinessPartner entity, an instance of `Link<BusinessPartner, Customer>`
 * can be passed as argument to the select function, e.g. `BusinessPartner.TO_CUSTOMER`.
 *
 * NOTE: Due to historical development the Link and its extensions are used in the following way:
 * OData v2 entity: 1:N is a [[Link]], 1:0..1 is a [[OneToOneLink]]
 * OData v4 entity: 1:N is a [[OneToManyLink]], 1:0..1 is a [[OneToOneLink]]
 *
 * See also: [[Selectable]]
 * @typeparam EntityT - Type of the entity to be linked from
 * @typeparam LinkedEntityT - Type of the entity to be linked to
 */
export class Link<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT>
> implements EntityIdentifiable<EntityT, DeSerializersT>
{
  readonly _entity: EntityT;
  readonly _deSerializers: DeSerializersT;

  /**
   * List of selectables on the linked entity.
   */
  _selects: Selectable<EntityType<LinkedEntityApiT>, DeSerializersT>[] = [];
  _expand: Expandable<
    EntityType<LinkedEntityApiT>,
    DeSerializersT,
    EntityApi<EntityBase, DeSerializersT>
  >[] = [];

  /**
   * Creates an instance of Link.
   * @param _fieldName - Name of the linking field to be used in the OData request.
   * @param _entityApi - Entity API for building and executing the request.
   * @param _linkedEntity - Constructor of the linked entity.
   */
  constructor(
    readonly _fieldName: string,
    readonly _entityApi: EntityApi<EntityT, DeSerializersT>,
    readonly _linkedEntityApi: LinkedEntityApiT
  ) {}

  /**
   * Creates a selection on a linked entity. Has the same behavior as [[GetAllRequestBuilder.select | GetAllRequestBuilderV2.select]] and [[GetByKeyRequestBuilderV4.select]] but for linked entities.
   *
   * See also, [[Selectable]]
   * @param selects - Selection of fields or links on a linked entity
   * @returns The link itself, to facilitate method chaining
   */
  select(
    ...selects: Selectable<EntityType<LinkedEntityApiT>, DeSerializersT>[]
  ): this {
    const link = this.clone();
    link._selects = selects;
    return link;
  }

  expand(
    ...expands: Expandable<
      EntityType<LinkedEntityApiT>,
      DeSerializersT,
      EntityApi<EntityBase, DeSerializersT>
    >[]
  ): this {
    const link = this.clone();
    link._expand = expands;
    return link;
  }

  /**
   * Create a new link based on a given link.
   * @typeparam EntityT - Type of the entity to be linked from
   * @typeparam LinkedEntityT - Type of the entity to be linked to
   * @param link - Link to be cloned
   * @returns Newly created link
   */
  clone(): this {
    const clonedLink = new (this.constructor as any)(
      this._fieldName,
      this._entityApi,
      this._linkedEntityApi
    );
    clonedLink._selects = this._selects;
    clonedLink._expand = this._expand;
    return clonedLink;
  }
}
