<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>

# @sap-cloud-sdk/generator

Generate your own service module using a service specification (.edmx file).

## Installation

```sh
$ npm install @sap-cloud-sdk/generator
```

## Usage

The generator is primarily meant to be used on the command line:

```sh
generate-odata-client --inputDir path/to/your/service-specification(s) --outputDir path/where/the/modules/are/stored
```

Run `generate-odata-client --help` for further options.

You can also use the generator programmatically. You will have to provide the options anyways.

```ts
import { generateProject } from '@sap-cloud-sdk/generator';

// initialize generator options based on what you want to do
const options: GeneratorOptions = initializeOptions();

// creates a Project datastructure with all sourcefiles based on your options
const project = generateProject(options);

// here you can modify you project if you need to

// save the files at the specified location
project.save();

// alternatively you can generate and save the project in one step with: generate(options)
```

### Documentation
[Getting started guide](https://sap.github.io/cloud-sdk/docs/js/getting-started)
[API documentation](https://sap.github.io/cloud-sdk/docs/js/api-reference-js-ts)

### Helpful Links

- [SAP Cloud SDK Documentation portal](https://sap.github.io/cloud-sdk/)
- [Tutorials on developers.sap.com](https://developers.sap.com/tutorial-navigator.html?tag=products:technology-platform/sap-cloud-sdk/sap-cloud-sdk&tag=topic:javascript)
- [SAP Cloud SDK on StackOverflow](https://stackoverflow.com/questions/tagged/sap-cloud-sdk?tab=Newest)
- [SAP Cloud SDK on answers.sap.com](https://answers.sap.com/tags/73555000100800000895)
- [Release notes on help.sap.com](https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/js-index.html)
- [Release notes on Github](https://github.com/SAP/cloud-sdk/releases)
- [All versions of this documentation](https://help.sap.com/viewer/product/SAP_CLOUD_SDK/1.0/en-US)
- [Product page of the SAP Cloud SDK](https://developers.sap.com/topics/cloud-sdk.html)
- [SAP Cloud SDK Continuous Delivery Toolkit](https://github.com/SAP/cloud-s4-sdk-pipeline)
