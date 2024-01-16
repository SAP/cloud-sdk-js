# ai_core_api

This package contains the OpenAPI client for the AI_CORE_API.
Provides tools to manage your scenarios and workflows in SAP AI Core. Execute pipelines as a batch job, for example to pre-process or train your models, or perform batch inference. Serve inference requests of trained models. Deploy а trained machine learning model as a web service to serve inference requests with high performance. Register your own Docker registry, synchronize your AI content from your own git repository, and register your own object store for training data and trained models.

## Usage Example

```
import { FileApi } from './generated/AI_CORE_API';

const responseData = await FileApi.fileDownload(path).execute({ destinationName: 'myDestinationName' });
```

## Helpful Links

- [SAP Cloud SDK](https://github.com/SAP/cloud-sdk-js)
- [SAP Cloud SDK Documentation portal - Getting started guide](https://sap.github.io/cloud-sdk/docs/js/getting-started)
- [SAP Cloud SDK Documentation portal - API documentation](https://sap.github.io/cloud-sdk/docs/js/api)
- [developers.sap.com - Product Overview](https://developers.sap.com/topics/cloud-sdk.html)
- [developers.sap.com - Tutorials](https://developers.sap.com/tutorial-navigator.html?tag=software-product:technology-platform/sap-cloud-sdk&tag=tutorial:type/tutorial&tag=programming-tool:javascript)
- [Release notes](https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/js-index.html)
- [SAP API Business Hub](https://api.sap.com/)
