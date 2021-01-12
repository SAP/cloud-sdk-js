import { UniqueNameFinder } from './unique-name-finder';

describe('Unique name finder', () => {
  it('should add a suffix if a name already exists', () => {
    const finder = new UniqueNameFinder('_', ['SomeEntity']);
    expect(finder.findUniqueName('SomeEntity')).toBe('SomeEntity_1');
  });

  it('should add a suffix if a name in different casing already exists', () => {
    const finder = new UniqueNameFinder('_', ['SomeEntity']);
    expect(finder.findUniqueName('Someentity', false)).toBe('Someentity_1');
  });

  it('should add _2 if _1 is already used', () => {
    const finder = new UniqueNameFinder('_', ['MyClass_1']);
    expect(finder.findUniqueName('MyClass_1')).toBe('MyClass_2');
  });

  it('should add -2 if -1 is already used', () => {
    const finder = new UniqueNameFinder('-', ['MyClass-1']);
    expect(finder.findUniqueName('MyClass-1')).toBe('MyClass-2');
  });

  it('should add 2 if 1 is already used', () => {
    const finder = new UniqueNameFinder('', ['MyClass1']);
    expect(finder.findUniqueName('MyClass1')).toBe('MyClass2');
  });

  it('should not change names containing _1 in the middle', () => {
    const finder = new UniqueNameFinder('_', ['MyClass_1']);
    expect(finder.findUniqueName('MyClass_1ABC')).toBe('MyClass_1ABC');
  });

  it('should ignore other seperators', () => {
    const finder = new UniqueNameFinder('_', ['MyClass', 'MyClass-1']);
    expect(finder.findUniqueName('MyClass')).toBe('MyClass_1');
  });

  it('should ignore other seperators when suffixes are used', () => {
    const finder = new UniqueNameFinder('_', [
      'MyClassType',
      'MyClass_1Type',
      'MyClass-2Type'
    ]);
    expect(finder.findUniqueNameWithSuffixes('MyClass', ['Type'])[0]).toBe(
      'MyClass_2'
    );
  });

  it('does not add a suffix although names with suffix already exist', () => {
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

  it('should find names respecting their suffixes', () => {
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
