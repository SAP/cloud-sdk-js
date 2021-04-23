/**
 * Await all promises and resolve if non of them failed.
 * Reject if at least one of them was rejected, but only once all of them are finished.
 * Throws an error consisting of a list of reasons.
 * @param promises Promises to settle.
 */
export async function finishAll(promises: Promise<any>[]): Promise<void> {
  const settledPromises = await Promise.allSettled(promises);
  const rejectedPromises = settledPromises.filter(
    promise => promise.status === 'rejected'
  ) as PromiseRejectedResult[];
  if (rejectedPromises.length) {
    const reasons = rejectedPromises.map(promise => promise.reason).join(', ');
    throw new Error(reasons);
  }
}
