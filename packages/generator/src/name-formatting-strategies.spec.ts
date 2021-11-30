import { applyPrefixOnJsConflictParam } from './name-formatting-strategies';
it('should add prefix if a conflict with js reserved keyword occurs', () => {
  const actual1 = applyPrefixOnJsConflictParam('case');
  const actual2 = applyPrefixOnJsConflictParam('any');
  expect(actual1).toBe('pCase');
  expect(actual2).toBe('any');
});
