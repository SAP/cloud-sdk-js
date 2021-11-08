import { EntityBase, ODataVersionOf } from './entity-base';
import { OneToManyLink } from './selectable/one-to-many-link';
import { AllFields } from './selectable/all-fields';
import { OneToOneLink } from './selectable/one-to-one-link';

/**
 * Represents all expandables, i.e. everything that can be used in an `.expand` statement. Only relevant for OData v4 requests.
 * @typeparam EntityT - Type of the entity to be selected on
 */
export type Expandable<EntityT extends EntityBase> =
  ODataVersionOf<EntityT> extends 'v2'
    ? never
    :
        | OneToOneLink<EntityT, any>
        | OneToManyLink<EntityT, any>
        | AllFields<EntityT>;
