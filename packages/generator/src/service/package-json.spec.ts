import { packageJson } from './package-json';
// TODO: fix the test, as this will fail after a version bump. Search for "^1.50.0", which should not be hard coded.
xdescribe('package-json', () => {
  it('creates v2 package content', async () => {
    await expect(
      packageJson(
        'my-v2-package',
        'X.Y.Z-v2',
        'my v2 package description',
        false,
        'v2'
      )
    ).resolves.toMatchInlineSnapshot(`
            "{
              \\"name\\": \\"my-v2-package\\",
              \\"version\\": \\"X.Y.Z-v2\\",
              \\"description\\": \\"my v2 package description\\",
              \\"homepage\\": \\"https://sap.github.io/cloud-sdk/docs/js/getting-started\\",
              \\"main\\": \\"./index.js\\",
              \\"types\\": \\"./index.d.ts\\",
              \\"publishConfig\\": {
                \\"access\\": \\"public\\"
              },
              \\"files\\": [
                \\"**/*.js\\",
                \\"**/*.js.map\\",
                \\"**/*.d.ts\\",
                \\"**/d.ts.map\\",
                \\"**/*-csn.json\\"
              ],
              \\"repository\\": {
                \\"type\\": \\"git\\",
                \\"url\\": \\"\\"
              },
              \\"scripts\\": {
                \\"compile\\": \\"npx tsc\\"
              },
              \\"dependencies\\": {
                \\"@sap-cloud-sdk/odata-common\\": \\"^1.50.0\\",
                \\"@sap-cloud-sdk/odata-v2\\": \\"^1.50.0\\"
              },
              \\"peerDependencies\\": {
                \\"@sap-cloud-sdk/odata-common\\": \\"^1.50.0\\",
                \\"@sap-cloud-sdk/odata-v2\\": \\"^1.50.0\\"
              },
              \\"devDependencies\\": {
                \\"typescript\\": \\"~4.5\\"
              }
            }
            "
          `);
  });

  it('creates v4 package content with after version script', async () => {
    await expect(
      packageJson(
        'my-v4-package',
        'X.Y.Z-v4',
        'my v4 package description',
        true,
        'v4'
      )
    ).resolves.toMatchInlineSnapshot(`
            "{
              \\"name\\": \\"my-v4-package\\",
              \\"version\\": \\"X.Y.Z-v4\\",
              \\"description\\": \\"my v4 package description\\",
              \\"homepage\\": \\"https://sap.github.io/cloud-sdk/docs/js/getting-started\\",
              \\"main\\": \\"./index.js\\",
              \\"types\\": \\"./index.d.ts\\",
              \\"publishConfig\\": {
                \\"access\\": \\"public\\"
              },
              \\"files\\": [
                \\"**/*.js\\",
                \\"**/*.js.map\\",
                \\"**/*.d.ts\\",
                \\"**/d.ts.map\\",
                \\"**/*-csn.json\\"
              ],
              \\"repository\\": {
                \\"type\\": \\"git\\",
                \\"url\\": \\"\\"
              },
              \\"scripts\\": {
                \\"compile\\": \\"npx tsc\\",
                \\"version\\": \\"node ../../../after-version-update.js\\"
              },
              \\"dependencies\\": {
                \\"@sap-cloud-sdk/odata-common\\": \\"^1.50.0\\",
                \\"@sap-cloud-sdk/odata-v4\\": \\"^1.50.0\\"
              },
              \\"peerDependencies\\": {
                \\"@sap-cloud-sdk/odata-common\\": \\"^1.50.0\\",
                \\"@sap-cloud-sdk/odata-v4\\": \\"^1.50.0\\"
              },
              \\"devDependencies\\": {
                \\"typescript\\": \\"~4.5\\"
              }
            }
            "
          `);
  });
});
