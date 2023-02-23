import { directoryToSpeakingModuleName, npmCompliantName } from './util';

describe('util', () => {
  describe('npmCompliantName', () => {
    it('returns a name that is guaranteed to be compliant with npm package naming rules', () => {
      expect(npmCompliantName('')).toBe('');
      expect(npmCompliantName('bla-bla-bla')).toBe('bla-bla-bla');
      expect(npmCompliantName('AbC')).toBe('abc');
      expect(npmCompliantName('._abc')).toBe('abc');
      expect(npmCompliantName('@sap/cloud-sdk-vdm')).toBe('@sap/cloud-sdk-vdm');
      expect(npmCompliantName('@sap/cloud-SDK-vdm')).toBe('@sap/cloud-sdk-vdm');
      expect(npmCompliantName('@sap/._cloud-SDK-vdm')).toBe(
        '@sap/cloud-sdk-vdm'
      );
      expect(npmCompliantName('_-.abc')).toBe('-.abc');
      expect(npmCompliantName('a'.repeat(250))).toBe('a'.repeat(214));
    });
  });

  describe('speaking name', () => {
    it('speaking service name from package name', () => {
      expect(directoryToSpeakingModuleName('business-partner-service')).toBe(
        'Business Partner Service'
      );
      expect(directoryToSpeakingModuleName('business partner service')).toBe(
        'Business Partner Service'
      );
    });
  });
});
