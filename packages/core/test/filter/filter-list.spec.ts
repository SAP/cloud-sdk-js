/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { and, or } from '../../src';
import {
  testFilterBoolean,
  testFilterGuid,
  testFilterSingleLink,
  testFilterString
} from '../test-util/filter-factory';

describe('FilterList', () => {
  describe('canFlatten', () => {
    it('is false when andFilters is empty', () => {
      const filterList = and();
      expect(filterList['canFlatten']('andFilters')).toBeFalsy();
    });

    it('is false when andFilters contains only filters', () => {
      const filterList = and(testFilterString.filter, testFilterBoolean.filter);
      expect(filterList['canFlatten']('andFilters')).toBeFalsy();
    });

    it('is true when andFilters contains only empty andFilters', () => {
      const filterList = and(and());
      expect(filterList['canFlatten']('andFilters')).toBeTruthy();
    });

    it('is true when andFilters contains only empty orFilters', () => {
      const filterList = and(or());
      expect(filterList['canFlatten']('andFilters')).toBeTruthy();
    });

    it('is false when andFilters contains filters and non empty orFilters', () => {
      const filterList = and(
        testFilterBoolean.filter,
        or(testFilterString.filter, testFilterGuid.filter)
      );
      expect(filterList['canFlatten']('andFilters')).toBeFalsy();
    });

    it('is true when andFilters contains filters and non empty andFilters, but no orFilters', () => {
      const filterList = and(
        testFilterBoolean.filter,
        and(testFilterString.filter, testFilterGuid.filter)
      );
      expect(filterList['canFlatten']('andFilters')).toBeTruthy();
    });

    it('is true when andFilters contains multiple nested empty lists', () => {
      const filterList = and(and(and(and())));
      expect(filterList['canFlatten']('andFilters')).toBeTruthy();
    });
  });

  describe('should flatten', () => {
    it('nested andFilters', () => {
      const filterList = and(
        testFilterBoolean.filter,
        and(and(testFilterString.filter, testFilterGuid.filter), and())
      );
      const expectedList = and(
        testFilterBoolean.filter,
        testFilterString.filter,
        testFilterGuid.filter
      );
      filterList.flatten();
      expect(filterList.flatten()).toEqual(expectedList);
    });

    it('empty filters', () => {
      const filterList = and(and(or(), and(and(or()), and())));
      expect(filterList.flatten()).toEqual(and());
    });

    it('nested and- and orFilters', () => {
      const filterList = and(
        and(
          testFilterGuid.filter,
          and(),
          or(or(testFilterString.filter, testFilterBoolean.filter))
        )
      );
      const expectedList = and(
        testFilterGuid.filter,
        or(testFilterString.filter, testFilterBoolean.filter)
      );
      expect(filterList.flatten()).toEqual(expectedList);
    });

    it('nested filter links', () => {
      const filterList = and(
        testFilterBoolean.filter,
        and(
          and(testFilterString.filter, testFilterGuid.filter),
          and(testFilterSingleLink.filter)
        )
      );
      const expectedList = and(
        testFilterBoolean.filter,
        testFilterString.filter,
        testFilterGuid.filter,
        testFilterSingleLink.filter
      );
      expect(filterList.flatten()).toEqual(expectedList);
    });
  });
});
