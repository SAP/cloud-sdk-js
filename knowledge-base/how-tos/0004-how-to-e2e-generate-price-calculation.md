## E2E Test of price calculation

### Generate type safe clients

1. Put the open api json file of the price calculation in the folder `packages/rest-generator/test/resources/PriceCalculation`
2. Run the command `generate:test-services` defined in the `packages/rest-generator/package.json` for generating clients.

### Uncomment test files listed below

1. `packages/rest-generator/test/util/get-price-calculate.ts`
2. `packages/rest-generator/test/util/price-calculate-payload.ts`
3. `packages/rest-generator/test/get-price-calculation.spec.ts`

These file cannot be compiled without the generated clients.

### Run tests

Run jest test against this file `packages/rest-generator/test/get-price-calculation.spec.ts`.

### Troubleshooting

When generated `api.ts` cannot be compiled due to errors like this line `delete localVarUrlObj.search;`,
add a line above it to ignore this `// @ts-ignore`, since they fixed it on the master branch.
