## REST Generator

This is currently not release ready. excluded in `mail.ts`.

The generator wraps only the openapi-generator. 
This is a flexible tool using many commandline flags and templates for easy adjustment.
<br>[Command line arguments](https://github.com/OpenAPITools/openapi-generator#3---usage)
<br>[Repo For mustache files](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator/src/main/resources/typescript-axios)

In the wrapping `generator-cli` we currently only expose `inputDir` and `outputDir` to generate tyescript-axios sources from the openapi.json files.


### Things we have adjusted to the OpenApi Generator
- Since the SAP graph definitions were lacking any tags we added a tag with the service name in camel case to each path of the service.
- The method singature of the constructor was changed to take the accesstoken or basic for auth  and URL. 
  This was done by changing the `templates/baseApi.mustache` to achieve that.

### Usage

To run the generator use:
 
 ```shell script
 ts-node `src/generator-cli.ts` -i <FolderContainingOpenApiDefinitions> -o <OutputDirectory>
```

Once you have the generated classes, you can make calls via:
```typescript
import { AxiosResponse } from 'axios';
import { SalesOrdersApi, InlineResponse200 as ResponseSalesOrder } from 'generated/sales-orders';

const response: AxiosResponse<ResponseSalesOrder> = await new SalesOrdersApi({ accessToken, basePath }).getSalesOrders()
```

Besides bearer token also basic is supported for authentication.

### Problem Generator

- If you add the option `'--additional-properties=withSeparateModelsAndApi=true'`
and you have the templates enables, the model files are empty. Most likely there is no template found for the type.
