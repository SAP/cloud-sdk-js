import { OrderableFilterFunction } from '@sap-cloud-sdk/odata-common/internal';
import type moment from 'moment';
import type {
  EntityBase,
  FilterFunctionParameterType
} from '@sap-cloud-sdk/odata-common/internal';

/**
 * Representation of a filter function, that returns a value of type date. This supports DateTimeOffset values.
 */
export class DateFilterFunction<
  EntityT extends EntityBase
> extends OrderableFilterFunction<EntityT, moment.Moment> {
  /**
   * Creates an instance of DateFilterFunction.
   * @param functionName - Name of the function that returns a numeric value.
   * @param parameters - Representation of the parameters passed to the filter function.
   */
  constructor(
    functionName: string,
    parameters: FilterFunctionParameterType<EntityT>[]
  ) {
    super(functionName, parameters, 'Edm.DateTimeOffset');
  }
}
