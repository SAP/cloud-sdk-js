export const asyncPipe = (...fns) => (start: any): Promise<any> =>
  fns.reduce(
    (state: Promise<any>, fn) => state.then(x => fn(x)),
    Promise.resolve(start)
  );

export const pipe = (...fns) => (start?: any): any =>
  fns.reduce(
    (previous: any, fn) => fn(previous),
    start
  );


export const identity = <T>(argument:T):T=>argument
