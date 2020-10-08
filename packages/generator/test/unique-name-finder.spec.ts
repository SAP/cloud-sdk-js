import { applyPrefixOnJsConfictParam } from '../src/name-formatting-strategies';
import { UniqueNameFinder } from '../src/unique-name-finder';

describe('Unique name finder', () => {
  it('should add prefix if a conflict with js reserved keyword occurs', () => {
    const actual1 = applyPrefixOnJsConfictParam('case');
    const actual2 = applyPrefixOnJsConfictParam('any');
    expect(actual1).toBe('pCase');
    expect(actual2).toBe('any');
  });

  it('should add a suffix if a name already exists', () => {
    const finder = new UniqueNameFinder('_', ['SomeEntity']);
    expect(finder.findUniqueName('SomeEntity')).toBe('SomeEntity_1');
  });

  it('should handle names ending with _1 correctly.', () => {
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

  it('should handle names containing with _1 somewhere in the middle.', () => {
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

  it('does not add a suffix altough names with suffix already exist', () => {
    const finder = new UniqueNameFinder('_', ['SomeEntity_1', 'SomeEntity_2']);
    expect(finder.findUniqueName('SomeEntity')).toBe('SomeEntity');
  });

  it('uses suffix _2 when _1 and _3 already exist', () => {
    const finder = new UniqueNameFinder('_', [
      'SomeEntity',
      'SomeEntity_1',
      'SomeThingElse',
      'SomeEntity_3'
    ]);
    expect(finder.findUniqueName('SomeEntity')).toBe('SomeEntity_2');
  });

  it('changes suffix if name with type suffix already exists', () => {
    const finder = new UniqueNameFinder('_', [
      'SomeEntityType',
      'SomeEntity_1',
      'SomeEntity_2Type'
    ]);
    expect(finder.findUniqueNameWithSuffixes('SomeEntity', ['Type'])).toEqual([
      'SomeEntity_3',
      'SomeEntity_3Type'
    ]);
  });
});
