/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import moment from 'moment';
import { EntityBase } from '../../common';
import { FilterFunctionParameterType } from '../../common/filter';
import { OrderableFilterFunction } from '../../common/filter/orderable-filter-function';

/**
 * Representation of a filter function, that returns a value of type date. This supports DateTimeOffset values.
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
