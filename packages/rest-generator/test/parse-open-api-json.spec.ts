import { toPathParameters } from '../src/parse-open-api-json';

describe('Parse open api', () => {
  it('should find parameters', async () => {
    expect(toPathParameters('/a/{b}/c/{d}/e')).toEqual(['b', 'd']);
  });

  it('should not find parameters', async () => {
    expect(toPathParameters('/b/c/d')).toEqual([]);
  });
});
