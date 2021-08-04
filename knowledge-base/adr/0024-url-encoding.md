# URL Encoding

## Status

Accepted.

## Requirement

The SDK will only encode the parts below:

- The values of path parameters (the get by key structure of OData is called path parameter in OpenAPI)
- The values of query parameters

## Background

OData and OpenAPI requests built by the SDK needs to be encoded.
We should decide, which parts of the URL need to be encoded and which not.
Let's start from the structure of a URL.
Emojis :thumbsup: and :thumbsdown: are used in this doc for specifying whether encoding will be applied by the SDK.

### URL

```
https://www.example.com/path?param=1
```

The example above consists of the following components:

- protocol: `https` :thumbsdown:
- host: `www.example.com` :thumbsdown:
- path: `/path` :thumbsup:
- query: `param=1` :thumbsup:

As the protocol will not be encoded, we will only discuss the rest of them.

### Host :thumbsdown:

There are some cases where the host contains special characters like umlaut.
As not all the browsers/http clients can handle such special characters, Internationalized Domain Name (IDN) plays a big role here.
One can use an IDN converter so `www.häuser.de` can be converted to `www.xn--huser-gra.de`.
As the host is usually configured in the destination, the SDK will not make any adjustment.

### Path

Let's discuss OData path and OpenAPI path separately, as OData case is a bit complicated.

#### OData

Below is one example about how the path should look like in terms of OData

```
/servicePath/Entity('key')/to_MultiLink('key')/to_SingleLink
```

- service path: `/servicePath` :thumbsdown:
- entity path: `/Entity(KeyName='value')` :thumbsup:
- navigation property path: `/to_MultiLink(KeyName='value')/to_SingleLink` :thumbsup:

##### Service Path :thumbsdown:

We assume the service path has not special characters that need to be encoded.
If needed, the user can easily configure the service mapping file.

##### Entity Path :thumbsup:

The entity path consists of the following parts:

- an entity name: `Entity` :thumbsdown:
- entity key names: `KeyName` :thumbsdown:
- values of the entity key: `'value'` :thumbsup:

We assume the "entity names" and "entity key names" provided by the metadata do not have to be encoded.
If needed, based on the feedback, we can either do it during generation or ask the possibility to adjust the metadata.

On the other side, the "values of the entity key" of an entity is provided by the user, which might contain special characters.
One of the users uses `/` as part of a key.
Therefore, we have to encode the "values of the entity key".

##### Navigation Property Path :thumbsup:

Similar to entity path, only the "values of the navigation property key" are planned to be encoded.

#### OpenAPI

The path pattern should look like the example below:

```
"/entities/{entityId}"
```

- path: `/entities` :thumbsdown:
- path parameter: `{entityId}` :thumbsup:

Similar to OData, only user input is considered when encoding, which is the "path parameters"

### Query

Similar to path section, we also discuss OData and OpenAPI separately.

#### OData

OData allows you to use the following query options:

- `$format=json` :thumbsdown:
- `$top=1` :thumbsdown:
- `$skip=1` :thumbsdown:
- `$orderby=StringProperty` :thumbsdown:
- `$select=StringProperty` :thumbsdown:
- `$expand=to_MultiLink` :thumbsup:
- `$filter=StringProperty eq 'string'` :thumbsup:
- `$batch` :thumbsdown:
- `$value` :thumbsdown:

`$filter` is the only one query option that contains user input.
One spacial case is the `$expand`.
Normal `$expand` has the same structure as `$select`, while for deep `$expand`, it depends on the inner query option.

#### OpenAPI

The value of the query parameters should be encoded. :thumbsup:

## Alternatives

### Option A: Use `encodeURI` for the whole URL

#### Pros and Cons

##### Pros

- We just need this method ONCE for the whole URL
- The special characters like `/` (as path delimiter), `&` (as query delimiter) etc. are not encoded. (See [Appendix](#appendix))

##### Cons

- For custom values like custom query, we would like to respect the user input, but the encoding cannot be avoided.
- When `/` is used as part of the parameter value like `/Entity('a/b/c')`, the `encoode` is not intelligent enough to encode it.

#### Workaround based on this option

- encode `a/b/c` first then apply Option A
- ask the user to provide encoded value

Both of the 2 proposals will lead to double encoding.

#### Decision

Not accepted, as it does not work for edge cases.

### Option B: Use `encodeURIComponent` for the selected parts

#### Pros and Cons

##### Pros

- We can choose specific components for encoding, which is flexible.
- It solves the problem of Option A, that `/` can be encoded. (See [Appendix](#appendix))
- For custom values, the encoding can be skipped.

##### Cons

- We have to call this method multiple times for all the parts that need encoding.
- We have to be very careful to call `encodeURIComponent('a/b/c')` instead of `encodeURIComponent('/Entity('a/b/c')')`, as the latter one is wrong.

#### Decision

Chosen, as this is a valid solution.

## Decision

Option B is the winner, as Option A does not fit our requirement.

## Consequences

- For the chosen components, we are able to apply encoding properly.
- There might be still some other parts like "host", "service path" and "entity name" etc., which need coding. Potential solutions are mentioned in this doc.

## Appendix

The table below shows the difference between `encodeURI` and `encodeURIComponent`.

| Character | encodeURI | encodeURIComponent |
| --------- | --------- | ------------------ |
| #         | #         | %23                |
| $         | $         | %24                |
| &         | &         | %26                |
| +         | +         | %2B                |
| ,         | ,         | %2C                |
| /         | /         | %2F                |
| :         | :         | %3A                |
| ;         | ;         | %3B                |
| =         | =         | %3D                |
| ?         | ?         | %3F                |
| @         | @         | %40                |
