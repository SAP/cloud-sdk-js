# Dynamic log levels

We should provide a functionality to set the log levels of the sdk loggers dynamically this means:

- No code change
- No application restart

For this we have to consider an environment variable on each call of the logger.
No static state is possible - only as fallback.
We expect that the setting of the env variables works on CF via [cf set-env name value](https://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html#app-system-env)
as expected and the variable is then accessible on the node server via `process.env`.

The env check should be flexible:

- If you set `logger.cloud.sdk=debug` all logger should log debug and below.
- If you set `logger.cloud.sdk.core=warn` all logger of the package core should log warn and below.
- If you set `logger.cloud.sdk.core.count-request-config=debug` only the logger of the count request builder is changed.

One idea to achieve this would to wrap the logger we get from the container in the `cloud-sdk-logger.ts`.
The wrapper would include a dynamic check on the environment variables:

```js
logger.error('Some Error')

LoggerWrapper{
    error:('message')=>{
      if(doSomeEnvCheck()){
      //delegate to winston error
      }
    }
}
```

## Conclusion:

We are open to the wrapper and env approach.
It seems like the [cf-nodejs-logging-support](https://github.com/SAP/cf-nodejs-logging-support) can not be used directly since it does not consider really dynamic adjustment, the same as winston.

## Questions

### The `cf-nodejs-logging-support`

The lib [cf-nodejs-logging-support](https://github.com/SAP/cf-nodejs-logging-support) does not cover what we want to achieve.
A context bound logging is achieved via binding to the `req,res` object:

```js
const server = http.createServer((req, res) => {
  //binds logging to the given request for request tracking
  log.logNetwork(req, res);

  // Context bound custom message
  req.logger.info('request bound information:');
  res.end('ok');
});
```

Dynamic log level adjustment is done via a `header` field:

```json
{
  "issuer": "<valid e-mail address>",
  "level": "debug",
  "iat": 1506016127,
  "exp": 1506188927
}
```

We should also consider the level from the header as an additional option to set the log level.
Also we can perhaps use methods to extract the fields:

- correlation_id
- request_id
- tenant_id
- tenant_subdomain
  from the request.

### Work on frontend

The wrapping and reading of env variables should cause no problems on the frontend.
The logging lib will be used only partially with very simple methods.
