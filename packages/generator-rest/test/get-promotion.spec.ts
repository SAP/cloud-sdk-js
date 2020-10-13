/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { PercentActionEnum } from './poc/generated/calculation';
import { getPromotion } from './poc/promotion.service';
import { setTestDestination, unmockAllTestDestinations } from '@sap-cloud-sdk/test-util';

describe('Get promotion', () => {

  it('should get value and action', async () => {
    setTestDestination({name: 'VLAB', url: 'https://sandbox.api.sap.com/sapomnichannelpromotionpricing/calculation'})

    const promotion = await getPromotion();
    expect(promotion.value).toBe(10);
    expect(promotion.Action).toBe(PercentActionEnum.Subtract);

    unmockAllTestDestinations();
  });
});
