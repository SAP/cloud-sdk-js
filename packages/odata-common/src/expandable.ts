import { AllFields, OneToOneLink } from './selectable';
import { Entity, ODataVersionOf } from './entity';
import { OneToManyLink } from './selectable/one-to-many-link';

/**
 * Represents all expandables, i.e. everything that can be used in an `.expand` statement. Only relevant for OData v4 requests.
 * @typeparam EntityT - Type of the entity to be selected on
 */
export type Expandable<EntityT extends Entity> =
  ODataVersionOf<EntityT> extends 'v2'
    ? never
    :
        | OneToOneLink<EntityT, any>
        | OneToManyLink<EntityT, any>
        | AllFields<EntityT>;
