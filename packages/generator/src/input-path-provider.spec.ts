import { swaggerPathForEdmx } from './input-path-provider';
describe('swaggerPathForEdmx', () => {
  it('replaces .edmx with .json', () => {
    expect(swaggerPathForEdmx('service.edmx')).toEqual('service.json');
  });

  it('replaces .EDMX with .json', () => {
    expect(swaggerPathForEdmx('service.EDMX')).toEqual('service.json');
  });

  it('replaces .xml with .json', () => {
    expect(swaggerPathForEdmx('service.xml')).toEqual('service.json');
  });

  it('only replaces extension in the end', () => {
    expect(swaggerPathForEdmx('service.edmx.')).toEqual('service.edmx.json');
  });
});
