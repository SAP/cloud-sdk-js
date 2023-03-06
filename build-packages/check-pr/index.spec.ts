import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { validateTitle, validateBody, validateChangesets } from './validators';

describe('check-pr', () => {
  beforeEach(() => {
    process.exitCode = 0;
  });

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
      const template = await readFile(
        resolve('.github', 'PULL_REQUEST_TEMPLATE.md'),
        'utf-8'
      );
      await validateBody(template);
      expect(process.exitCode).toEqual(1);
    });

    it('should invalidate with description including unchanged template', async () => {
      const template = await readFile(
        resolve('.github', 'PULL_REQUEST_TEMPLATE.md'),
        'utf-8'
      );
      await validateBody(template.concat('test'));
      expect(process.exitCode).toEqual(1);
    });
  });

  describe('validatePreamble', () => {
    it('should invalidate with unmatched changesets', async () => {
      const fileContents = ["'@sap-cloud-sdk/generator': minor"];
      await validateChangesets('chore!', '', true, fileContents);
      expect(process.exitCode).toEqual(1);
    });

    it('should validate with matched changesets', async () => {
      const fileContents = ["'@sap-cloud-sdk/generator': major"];
      await validateChangesets('chore!', '', true, fileContents);
      expect(process.exitCode).toEqual(0);
    });
  });
});
