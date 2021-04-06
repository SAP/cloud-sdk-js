/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EOL } from 'os';
import { TimeThresholds } from '../../test/test-utils';
import { getWarnings, recordWarning } from './warnings';
describe('warnings', () => {
  it(
    'should record and return warnings',
    () => {
      recordWarning('test warning');
      expect(getWarnings()).toEqual(['- test warning']);
    },
    TimeThresholds.EXTRA_SHORT
  );

  it(
    'should record and return multiple warnings',
    () => {
      recordWarning('test1');
      recordWarning('test2');
      expect(getWarnings()).toEqual(['- test1', '- test2']);
    },
    TimeThresholds.EXTRA_SHORT
  );

  it(
    'should record and return multi-line warnings',
    () => {
      recordWarning('line1', 'line2', 'line3');
      expect(getWarnings()).toEqual([`- line1${EOL}  line2${EOL}  line3`]);
    },
    TimeThresholds.EXTRA_SHORT
  );
});
