/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  setTestDestination,
  unmockAllTestDestinations
} from '@sap-cloud-sdk/test-util';
import {
  PercentActionEnum,
  PriceCalculateResponse
} from './test-services/PriceCalculation';
import {
  getPriceCalculate,
  getPriceCalculateWithVanillaOpenApi
} from './util/get-price-calculate';

beforeEach(() => {
  setTestDestination({
    name: 'VLAB',
    url:
      'https://sandbox.api.sap.com/sapomnichannelpromotionpricing/calculation'
  });
});

afterEach(() => {
  unmockAllTestDestinations();
});

describe('Get price calculate', () => {
  it('should get value and action from getPriceCalculate', async () => {
    const response = await getPriceCalculate();
    assertPriceCalculateResponse(response);
  });

  it('should get value and action from the vanilla version of the getPriceCalculate', async () => {
    const response = await getPriceCalculateWithVanillaOpenApi();
    assertPriceCalculateResponse(response);
  });
});

function assertPriceCalculateResponse(response: PriceCalculateResponse) {
  const percent = response.PriceCalculateBody![0].ShoppingBasket.LineItem[0]
    .Sale!.RetailPriceModifier![0].Percent!;
  expect(percent.value).toBe(10);
  expect(percent.Action).toBe(PercentActionEnum.Subtract);
}
