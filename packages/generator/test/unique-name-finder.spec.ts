import { applyPrefixOnJsConfictParam } from '../src/name-formatting-strategies';
import { UniqueNameFinder } from '../src/unique-name-finder';

describe('Name formatting strategies', () => {
  it('should add prefix if a conflict with js reserved keyword occurs', () => {
    const actual1 = applyPrefixOnJsConfictParam('case');
    const actual2 = applyPrefixOnJsConfictParam('any');
    expect(actual1).toBe('pCase');
    expect(actual2).toBe('any');
  });

  it('should handel names ending a _1 correctly.', () => {
    let finder = new UniqueNameFinder('_', ['MyClass']);
    expect(finder.findUniqueName('MyClass')).toBe('MyClass_1');

    finder = new UniqueNameFinder('_', ['MyClass_1']);
    expect(finder.findUniqueName('MyClass_1')).toBe('MyClass_2');

    finder = new UniqueNameFinder('_', ['MyClass_1', 'MyClass_2Type']);
    expect(finder.findUniqueNameWithSuffixes('MyClass_1', ['Type'])).toEqual([
      'MyClass_3',
      'MyClass_3Type'
    ]);
  });

  it('should handel names containing a _1 somewhere in the middle.', () => {
    const finder = new UniqueNameFinder('_', ['MyClass_1']);
    expect(finder.findUniqueName('MyClass_1ABC')).toBe('MyClass_1ABC');
  });

  it('should handle mixed suffixes - and _ correctly.', () => {
    let finder = new UniqueNameFinder('_', ['MyClass', 'MyClass-1']);
    expect(finder.findUniqueName('MyClass')).toBe('MyClass_1');

    finder = new UniqueNameFinder('_', [
      'MyClassType',
      'MyClass_1Type',
      'MyClass-2Type'
    ]);
    expect(finder.findUniqueNameWithSuffixes('MyClass', ['Type'])[0]).toBe(
      'MyClass_2'
    );
  });

  it('should correctly count up the suffix.', () => {
    let finder = new UniqueNameFinder('_', ['MyClass_1', 'MyClass_2']);
    expect(finder.findUniqueName('MyClass')).toBe('MyClass');
    expect(finder.findUniqueName('MyClass_1')).toBe('MyClass_3');

    finder = new UniqueNameFinder('_', [
      'MyClass_1',
      'Something',
      'MyClass_3',
      'SomethingElse'
    ]);
    expect(finder.findUniqueName('MyClass_2')).toBe('MyClass_2');

    finder = new UniqueNameFinder('_', ['MyClass_1', 'MyClass_2', 'MyClass_4']);
    expect(finder.findUniqueName('MyClass_1')).toBe('MyClass_3');

    finder = new UniqueNameFinder('_', [
      'MyClassType',
      'MyClass_1',
      'MyClass_2TypeForceMandatory'
    ]);
    expect(
      finder.findUniqueNameWithSuffixes('MyClass', [
        'Type',
        'TypeForceMandatory'
      ])[0]
    ).toBe('MyClass_3');

    finder = new UniqueNameFinder('_', ['MyClass', 'MyClass_1Type']);
    expect(finder.findUniqueNameWithSuffixes('MyClass', ['Type'])[0]).toBe(
      'MyClass_2'
    );
  });
});
