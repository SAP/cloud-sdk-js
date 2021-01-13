import { UniqueNameGenerator } from './unique-name-generator';

describe('UniqueNameGenerator', () => {
  it('should add an index if a name already exists', () => {
    const generator = new UniqueNameGenerator('_', ['SomeEntity']);
    expect(generator.generateUniqueName('SomeEntity')).toBe('SomeEntity_1');
  });

  it('should add an index if a name in different casing already exists', () => {
    const generator = new UniqueNameGenerator('_', ['SomeEntity']);
    expect(generator.generateUniqueName('Someentity', false)).toBe(
      'Someentity_1'
    );
  });

  it('should add _2 if _1 is already used', () => {
    const generator = new UniqueNameGenerator('_', ['MyClass_1']);
    expect(generator.generateUniqueName('MyClass_1')).toBe('MyClass_2');
  });

  it('should add -2 if -1 is already used', () => {
    const generator = new UniqueNameGenerator('-', ['MyClass-1']);
    expect(generator.generateUniqueName('MyClass-1')).toBe('MyClass-2');
  });

  it('should add 2 if 1 is already used', () => {
    const generator = new UniqueNameGenerator('', ['MyClass1']);
    expect(generator.generateUniqueName('MyClass1')).toBe('MyClass2');
  });

  it('should not change names containing _1 in the middle', () => {
    const generator = new UniqueNameGenerator('_', ['MyClass_1']);
    expect(generator.generateUniqueName('MyClass_1ABC')).toBe('MyClass_1ABC');
  });

  it('should ignore other seperators', () => {
    const generator = new UniqueNameGenerator('_', ['MyClass', 'MyClass-1']);
    expect(generator.generateUniqueName('MyClass')).toBe('MyClass_1');
  });

  it('should ignore other seperators when suffixes are used', () => {
    const generator = new UniqueNameGenerator('_', [
      'MyClassType',
      'MyClass_1Type',
      'MyClass-2Type'
    ]);
    expect(
      generator.generateUniqueNamesWithSuffixes('MyClass', ['Type'])[0]
    ).toBe('MyClass_2');
  });

  it('does not add an index although names with suffix already exist', () => {
    const generator = new UniqueNameGenerator('_', [
      'SomeEntity_1',
      'SomeEntity_2'
    ]);
    expect(generator.generateUniqueName('SomeEntity')).toBe('SomeEntity');
  });

  it('uses index _2 when _1 and _3 already exist', () => {
    const generator = new UniqueNameGenerator('_', [
      'SomeEntity',
      'SomeEntity_1',
      'SomeThingElse',
      'SomeEntity_3'
    ]);
    expect(generator.generateUniqueName('SomeEntity')).toBe('SomeEntity_2');
  });

  it('should find names respecting their suffixes', () => {
    const generator = new UniqueNameGenerator('_', [
      'SomeEntityType',
      'SomeEntity_1',
      'SomeEntity_2Type'
    ]);
    expect(
      generator.generateUniqueNamesWithSuffixes('SomeEntity', ['Type'])
    ).toEqual(['SomeEntity_3', 'SomeEntity_3Type']);
  });
});
