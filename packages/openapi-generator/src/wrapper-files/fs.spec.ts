import * as fs from 'fs';
import { createFile } from './fs';

jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn().mockReturnValue(undefined)
  }
}));

describe('create-file', () => {
  it('creates content ending with new line', async () => {
    await createFile('directory', 'filename', 'content', true);
    expect(fs.promises.writeFile).toHaveBeenCalledWith(
      'directory/filename',
      expect.stringMatching(/.*\n$/),
      expect.anything()
    );
  });

  it('creates content with copyright', async () => {
    await createFile('directory', 'filename', 'content', true, true);
    expect(fs.promises.writeFile).toHaveBeenCalledWith(
      'directory/filename',
      expect.stringContaining('Copyright'),
      expect.anything()
    );
  });

  it('creates content without copyright', async () => {
    await createFile('directory', 'filename', 'content', true, false);
    expect(fs.promises.writeFile).toHaveBeenCalledWith(
      'directory/filename',
      expect.not.stringContaining('Copyright'),
      expect.anything()
    );
  });
});
