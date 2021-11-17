import moment from 'moment';
import {
  EntityBase,
  FilterFunctionParameterType,
  OrderableFilterFunction
  // eslint-disable-next-line import/no-internal-modules
} from '@sap-cloud-sdk/odata-common/internal';

/**
 * Representation of a filter function, that returns a value of type date. This supports DateTimeOffset values.
 * @internal
 */
export class DateFilterFunction<
  EntityT extends EntityBase
> extends OrderableFilterFunction<EntityT, moment.Moment> {
  /**
   * Creates an instance of DateFilterFunction.
   * @param functionName - Name of the function that returns a numeric value
   * @param parameters - Representation of the parameters passed to the filter function
   * @param edmType - Type of the returned numeric value. This influences the formatting of the returned value.
   */
  constructor(
    functionName: string,
    parameters: FilterFunctionParameterType<EntityT>[]
  ) {
    super(functionName, parameters, 'Edm.DateTimeOffset');
  }
}
