import {
  removeSlashes,
  removeLeadingSlashes,
  removeTrailingSlashes
} from './remove-slashes';

describe('removeSlashes', () => {
  it('removes trailing slashes', () => {
    expect(removeSlashes('/test/')).toBe('test');
  });
  it('removes leading slash', () => {
    expect(removeLeadingSlashes('/test')).toBe('test');
  });
  it('removes trailing slash', () => {
    expect(removeTrailingSlashes('/test/')).toBe('/test');
  });
});
