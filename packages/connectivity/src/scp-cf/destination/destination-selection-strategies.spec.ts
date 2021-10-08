import { createLogger } from '@sap-cloud-sdk/util';
import { AllDestinations } from './destination-accessor-types';
import {
  alwaysProvider,
  alwaysSubscriber,
  subscriberFirst
} from './destination-selection-strategies';

const target = {
  name: 'testination',
  url: 'success',
  authTokens: null,
  originalProperties: {}
};

const failure = {
  name: 'testination',
  url: 'fail',
  authTokens: null,
  originalProperties: {}
};

describe('destination-selection-strategies', () => {
  it('return null if there is no match', () => {
    const allDestinations: AllDestinations = {
      subscriber: {
        instance: [],
        subaccount: []
      },
      provider: {
        instance: [],
        subaccount: []
      }
    };

    expect(subscriberFirst(allDestinations, 'testination')).toBe(null);
    expect(alwaysSubscriber(allDestinations, 'testination')).toBe(null);
    expect(alwaysProvider(allDestinations, 'testination')).toBe(null);
  });

  it('warns if there are multiple matches in instance and subaccount', () => {
    const logger = createLogger({
      package: 'core',
      messageContext: 'destination-selection-strategies'
    });
    const warnSpy = jest.spyOn(logger, 'warn');
    const allDestinations: AllDestinations = {
      subscriber: {
        instance: [target],
        subaccount: [failure, target]
      },
      provider: {
        instance: [],
        subaccount: []
      }
    };
    subscriberFirst(allDestinations, 'testination');
    expect(warnSpy).toHaveBeenCalledWith(
      "Found destinations named 'testination' for both, the destination service instance and subaccount. Using instance destination."
    );
  });

  describe('subscriberFirst', () => {
    it('prioritizes subscriber instance over subaccount', () => {
      const allDestinations: AllDestinations = {
        subscriber: {
          instance: [target],
          subaccount: [failure]
        },
        provider: {
          instance: [target],
          subaccount: [failure]
        }
      };

      expect(subscriberFirst(allDestinations, 'testination')).toEqual(target);
    });

    it('prioritizes provider instance over subaccount', () => {
      const allDestinations: AllDestinations = {
        subscriber: {
          instance: [],
          subaccount: []
        },
        provider: {
          instance: [target],
          subaccount: [failure]
        }
      };

      expect(subscriberFirst(allDestinations, 'testination')).toEqual(target);
    });

    it('prioritizes subscriber over provider', () => {
      const allDestinations: AllDestinations = {
        subscriber: {
          instance: [],
          subaccount: [target]
        },
        provider: {
          instance: [failure],
          subaccount: [failure]
        }
      };

      expect(subscriberFirst(allDestinations, 'testination')).toEqual(target);
    });

    it('returns matched provider destination when retrieved subscriber destinations do not match', () => {
      const allDestinations: AllDestinations = {
        subscriber: {
          instance: [],
          subaccount: []
        },
        provider: {
          instance: [target],
          subaccount: [failure]
        }
      };

      expect(subscriberFirst(allDestinations, 'testination')).toEqual(target);
    });
  });

  describe('alwaysSubscriber', () => {
    it('prioritizes subscriber over provider', () => {
      const allDestinations: AllDestinations = {
        subscriber: {
          instance: [],
          subaccount: [target]
        },
        provider: {
          instance: [failure],
          subaccount: [failure]
        }
      };

      expect(alwaysSubscriber(allDestinations, 'testination')).toEqual(target);
    });

    it('returns null when retrieved subscriber destination do not match', () => {
      const allDestinations: AllDestinations = {
        subscriber: {
          instance: [],
          subaccount: []
        },
        provider: {
          instance: [failure],
          subaccount: [failure]
        }
      };

      expect(alwaysSubscriber(allDestinations, 'testination')).toEqual(null);
    });
  });

  describe('alwaysProvider', () => {
    it('prioritizes provider over subscriber', () => {
      const allDestinations: AllDestinations = {
        subscriber: {
          instance: [failure],
          subaccount: [failure]
        },
        provider: {
          instance: [target],
          subaccount: [failure]
        }
      };

      expect(alwaysProvider(allDestinations, 'testination')).toEqual(target);
    });

    it('returns null when found provider destination do not match', () => {
      const allDestinations: AllDestinations = {
        subscriber: {
          instance: [failure],
          subaccount: [failure]
        },
        provider: {
          instance: [],
          subaccount: []
        }
      };

      expect(alwaysProvider(allDestinations, 'testination')).toEqual(null);
    });
  });
});
