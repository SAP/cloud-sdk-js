# Dynamic log levels

We should provide a functionality to set the log levels of the sdk loggers dynamically this means:
- No code change
- No application restart

For this we have to consider an environment variable on each call of the logger.
No static state is possible - only as fallback.
We expect that the setting of the env variables works on CF via [cf set-env name value](https://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html#app-system-env)
as expected and the variable is then accessible on the node servier via `process.env`.

The env check should be flexible:
- If you set `logger.cloud.sdk=debug` all logger shold log debug and below.
- If you set `logger.cloud.sdk.core=warn` all logger of the package core should log warn and below.
- If you set `logger.cloud.sdk.core.count-request-config=debug` only the logger of the count request builder is changed.

One idea to achieve this would to wrap the logger we get from the container in the `cloud-sdk-logger.ts`.
The wrapper would include a dynamic check on the enviorment varialbes:

```js
logger.error('Some Error')

LoggerWrapper{
    error:('message')=>{
      if(doSomeEnvCheck()){
      //delegate to winsston error  
      } 
    }
}
``` 

Collect other idea in call. 
