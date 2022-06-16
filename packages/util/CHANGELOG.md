# @sap-cloud-sdk/util

## 2.5.0

### Minor Changes

- 89f1c423: [Compatibility Note] Stop using `VCAP_SERVICES` to determine the log format. Use `setLogFormat` and `setGlobalLogFormat` to specify the log format. By default, the log format is set to `kibana` for `NODE_ENV=production` and `local` otherwise.

## 2.4.0

### Patch Changes

- 0a008674: [Fixed Issue] Fix a bug in the implementation of the trim method.
