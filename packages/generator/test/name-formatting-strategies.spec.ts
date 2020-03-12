/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { applyPrefixOnJsConfictParam } from '../src/name-formatting-strategies';

describe('Name formatting strategies', () => {
  it('should add prefix if a conflict with js reserved keyword occurs', () => {
    const actual1 = applyPrefixOnJsConfictParam('case');
    const actual2 = applyPrefixOnJsConfictParam('any');
    expect(actual1).toBe('pCase');
    expect(actual2).toBe('any');
  });
});
