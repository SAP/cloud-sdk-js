# Generator (OpenAPI + OData) API

## Status

proposed

## Context 1

When generating only from one spec (either generator), which is probably the most common use case, when doing this mannually, the resulting folder structure is `<outputDir>/serviceDir`, which in turn is unexpected.
The name of the generator command is: `generate-X-client` indicating that only one client will be generated.

## Decision 1

1. Different behavior if only one specification is found vs. multiple.
   For one specification, put client directly into `<outputDir>`, for multiple make subdirectories.
2. `generate-openapi-client batch -i <inputFile> -o <outputDir>`
   Generate only the first matched input file found by default.
   Show a log message in case there are multiple inputs found, that batch argument is required to nest the APIs.
3. `generate-openapi-client -i <inputFile> -o <outputDir> --flat`
   Flatten the directory to be `<outputDir>`.
   Throw an error if input is a directory (with multiple files).
4. Keep it as is. (decided)
5. Rename the client:
   1. `openapi-generator`
   2. `sap-cloud-sdk-openapi-generator`

## Consequences 1

The given `outputDir` is the actual output directory.
Depending on the decided option, the behavior might be considered inconsistent by default.

## Context 2

The option naming is slighly inconsistent and quite long at times.
Some of the defaults might lead to many files being generated and transpiled by default - potentially more than necessary.
We should discuss the details of those defaults and make a concious decision on whether to keep or adjust them.

## Decision 2

| Current Name, Aliases                                    | Future Name, Aliases             | Current Behavior                                                                                  | Future Behavior                                                                                                                                              | Allow-no |
| :------------------------------------------------------- | :------------------------------- | :------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| `--inputDir`, `-i` _(required)_                          | `--input`, `-i` _(required)_     | Input directory/file                                                                              | _same_                                                                                                                                                       |  false   |
| `--outputDir`, `-o` _(required)_                         | `--outputDir`, `-o` _(required)_ | Output directory                                                                                  | _same_                                                                                                                                                       |  false   |
| `--clearOutputDir`                                       | `--clearOutputDir`               | Delete all files in output directory                                                              | _same_                                                                                                                                                       |  false   |
| `--generateJs`                                           | `--transpile`, `-t`              | Transpiles, default true                                                                          | Transpiles, default false. Can only be set if tsconfig is enabled. This should be explicitly stated in the documentation.                                    |  false   |
| `--generatePackageJson`                                  | `--packageJson`                  | Writes a default package.json, default true.                                                      | Writes a default package.json, default true (needs core dependency). Optionally in the future: Writes a custom package.json if passed. Keep boolean for now. |   true   |
| `--serviceMapping`                                       | `--serviceMapping`               | Considers a service mapping file. Shows a warning if none is given (differs from OData behavior). | Considers a service mapping file. Generates it by default. Maybe in the future: Skips if set to false.                                                       |   true   |
| `--tsConfig`                                             | `--tsConfig`                     | tsconfig.json file to overwrite the default "tsconfig.json".                                      | Writes a custom tsconfig.json if passed. Document that this should be used in combination with `transpile`.                                                  |  false   |
| `--versionInPackageJson`                                 | `--packageVersion`               | Version in package.json, default is generator version.                                            | Version in package.json, default is `1.0.0`. Hide it.                                                                                                        |  false   |
| **Options in OData, but not (yet in OpenAPI) generator** |
| `--forceOverwrite`                                       | `--overwrite`                    | Overwrite files even it they exist, default false.                                                | _same_                                                                                                                                                       |  false   |
| `--generateTypedocJson`                                  | `--typedocJson`                  | Writes a default typedoc.json, default true.                                                      | Remove/deprecate, use `files` instead.                                                                                                                       |    -     |
| **Currently hidden options**                             |
| `--additionalFiles`                                      | `--files`                        | Copy additional files, identified by glob. Hidden.                                                | _same_ Expose it.                                                                                                                                            |  false   |
| `--writeReadme`                                          | `--readme`                       | Writes a default README.md, default false.                                                        | _same_                                                                                                                                                       |  false   |

## Consequences 2

Naming is clearer, shorter and consistent.
Only minor implementation needed for a first version.
