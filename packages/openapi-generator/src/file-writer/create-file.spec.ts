import { promises } from 'fs';
import { createFile } from './create-file';
const { writeFile } = promises;

jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn().mockReturnValue(undefined),
    copyFile: jest.fn().mockRejectedValue(undefined)
  },
  existsSync: jest.fn()
}));

describe('createFile', () => {
  it('creates content ending with new line', async () => {
    await createFile('directory', 'filename', 'content', true);
    expect(writeFile).toHaveBeenCalledWith(
      'directory/filename',
      expect.stringMatching(/.*\n$/),
      expect.anything()
    );
  });

  it('creates content with copyright', async () => {
    await createFile('directory', 'filename', 'content', true, true);
    expect(writeFile).toHaveBeenCalledWith(
      'directory/filename',
      expect.stringContaining('Copyright'),
      expect.anything()
    );
  });

  it('creates content without copyright', async () => {
    await createFile('directory', 'filename', 'content', true, false);
    expect(writeFile).toHaveBeenCalledWith(
      'directory/filename',
      expect.not.stringContaining('Copyright'),
      expect.anything()
    );
  });
});
