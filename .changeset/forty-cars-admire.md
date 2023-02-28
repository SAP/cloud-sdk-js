---
'@sap-cloud-sdk/odata-common': major
---

[Compatibility Note] The constructor of `ODataRequestConfig` was changed so that the third parameter cannot be a `string` anymore.
Passing in a string which was then interpreted as the value for the `Content-Type` HTTP header was deprecated.
The type of the parameter is now `Record<string, any>`, and if only want to set the `Content-Type` HTTP header you can do so by passing `{'content-type': 'some-value'}` to the constructor.
