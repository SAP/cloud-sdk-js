/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { applyPrefixOnJsConfictParam } from '../src/name-formatting-strategies';
import { getInterfaceNames } from '../src/service-name-formatter';
import { UniqueNameFinder } from '../src/unique-name-finder';
import get = Reflect.get;

describe('Name formatting strategies', () => {
  it('should add prefix if a conflict with js reserved keyword occurs', () => {
    const actual1 = applyPrefixOnJsConfictParam('case');
    const actual2 = applyPrefixOnJsConfictParam('any');
    expect(actual1).toBe('pCase');
    expect(actual2).toBe('any');
  });

  it('should handel names ending a _1 correctly.', () => {
    const finder = UniqueNameFinder.getInstance().withAlreadyUsedNames([
      'MyClass'
    ]);
    expect(finder.findUniqueName('MyClass').uniqueName).toBe('MyClass_1');

    finder.withAlreadyUsedNames(['MyClass_1']);
    expect(finder.findUniqueName('MyClass_1').uniqueName).toBe('MyClass_2');

    finder
      .withAlreadyUsedNames(['MyClass_1', 'MyClass_2Type'])
      .withRelatedNames(getInterfaceNames);
    expect(finder.findUniqueName('MyClass_1').uniqueName).toBe('MyClass_3');
    expect(finder.findUniqueName('MyClass_1').relatedUniqueNames).toEqual([
      'MyClass_3Type',
      'MyClass_3TypeForceMandatory'
    ]);
  });

  it('should handel names containing a _1 somewhere in the middle.', () => {
    const finder = UniqueNameFinder.getInstance().withAlreadyUsedNames([
      'MyClass_1'
    ]);
    expect(finder.findUniqueName('MyClass_1ABC').uniqueName).toBe(
      'MyClass_1ABC'
    );
  });

  it('should handle mixed suffixes - and _ correctly.', () => {
    const finder = UniqueNameFinder.getInstance().withAlreadyUsedNames([
      'MyClass',
      'MyClass-1'
    ]);
    expect(finder.findUniqueName('MyClass').uniqueName).toBe('MyClass_1');

    finder
      .withAlreadyUsedNames(['MyClassType', 'MyClass_1Type', 'MyClass-2Type'])
      .withRelatedNames(getInterfaceNames);
    expect(finder.findUniqueName('MyClass').uniqueName).toBe('MyClass_2');
  });

  it('should correctly count up the suffix.', () => {
    const finder = UniqueNameFinder.getInstance().withAlreadyUsedNames([
      'MyClass_1',
      'MyClass_2'
    ]);
    expect(finder.findUniqueName('MyClass').uniqueName).toBe('MyClass');
    expect(finder.findUniqueName('MyClass_1').uniqueName).toBe('MyClass_3');

    finder.withAlreadyUsedNames([
      'MyClass_1',
      'Something',
      'MyClass_3',
      'SomethingElse'
    ]);
    expect(finder.findUniqueName('MyClass_2').uniqueName).toBe('MyClass_2');

    finder.withAlreadyUsedNames(['MyClass_1', 'MyClass_2', 'MyClass_4']);
    expect(finder.findUniqueName('MyClass_1').uniqueName).toBe('MyClass_3');

    finder
      .withAlreadyUsedNames([
        'MyClassType',
        'MyClass_1',
        'MyClass_2TypeForceMandatory'
      ])
      .withRelatedNames(getInterfaceNames);
    expect(finder.findUniqueName('MyClass').uniqueName).toBe('MyClass_3');

    finder.withAlreadyUsedNames(['MyClass', 'MyClass_1Type']);
    expect(finder.findUniqueName('MyClass').uniqueName).toBe('MyClass_2');
  });
});
