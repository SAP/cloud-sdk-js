// Enable `Promise.allSettled` for node v10
// eslint-disable-next-line import/no-internal-modules
require('promise.allsettled/auto');

/**
 * Await all promises and resolve if non of them failed.
 * Reject if at least one of them was rejected, but only once all of them are finished.
 * Throws an error consisting of a list of reasons.
 * @param promises Promises to settle.
 * @param errorMessage Message to use as introductory text of the error if an error occurs.
 */
export async function finishAll(
  promises: Promise<any>[],
  errorMessage?: string
): Promise<void> {
  const settledPromises = await Promise.allSettled(promises);
  const rejectedPromises = settledPromises.filter(
    promise => promise.status === 'rejected'
  ) as PromiseRejectedResult[];
  if (rejectedPromises.length) {
    const reasons = rejectedPromises
      .map(promise => `\t${promise.reason}`)
      .join('\n');
    const message = errorMessage ? `${errorMessage} ` : '';
    throw new Error(`${message}Errors: [\n${reasons}\n]`);
  }
}
