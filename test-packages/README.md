## Version Increase cds

The `cds` dependency works together with certain version of `cds-dk`.
The latter dependency is used for the `yarn deploy` to the local sql DB.
For testing if the two version of  works do the following in the e2e folder:

```bash
rm -r node_modules/ && yarn install --ignore-engines       //contains state of pm2
rm -r sqlite.db && yarn deploy && yarn stop && yarn start  //recreate DB
//execute your tests
```
