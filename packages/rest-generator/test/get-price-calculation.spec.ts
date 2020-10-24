/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  setTestDestination,
  unmockAllTestDestinations
} from '@sap-cloud-sdk/test-util';
import { PercentActionEnum } from './poc/generated/PriceCalculation';
import { getPriceCalculateV3 } from './util/get-price-calculate';

describe('Get promotion', () => {
  it('should get value and action', async () => {
    setTestDestination({
      name: 'VLAB',
      url:
        'https://sandbox.api.sap.com/sapomnichannelpromotionpricing/calculation'
    });

    const response = await getPriceCalculateV3();
    const percent = response.PriceCalculateBody![0].ShoppingBasket.LineItem[0]
      .Sale!.RetailPriceModifier![0].Percent!;
    expect(percent.value).toBe(10);
    expect(percent.Action).toBe(PercentActionEnum.Subtract);

    unmockAllTestDestinations();
  });
});
