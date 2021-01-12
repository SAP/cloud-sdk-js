import { applyPrefixOnJsConfictParam } from './name-formatting-strategies';
it('should add prefix if a conflict with js reserved keyword occurs', () => {
  const actual1 = applyPrefixOnJsConfictParam('case');
  const actual2 = applyPrefixOnJsConfictParam('any');
  expect(actual1).toBe('pCase');
  expect(actual2).toBe('any');
});
