<a href="https://community.sap.com/topics/cloud-sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>

# Welcome to Your Application!

This is your **SAP Cloud Platform Cloud Foundry** application powered by the [SAP Cloud SDK for JavaScript](https://community.sap.com/topics/cloud-sdk) and [NestJS](https://nestjs.com/).

## Getting started

Everything is ready to go.

```bash
# Run the application locally
$ npm run start:dev

# Open the application in your default browser
$ open http://localhost:3000/
```

If you have the [Cloud Foundry CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html) and are [logged in](https://docs.cloudfoundry.org/cf-cli/getting-started.html#login), you can deploy the application without any changes to the application.

```bash
# Deploy your application to SAP Cloud Platform Cloud Foundry
$ cf push
```

## Testing

The project comes with unit and end-to-end tests.
Unit tests are located in the `src/` folder next to the modules and controllers, while end-to-end tests are in the `test/` folder.

```bash
# Run unit tests
$ npm run test

# Run e2e tests
$ npm run test:e2e
```

## Continuous Integration

This project is preconfigured to run with the [SAP Cloud SDK Pipeline](https://github.com/SAP/cloud-s4-sdk-pipeline).
To get the installer follow the short [guide](https://github.com/SAP/cloud-s4-sdk-pipeline#download-and-installation).

```bash
# If you have the SAP Cloud SDK CLI installed, it can download the install script for you
sap-cloud-sdk add-cx-server

# Execute the script to start the Jenkins server
$ ./cx-server start
```

Point the new Jenkins to your repository and it will automatically run the pipeline.
If the pipeline should deploy your application as well, you need to modify the `.pipeline/config.yml`.

## NestJS

NestJS is a progressive [Node.js](http://nodejs.org) framework for building efficient and scalable server-side applications, heavily inspired by [Angular](https://angular.io).

The [Nest CLI](https://docs.nestjs.com/cli/usages) is a powerful tool and can help you create new controllers, modules and interfaces.

## Support

If you need support with the SAP Cloud SDK, the SAP Cloud SDK CLI or this project scaffold, feel free to open an issue on [GitHub](https://github.com/SAP/cloud-sdk-cli) or ask a question on [stackoverflow with tag [sap-cloud-sdk]](https://stackoverflow.com/questions/tagged/sap-cloud-sdk).

## License and Notice

The SAP Cloud SDK CLI is licensed under the [Apache Software License, v. 2](https://github.com/SAP/cloud-sdk-cli/blob/main/LICENSE).
Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

The SAP Cloud SDK is in no way affiliated with or endorsed by Nest and its maintainers.
While Nest is our recommendation, the SAP Cloud SDK can be used with any framework, so you are free to choose what you are comfortable with.
