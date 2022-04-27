export function testPostRequestOutcome(actual, expected) {
  expect(actual).toEqual(expected);
  // Due to non-enumerable property, mocha can not iterate detect "_customFields", we force here matching between both
  expect(actual['remoteState']).toEqual(expected['remoteState']);
  expect(actual.getCustomFields()).toEqual(expected.getCustomFields());
}
