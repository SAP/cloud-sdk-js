import * as fs from 'fs';
import { createFile } from './create-file';

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
});
