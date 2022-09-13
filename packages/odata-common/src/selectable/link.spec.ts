import { commonEntityApi } from '@sap-cloud-sdk/test-services-odata-common/common-entity';
import { Link } from './link';

describe('link', () => {
  it('cloned link has the same properties as the original link', () => {
    const link = new Link('linkedField', commonEntityApi, commonEntityApi);
    const clone = link.clone();

    Object.keys(link).forEach(key => {
      expect(link[key]).toStrictEqual(clone[key]);
    });
  });
});
