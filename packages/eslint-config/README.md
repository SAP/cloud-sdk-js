<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>

# @sap-cloud-sdk/eslint-config

This package contains a shareable `eslint` configuration based on the configuration used by the SAP Cloud SDK.
It extends the `eslint:recommended` and `@typescript-eslint/recommended` rulesets.
It also uses the `eslint-config-prettier` to avoid any formatting conflicts when using the highly recommended `prettier`.

## How to use

To add the configuration please adjust your eslint configuration (usually called `.eslintrc` or `.eslintrc.js`):

```
{
  "extends": "@sap-cloud-sdk"
}
```

or if you want to combine this configuration with others:

```
{
  "extends": ["airbnb", "@sap-cloud-sdk"]
}
```

Eslint merges these shareable configs with your configuration.
Any rule configured in your `.eslintrc.js` will overwrite the setting for this rule in shareable configs.
