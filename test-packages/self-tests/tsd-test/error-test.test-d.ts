import {expectType} from 'tsd';
// This test is meant to fail in order to check if type tests are working.


expectType<number>('0123'.charAt(0));
