import mock from 'mock-fs';
import * as github from '@actions/core';
import { validateTitle, validateBody, validateChangesets } from './validators';

const prTemplate = `unchanged PR template
with multiple lines`;

describe('check-pr', () => {
  beforeEach(() => {
    mock({
      '.github': {
        'PULL_REQUEST_TEMPLATE.md': prTemplate
      },
      'my-changeset.md': '[Fixed Issue] Something is fixed.'
    });
    jest.spyOn(github, 'getInput').mockReturnValue('my-changeset.md');
    process.exitCode = 0;
  });

  afterEach(() => mock.restore());

  describe('validateTitle', () => {
    it('should validate title with proper structure', async () => {
      await validateTitle('chore: test');
      expect(process.exitCode).toEqual(0);
    });

    it('should invalidate title with missing colon', async () => {
      await validateTitle('choretest');
      expect(process.exitCode).toEqual(1);
    });

    it('should invalidate title with empty postamble', async () => {
      await validateTitle('chore: ');
      expect(process.exitCode).toEqual(1);
    });

    it('should invalidate title with missing space', async () => {
      await validateTitle('chore:test');
      expect(process.exitCode).toEqual(1);
    });

    it('should invalidate title with wrong commit type', async () => {
      await validateTitle('featt: test');
      expect(process.exitCode).toEqual(1);
    });
  });

  describe('validateBody', () => {
    it('should pass with custom description', async () => {
      await validateBody('test body');
      expect(process.exitCode).toEqual(0);
    });

    it('should invalidate with empty description', async () => {
      await validateBody('');
      expect(process.exitCode).toEqual(1);
    });

    it('should invalidate body with only template', async () => {
      await validateBody(prTemplate);
      expect(process.exitCode).toEqual(1);
    });

    it('should invalidate with description including unchanged template', async () => {
      await validateBody(`${prTemplate} with changes`);
      expect(process.exitCode).toEqual(1);
    });
  });

  describe('validatePreamble', () => {
    it('should invalidate with unmatched changesets', () => {
      const fileContents = ["'@sap-cloud-sdk/generator': minor"];
      validateChangesets('chore!', '', true, fileContents);
      expect(process.exitCode).toEqual(1);
    });

    it('should not fail when preamble is chore and no changeset was created', () => {
      validateChangesets('chore', '', false, []);
      expect(process.exitCode).toEqual(0);
    });

    it('should fail if change type is wrong', async () => {
      const fileContents = [
        "'@sap-cloud-sdk/generator': major",
        '[Fix] Something is fixed.'
      ];
      validateChangesets('chore!', '', true, fileContents);
      expect(process.exitCode).toEqual(1);
    });

    it('should pass if correct change type is provided', async () => {
      const fileContents = [
        "'@sap-cloud-sdk/generator': major",
        '[Fixed Issue] Something is fixed.'
      ];
      validateChangesets('chore!', '', true, fileContents);
      expect(process.exitCode).toEqual(0);
    });

    it('should validate with matched changesets', async () => {
      const fileContents = [
        "'@sap-cloud-sdk/generator': major",
        '[Fixed Issue] Something is fixed.'
      ];
      validateChangesets('chore!', '', true, fileContents);
      expect(process.exitCode).toEqual(0);
    });

    it('should validate with matched changesets in double quotes', async () => {
      const fileContents = [
        '"@sap-cloud-sdk/generator": major',
        '[Fixed Issue] Something is fixed.'
      ];
      validateChangesets('chore!', '', true, fileContents);
      expect(process.exitCode).toEqual(0);
    });

    it('should validate with markdown link annotation', async () => {
      const fileContents = [
        '"@sap-cloud-sdk/generator": major',
        '[Fixed Issue] Something is fixed [here](123).'
      ];
      validateChangesets('chore!', '', true, fileContents);
      expect(process.exitCode).toEqual(0);
    });
  });
});
