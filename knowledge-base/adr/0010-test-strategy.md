# Test Strategy

## General

- Don't test trivial code
- Don't reflect internal code structure in tests
- Arrange, Act, Assert (once per test)
- Explicitly describe test case in the title ("does xy correctly" is not explicit)
- Don't test happy path only

- Deprecated functionality (TBD)
- Local test scripts should be the default (`yarn test`) (TBD)

- Test coverage should be run in pipeline for unit tests only (does it really make sense?) (TBD)

## Mocking

- Mock what you need to mock, but don't mock everything
  - Mocks should be simple and easy to understand
  - Mocks should not stay alive after test (TBD)
  - Mocked destinations should be used explicitly (close to test code)
- Snapshot testing (TBD)
- Testing private functions (TBD)
- Usage of spies (TBD)

## Unit tests

- Test files should have the same name as the unit that is tested and end with `.spec.ts`
- Test files should be located right next to the unit that is tested

Example: `src/unit.ts` -> `src/unit.spec.ts`

- Ideally all functionality is unit tested **once**

  - Functions that call other functions should not test the behavior of the underlying functions

- If possible we aim at ensuring the existence of a unit test file (or even a test)

## Integration tests

- Compilation (TBD)

## Type tests

- Code needs to be compiled before running tests

## E2E tests

- Code needs to be compiled before running tests
- Can we avoid generating an extra TestEntity? (TBD)
