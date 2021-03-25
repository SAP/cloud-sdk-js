import { Except } from '@sap-cloud-sdk/core';

function parameterCannotBeNumber<T>(param: Except<T, number>): T {
  return param;
}

// $ExpectType "test"
parameterCannotBeNumber('test');

// $ExpectError
parameterCannotBeNumber(2);

type Disallowed = { a: string };
function parameterCannotBeDisallowedObject<T>(param: Except<T, Disallowed>): T {
  return param;
}

// $ExpectError
parameterCannotBeDisallowedObject({ a: 'test' });

// $ExpectType { a: number; }
parameterCannotBeDisallowedObject({ a: 2 });

// $ExpectType { b: string; }
parameterCannotBeDisallowedObject({ b: 'test' });

// $ExpectType 2
parameterCannotBeDisallowedObject(2);
