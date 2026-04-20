import { jest } from '@jest/globals';
import { vol } from 'memfs';
import { mockFsWithMemfs } from '@sap-cloud-sdk/test-util';

mockFsWithMemfs(jest);

jest.unstable_mockModule('@actions/core', () => ({
  error: jest.fn(),
  info: jest.fn(),
  warning: jest.fn(),
  getInput: jest.fn(),
  setFailed: jest.fn()
}));

const { validateTitle, validateBody, validateChangesets } =
  await import('./validators.js');
const { getInput, setFailed } = (await import('@actions/core')) as jest.Mocked<
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  typeof import('@actions/core')
>;

const prTemplate = `unchanged PR template
with multiple lines`;

describe('check-pr', () => {
  beforeEach(() => {
    vol.fromNestedJSON(
      {
        '.github': { 'PULL_REQUEST_TEMPLATE.md': prTemplate },
        'my-changeset.md': '[Fixed Issue] Something is fixed.'
      },
      process.cwd()
    );

    getInput.mockReturnValue('my-changeset.md');
    process.exitCode = 0;
  });

  afterEach(() => {
    vol.reset();
    setFailed.mockClear();
  });

  describe('validateTitle', () => {
    it('should validate title with proper structure', async () => {
      await validateTitle('chore: test');
      expect(setFailed).not.toHaveBeenCalled();
    });

    it('should invalidate title with missing colon', async () => {
      await validateTitle('choretest');
      expect(setFailed).toHaveBeenCalledWith(
        'PR title does not adhere to conventional commit guidelines. No preamble found.'
      );
    });

    it('should invalidate title with empty postamble', async () => {
      await validateTitle('chore: ');
      expect(setFailed).toHaveBeenCalledWith(
        'PR title does not have a title after conventional commit preamble.'
      );
    });

    it('should invalidate title with missing space', async () => {
      await validateTitle('chore:test');
      expect(setFailed).toHaveBeenCalledWith(
        'Space missing after conventional commit preamble.'
      );
    });

    it('should invalidate title with wrong commit type', async () => {
      await validateTitle('featt: test');
      expect(setFailed).toHaveBeenCalledWith(
        'PR title does not adhere to conventional commit guidelines. Commit type found: featt. Must be one of feat, fix, chore.'
      );
    });
  });

  describe('validateBody', () => {
    it('should pass with custom description', async () => {
      await validateBody('test body');
      expect(setFailed).not.toHaveBeenCalled();
    });

    it('should invalidate with empty description', async () => {
      await validateBody('');
      expect(setFailed).toHaveBeenCalledWith('PR must have a description.');
    });

    it('should invalidate body with only template', async () => {
      await validateBody(prTemplate);
      expect(setFailed).toHaveBeenCalledWith('PR must have a description.');
    });

    it('should invalidate with description including unchanged template', async () => {
      await validateBody(`${prTemplate} with changes`);
      expect(setFailed).toHaveBeenCalledWith(
        'PR template must not be ignored.'
      );
    });
  });

  describe('validatePreamble', () => {
    it('should invalidate with unmatched changesets', () => {
      const fileContents = ["'@sap-cloud-sdk/generator': minor"];
      validateChangesets('chore!', '', true, fileContents);
      expect(setFailed).toHaveBeenCalledWith(
        "Preamble 'chore!' requires a changeset file with bump 'major'."
      );
    });

    it('should not fail when preamble is chore and no changeset was created', () => {
      validateChangesets('chore', '', false, []);
      expect(setFailed).not.toHaveBeenCalled();
    });

    it('should fail if change type is wrong', async () => {
      const fileContents = [
        "'@sap-cloud-sdk/generator': major",
        '[Fix] Something is fixed.'
      ];
      validateChangesets('chore!', '', true, fileContents);
      expect(setFailed).toHaveBeenCalledWith(
        "All change types must match one of the allowed change types '[Known Issue]' or '[Compatibility Note]' or '[New Functionality]' or '[Improvement]' or '[Fixed Issue]'."
      );
    });

    it('should pass if correct change type is provided', async () => {
      const fileContents = [
        "'@sap-cloud-sdk/generator': major",
        '[Fixed Issue] Something is fixed.'
      ];
      validateChangesets('chore!', '', true, fileContents);
      expect(setFailed).not.toHaveBeenCalled();
    });

    it('should validate with matched changesets', async () => {
      const fileContents = [
        "'@sap-cloud-sdk/generator': major",
        '[Fixed Issue] Something is fixed.'
      ];
      validateChangesets('chore!', '', true, fileContents);
      expect(setFailed).not.toHaveBeenCalled();
    });

    it('should validate with matched changesets in double quotes', async () => {
      const fileContents = [
        '"@sap-cloud-sdk/generator": major',
        '[Fixed Issue] Something is fixed.'
      ];
      validateChangesets('chore!', '', true, fileContents);
      expect(setFailed).not.toHaveBeenCalled();
    });

    it('should validate with markdown link annotation', async () => {
      const fileContents = [
        '"@sap-cloud-sdk/generator": major',
        '[Fixed Issue] Something is fixed [here](123).'
      ];
      validateChangesets('chore!', '', true, fileContents);
      expect(setFailed).not.toHaveBeenCalled();
    });
  });
});
