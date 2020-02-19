/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

/**
 * Works similar to Ramdas pipe function, but works on promises, which allows using async functions.
 *
 * @param fns The functions to be chained.
 * @param start The value passed to the function created by pipings fns.
 */
export const asyncPipe = (...fns) => (start: any): Promise<any> =>
  fns.reduce((state: Promise<any>, fn) => state.then(x => fn(x)), Promise.resolve(start));
