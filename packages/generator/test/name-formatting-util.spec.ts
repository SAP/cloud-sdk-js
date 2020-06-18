/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  applyPrefixOnJsConfictParam,
  getUniqueNameOnConflictUnderscore
} from '../src/name-formatting-strategies';
import {
  getInterfaceNames,
  ServiceNameFormatter
} from '../src/service-name-formatter';

describe('Name formatting strategies', () => {
  it('should add prefix if a conflict with js reserved keyword occurs', () => {
    const actual1 = applyPrefixOnJsConfictParam('case');
    const actual2 = applyPrefixOnJsConfictParam('any');
    expect(actual1).toBe('pCase');
    expect(actual2).toBe('any');
  });

  it('should handel names ending a _1 correctly.', () => {
    let newName = getUniqueNameOnConflictUnderscore({
      nameToCheckForUniqueness: 'MyClass_1',
      alreadyUsedNames: ['MyClass']
    });
    expect(newName.uniqueName).toBe('MyClass_1');

    newName = getUniqueNameOnConflictUnderscore({
      nameToCheckForUniqueness: 'MyClass_1',
      alreadyUsedNames: ['MyClass_1']
    });
    expect(newName.uniqueName).toBe('MyClass_2');

    newName = getUniqueNameOnConflictUnderscore({
      nameToCheckForUniqueness: 'MyClass_1',
      alreadyUsedNames: ['MyClass_1', 'MyClass_2Type'],
      relatedNamesBuilder: getInterfaceNames
    });
    expect(newName.uniqueName).toBe('MyClass_3');
    expect(newName.relatedUniqueNames).toEqual([
      'MyClass_3Type',
      'MyClass_3TypeForceMandatory'
    ]);
  });

  it('should handel names containing a _1 somewhere in the middle.', () => {
    const newName = getUniqueNameOnConflictUnderscore({
      nameToCheckForUniqueness: 'MyClass_1ABC',
      alreadyUsedNames: ['MyClass_1']
    });
    expect(newName.uniqueName).toBe('MyClass_1ABC');
  });

  it('should update the name cash to avoid future clashes for entity class.', () => {
    const serviceNameFormatter = new ServiceNameFormatter([], [], []);

    serviceNameFormatter.originalToEntityClassName('MyClassType');
    const expectedList = ['MyClassType', ...getInterfaceNames('MyClassType')];
    expectedList.forEach(ele =>
      expect(serviceNameFormatter['serviceWideNamesCache']).toContain(ele)
    );
  });

  it('should handle mixed suffixes - and _ correctly.', () => {
    let newName = getUniqueNameOnConflictUnderscore({
      nameToCheckForUniqueness: 'MyClass',
      alreadyUsedNames: ['MyClass', 'MyClass-1']
    });
    expect(newName.uniqueName).toBe('MyClass_1');

    newName = getUniqueNameOnConflictUnderscore({
      nameToCheckForUniqueness: 'MyClass',
      alreadyUsedNames: ['MyClassType', 'MyClass_1Type', 'MyClass-2Type'],
      relatedNamesBuilder: getInterfaceNames
    });
    expect(newName.uniqueName).toBe('MyClass_2');
  });

  it('should correctly count up the suffix.', () => {
    let newName = getUniqueNameOnConflictUnderscore({
      nameToCheckForUniqueness: 'MyClass',
      alreadyUsedNames: ['MyClass_1', 'MyClass_2']
    });
    expect(newName.uniqueName).toBe('MyClass');

    newName = getUniqueNameOnConflictUnderscore({
      nameToCheckForUniqueness: 'MyClass_1',
      alreadyUsedNames: ['MyClass_1', 'MyClass_2']
    });
    expect(newName.uniqueName).toBe('MyClass_3');

    newName = getUniqueNameOnConflictUnderscore({
      nameToCheckForUniqueness: 'MyClass',
      alreadyUsedNames: [
        'MyClassType',
        'MyClass_1',
        'MyClass_2TypeForceMandatory'
      ],
      relatedNamesBuilder: getInterfaceNames
    });
    expect(newName.uniqueName).toBe('MyClass_3');

    newName = getUniqueNameOnConflictUnderscore({
      nameToCheckForUniqueness: 'MyClass',
      alreadyUsedNames: ['MyClass', 'MyClass_1Type'],
      relatedNamesBuilder: getInterfaceNames
    });
    expect(newName.uniqueName).toBe('MyClass_2');

    newName = getUniqueNameOnConflictUnderscore({
      nameToCheckForUniqueness: 'MyClass_2',
      alreadyUsedNames: ['MyClass_1', 'MyClass_3'],
      relatedNamesBuilder: getInterfaceNames
    });
    expect(newName.uniqueName).toBe('MyClass_2');

    newName = getUniqueNameOnConflictUnderscore({
      nameToCheckForUniqueness: 'MyClass_1',
      alreadyUsedNames: ['MyClass_1', 'MyClass_2', 'MyClass_4'],
      relatedNamesBuilder: getInterfaceNames
    });
    expect(newName.uniqueName).toBe('MyClass_3');
  });
});
