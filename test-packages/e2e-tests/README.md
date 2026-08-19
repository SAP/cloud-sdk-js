## Version Increase CDS

The `cds` dependency works together with the `cds-dk`.
The latter dependency is used for the `pnpm deploy` to the local sql DB.
We found that certain versions of `cds-dk` do not work together with versions of `cds`.
Hence, we fix the `cds-dk` version and let dependabot increase the `cds`. 
Our aim is that the SDK works with the latest `cds` version - the `cds-dk` is just to have a local DB.

For testing if two versions works together do the following in the e2e folder:

```bash
rm -r node_modules/ && pnpm install --ignore-engines       //contains state of pm2
rm sqlite.db && pnpm deploy && pnpm pretest:e2e && pnpm posttest:e2e     //recreate DB
//execute your tests
```

## Generate EDMX

To generate an EDMX file from the test service, run `pnpm run generate-edmx`.
