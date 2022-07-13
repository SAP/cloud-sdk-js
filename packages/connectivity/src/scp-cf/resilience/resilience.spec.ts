import { createLogger } from '@sap-cloud-sdk/util';
import { defaultCircuitBreakerOptions } from './circuit-breaker-options';
import {
  addResilience,
  addTimeout,
  normalizeCircuitBreakerOptions,
  normalizeResilienceOptions,
  normalizeRetryOptions,
  normalizeTimeout
} from './resilience';
import {
  defaultResilienceOptions,
  defaultRetryOptions,
  ResilienceOptions
} from './resilience-options';

describe('resilience', () => {
  describe('addTimeout', () => {
    it('should throw a time out rejection', async () => {
      const fn = () => new Promise(resolve => setTimeout(resolve, 1000));
      await expect(addTimeout(fn, 500)).rejects.toThrowError(
        'Timed out after 500ms'
      );
    });

    it('should disable timeout if invalid', async () => {
      const fn = () =>
        new Promise(resolve => setTimeout(() => resolve('resolved'), 1000));
      await expect(addTimeout(fn, -10)).resolves.toEqual('resolved');
    });
  });

  describe('normalizeTimeout', () => {
    it('should normalize undefined timeout to default', () => {
      const resilienceOptions: ResilienceOptions = {
        timeout: undefined
      };
      expect(normalizeTimeout(resilienceOptions)).toMatchObject({
        timeout: defaultResilienceOptions.timeout
      });
    });

    it('should normalize invalid timeout to false', () => {
      const resilienceOptions: ResilienceOptions = {
        timeout: -100
      };
      expect(normalizeTimeout(resilienceOptions)).toMatchObject({
        timeout: false
      });
    });

    it('should normalize 0 timeout to false', () => {
      const resilienceOptions: ResilienceOptions = {
        timeout: 0
      };
      expect(normalizeTimeout(resilienceOptions)).toMatchObject({
        timeout: false
      });
    });
  });

  describe('normalizeCircuitBreakerOptions', () => {
    it('should normalize undefined circuit breaker options to default', () => {
      const resilienceOptions: ResilienceOptions = {
        timeout: 1000,
        circuitBreaker: undefined
      };
      expect(normalizeCircuitBreakerOptions(resilienceOptions)).toMatchObject({
        circuitBreaker: { ...defaultCircuitBreakerOptions, timeout: 1000 }
      });
    });

    it('should normalize circuit breaker options from true to default', () => {
      const resilienceOptions: ResilienceOptions = {
        timeout: 1000,
        circuitBreaker: true
      };
      expect(normalizeCircuitBreakerOptions(resilienceOptions)).toMatchObject({
        circuitBreaker: { ...defaultCircuitBreakerOptions, timeout: 1000 }
      });
    });

    it('should normalize circuit breaker options with service and target from true to default', () => {
      const resilienceOptions: ResilienceOptions = {
        timeout: 1000,
        circuitBreaker: {
          service: true,
          target: true
        }
      };
      expect(normalizeCircuitBreakerOptions(resilienceOptions)).toMatchObject({
        circuitBreaker: {
          service: { ...defaultCircuitBreakerOptions, timeout: 1000 },
          target: { ...defaultCircuitBreakerOptions, timeout: 1000 }
        }
      });
    });

    it('should normalize circuit breaker options with service and target accordingly', () => {
      const resilienceOptions: ResilienceOptions = {
        timeout: 1000,
        circuitBreaker: {
          service: true,
          target: false
        }
      };
      expect(normalizeCircuitBreakerOptions(resilienceOptions)).toMatchObject({
        circuitBreaker: {
          service: { ...defaultCircuitBreakerOptions, timeout: 1000 },
          target: false
        }
      });
    });
  });

  describe('normalizeRetryOptions', () => {
    it('should normalize undefined retry options to default', () => {
      const resilienceOptions: ResilienceOptions = {
        retry: undefined
      };
      expect(normalizeRetryOptions(resilienceOptions)).toMatchObject({
        retry: defaultResilienceOptions.retry
      });
    });

    it('should normalize retry options from true to default', () => {
      const resilienceOptions: ResilienceOptions = {
        retry: true
      };
      expect(normalizeRetryOptions(resilienceOptions)).toMatchObject({
        retry: defaultRetryOptions
      });
    });

    it('should normalize retry options with service and target from true to default', () => {
      const resilienceOptions: ResilienceOptions = {
        retry: {
          service: true,
          target: true
        }
      };
      expect(normalizeRetryOptions(resilienceOptions)).toMatchObject({
        retry: {
          service: defaultRetryOptions,
          target: defaultRetryOptions
        }
      });
    });

    it('should normalize retry options with service and target accordingly', () => {
      const resilienceOptions: ResilienceOptions = {
        retry: {
          service: true,
          target: false
        }
      };
      expect(normalizeRetryOptions(resilienceOptions)).toMatchObject({
        retry: {
          service: defaultRetryOptions,
          target: false
        }
      });
    });
  });

  describe('normalizeResilienceOptions', () => {
    it('should normalize resilience option to default if attributes are undefined', () => {
      const resilienceOptions: ResilienceOptions = {};
      expect(normalizeResilienceOptions(resilienceOptions)).toMatchObject({
        // Default resilience attributes
        timeout: defaultResilienceOptions.timeout,
        circuitBreaker: defaultCircuitBreakerOptions,
        retry: false
      });
    });

    it('should use resilience timeout if circuit breaker is not defined explicitly', () => {
      const resilienceOptions: ResilienceOptions = {
        timeout: 1234,
        circuitBreaker: true
      };

      expect(normalizeResilienceOptions(resilienceOptions)).toMatchObject({
        timeout: 1234,
        circuitBreaker: { ...defaultCircuitBreakerOptions, timeout: 1234 }
      });
    });

    it('should use resilience timeout if circuit breaker service target is not defined explicitly', () => {
      const resilienceOptions: ResilienceOptions = {
        timeout: 1234,
        circuitBreaker: {
          service: true,
          target: true
        }
      };

      expect(normalizeResilienceOptions(resilienceOptions)).toMatchObject({
        timeout: 1234,
        circuitBreaker: {
          service: { ...defaultCircuitBreakerOptions, timeout: 1234 },
          target: { ...defaultCircuitBreakerOptions, timeout: 1234 }
        }
      });
    });

    it('should use circuit breaker timeout if circuit breaker is defined explicitly with undefined timeout', () => {
      const resilienceOptions: ResilienceOptions = {
        timeout: 1234,
        circuitBreaker: {}
      };

      expect(normalizeResilienceOptions(resilienceOptions)).toMatchObject({
        timeout: 1234,
        circuitBreaker: {}
      });
    });

    it('should use circuit breaker timeout if circuit breaker is defined explicitly with defined timeout', () => {
      const resilienceOptions: ResilienceOptions = {
        timeout: 1234,
        circuitBreaker: {
          timeout: 5678
        }
      };

      const logger = createLogger({
        package: 'connectivity',
        messageContext: 'resilience'
      });
      const debugSpy = jest.spyOn(logger, 'debug');

      expect(normalizeResilienceOptions(resilienceOptions)).toMatchObject({
        timeout: 1234,
        circuitBreaker: {
          timeout: 5678
        }
      });

      expect(debugSpy).toHaveBeenCalledWith(
        'Resilience timeout is ignored since circuit breaker is defined explicitly.'
      );
    });
  });

  describe('addResilience', () => {
    it('should add timeout resilience to request if using circuit breaker', async () => {
      const fn = () => new Promise(resolve => setTimeout(resolve, 1000));
      const resilienceOptions: ResilienceOptions = {
        timeout: 500,
        circuitBreaker: true,
        retry: false
      };

      const actual = addResilience({ fn }, resilienceOptions)();

      await expect(actual).rejects.toThrowError('Timed out after 500ms');
    });

    it('should add timeout resilience to request if not using circuit breaker', async () => {
      const fn = () => new Promise(resolve => setTimeout(resolve, 1000));
      const resilienceOptions: ResilienceOptions = {
        timeout: 500,
        circuitBreaker: false,
        retry: false
      };

      const actual = addResilience({ fn }, resilienceOptions)();

      await expect(actual).rejects.toThrowError('Timed out after 500ms');
    });

    // TODO: add one test case to check if circuit breaker is used

    it('should add retry resilience to request', async () => {
      const shouldResolveSequence = [false, false, true];
      const fn = () =>
        new Promise((resolve, reject) => {
          const shouldResolve = shouldResolveSequence.shift();
          if (shouldResolve) {
            resolve('resolved');
          } else {
            reject('rejected');
          }
        });
      const resilienceOptions: ResilienceOptions = {
        timeout: false,
        circuitBreaker: false,
        retry: { ...defaultRetryOptions, retries: 3, maxTimeout: 1000 }
      };

      const actual = addResilience({ fn }, resilienceOptions)();

      await expect(actual).resolves.toEqual('resolved');
    }, 10000);

    it('should add retry resilience to request and fail if maximum retries exceeded', async () => {
      const fn = () =>
        new Promise((_, reject) => {
          reject('rejected');
        });
      const resilienceOptions: ResilienceOptions = {
        timeout: false,
        circuitBreaker: false,
        retry: { ...defaultRetryOptions, retries: 3, maxTimeout: 1000 }
      };

      const actual = addResilience({ fn }, resilienceOptions)();

      await expect(actual).rejects.toEqual('rejected');
    }, 10000);
  });
});
