/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

/**
 * Circuit Breaker (CB) dummy implementation.
 * CB can be configured to open after it failed with a non-retriable error a certain amount of times.
 */
class CB {
  constructor(failuresUntilOpen) {
    this.failuresUntilOpen = failuresUntilOpen;
  }

  async fire(someReq) {
    if (this.failuresUntilOpen) {
      try {
        return await someReq();
      } catch (err) {
        if (err.message !== 'should retry') {
          this.failuresUntilOpen--;
        }
        throw err;
      }
    }
    throw new Error('CB open');
  }
}

/**
 * Retry dummy implementation.
 * Just retriggers the original function once.
 */
function retry(fn) {
  return fn();
}

/**
 * Helper function to create resilience function.
 */
function createResilienceFn(cb) {
  return function () {
    const fn = async function (req, config) {
      try {
        return await cb.fire(req);
      } catch (err) {
        if (err.message === 'should retry') {
          console.error(err);
          return retry(() => fn(req, config));
        }
        throw err;
      }
    };
    return fn;
  };
}

/**
 * CB used in the dummy implementation of SAP Cloud SDK.
 * The CB is open on the first request.
 */
let sdkCb;
function resetCb() {
  sdkCb = new CB(1);
}
resetCb();

/**
 * Request Builder (RB) dummy implementation.
 * Can execute and configure middlewares.
 */
class RB {
  constructor(req, reqConfig) {
    /**
     * SAP Cloud SDK dummy implementation of resilience function.
     */
    this.sdkResilience = createResilienceFn(sdkCb);
    this.resilienceMiddleWare = this.sdkResilience;
    this.middlewares = [];

    /**
     * The request config, which is also the context used in the middleware functions.
     */
    this.reqConfig = reqConfig;

    /**
     * The request to be executed when calling execute.
     */
    this.req = req;
  }

  middleware(fn) {
    if (fn.id === 'resilience') {
      this.resilienceMiddleWare = fn;
    } else {
      this.middlewares.push(fn);
    }
    return this;
  }

  async execute() {
    const newReq = [this.resilienceMiddleWare, ...this.middlewares].reduce(
      (prev, curr) => () => curr()(prev, this.reqConfig),
      this.req
    );
    return (await newReq)();
  }
}

/**
 * Custom implementation of resilience function.
 * Same as SAP Cloud SDK dummy implementation, but with a CB that opens on second request.
 */
function resilience(fn) {
  fn.id = 'resilience';
  return fn;
}

/**
 * Request fails the first two times, succeeds after that.
 */
async function demoRetries() {
  let retries = 0;
  return new RB(async () => {
    if (retries >= 2) {
      return 'third try successful';
    }
    retries++;
    throw new Error('should retry');
  }, {}).execute();
}

/**
 * Request fails and opens the CB before second run.
 */
async function defaultResilience() {
  // failure opens the default CB
  try {
    await new RB(() => {
      throw new Error('open the CB');
    }, {}).execute();
  } catch (err) {
    console.error(err);
  }

  // request would be successful but blocked by open CB
  return new RB(() => 'successful, but blocked', {}).execute();
}

/**
 * Request fails and opens the CB only before third run.
 */
async function customResilience() {
  /**
   * Custom implementation of resilience function.
   * Same as SAP Cloud SDK dummy implementation, but with a CB that opens before the first request.
   */
  const myResilience = createResilienceFn(new CB(0));

  // CB is open by default
  // request would be successful but blocked by open CB
  return new RB(() => 'successful, but blocked', {})
    .middleware(resilience(myResilience))
    .execute();
}

async function customResilienceAndDeserialization() {
  /**
   * Custom implementation of resilience function.
   * Same as SAP Cloud SDK dummy implementation, but with a CB that opens after the second failed request.
   */
  const myResilience = createResilienceFn(new CB(2));

  /**
   * Custom implementation of a deserializer function, that changes the response data.
   */
  function myDeserializer() {
    return async function (req, context) {
      const res = await req();
      if (res) {
        return `${res}+deserialized`;
      }
    };
  }

  let shouldSucceed = false;
  const rb = new RB(() => {
    if (shouldSucceed) {
      return 'now';
    }
    shouldSucceed = true;
    throw new Error('not yet');
  }, {})
    .middleware(resilience(myResilience))
    .middleware(myDeserializer);

  // not yet
  await rb.execute().catch(err => console.error(err));
  // now + deserialized
  return rb.execute();
}

/**
 * Helper function to execute and log a function.
 */
async function executeAndLog(title, fn) {
  console.log('\n');
  console.log(title);
  try {
    const res = await fn();
    if (res) {
      console.log(res);
    }
  } catch (err) {
    console.error(err);
  }

  resetCb();
}

async function run() {
  await executeAndLog('Retries', demoRetries);
  await executeAndLog('Default Resilience', defaultResilience);
  await executeAndLog('Custom Resilience', customResilience);
  await executeAndLog(
    'Custom Resilience and Deserialization',
    customResilienceAndDeserialization
  );
}

run();
