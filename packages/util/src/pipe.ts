export const asyncPipe = (...fns) => (start: any): Promise<any> =>
  fns.reduce(
    (state: Promise<any>, fn) => state.then(x => fn(x)),
    Promise.resolve(start)
  );
