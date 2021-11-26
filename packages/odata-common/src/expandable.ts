import { EntityBase, ODataVersionOf } from './entity-base';
import { OneToManyLink , AllFields , OneToOneLink } from './selectable';

/**
 * Represents everything that can be used in an `.expand` statement. Only relevant for OData v4 requests.
 * @typeparam EntityT - Type of the entity to be selected on
 * @internal
 */
export type Expandable<EntityT extends EntityBase> =
  ODataVersionOf<EntityT> extends 'v2'
    ? never
    :
        | OneToOneLink<EntityT, any>
        | OneToManyLink<EntityT, any>
        | AllFields<EntityT>;
