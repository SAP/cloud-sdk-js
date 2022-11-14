## Debug OData tests

The SDK has a test-application providing OData APIs in the `e2e-tests` workspace.
This is used for the automated tests running locally and in CI.
It can also be helpful for debugging and developing OData-related functionality, such as the generated OData API clients.

### You will learn

After reading this "how-to" document, you will be able to:

* Start the OData e2e-test service
* Make HTTP requests to invoke functions and actions

### Step 1: Start the Service

```bash
yarn run e2e-tests deploy
yarn run e2e-tests start:service-server
```

:warning: The `deploy` step makes changes to `test-packages/e2e-tests/package.json` which should not be committed.
Also, the `test-packages/e2e-tests/db.sqlite` file should not be added to the git repo.

```
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   test-packages/e2e-tests/package.json

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	test-packages/e2e-tests/db.sqlite
```

The [*Test Service*](../../test-packages/e2e-tests/srv) is available at the url `http://localhost:4004/odata/test-service`.

### Step 2: Make requests the service

To see how the service behaves you may run HTTP requests with tools such as cURL, Postman or Insomnia.

Here are some examples for valid requests which should help you get the URL you need

```bash
curl 'http://localhost:4004/odata/test-service/TestEntity(KeyTestEntity=1)/TestService.boundFunctionWithoutArguments()'
```

```bash
curl 'http://localhost:4004/odata/test-service/TestEntityWithMultipleKeys(KeyTestEntityWithMultipleKeys=101,StringPropertyWithMultipleKeys=%27a%27,BooleanPropertyWithMultipleKeys=true)/TestService.boundFunctionWithoutArgumentsWithMultipleKeys()'
```

```bash
curl --request POST \
  --url 'http://localhost:4004/odata/test-service/TestEntity(KeyTestEntity=101)/TestService.boundActionWithoutArguments' \
  --header 'Content-Type: application/json'
```

### Step 3: Debug tests

Once you got a working HTTP request, you can go to the test you're interested in and debug it.
We'll use the "bound functions" test `test-packages/e2e-tests/test/bound-function.spec.ts` as an example.
You can set a breakpoint, run the test with debugger attached and inspect details of the request.

### Step 4: Cleanup

Stop the service, remove the changed and untracked files.

```bash
yarn run e2e-tests stop:service-server
git restore test-packages/e2e-tests/package.json
rm test-packages/e2e-tests/db.sqlite
```
