import {
  removeSlashes,
  removeLeadingSlashes,
  removeTrailingSlashes
} from './remove-slashes';

describe('removeSlashes', () => {
  it('removes trailing slashes', () => {
    expect(removeSlashes('/test/')).toBe('test');
  });
  it('removes leading slashes', () => {
    expect(removeLeadingSlashes('/test')).toBe('test');
  });
  it('removes multiple leading slashes', () => {
    expect(removeLeadingSlashes('///test/')).toBe('test/');
  });
  it('removes trailing slashes', () => {
    expect(removeTrailingSlashes('/test/')).toBe('/test');
  });

  it('removes multiple trailing slashes', () => {
    expect(removeTrailingSlashes('/test///')).toBe('/test');
  });
});
