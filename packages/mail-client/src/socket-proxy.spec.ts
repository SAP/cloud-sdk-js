import { customAuthRequestHandler } from "../internal";

describe('socket proxy', () => {
  describe('customAuthRequestHandler', () => {
    it('returns the correct buffer without location ID', async () => {
      const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const locationId = undefined;

      const authRequest = await customAuthRequestHandler(jwt, locationId)

      expect(authRequest).toMatchSnapshot();
    });

    it('return the correct buffer with location ID', async () => {
      const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const locationId = 'cloud-sdk-js';

      const authRequest = await customAuthRequestHandler(jwt, locationId)

      expect(authRequest).toMatchSnapshot();
    });
  })
})