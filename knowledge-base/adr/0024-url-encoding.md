# URL Encoding

## Status

Accepted.

## Decision

Use `encodeURIComponent` for the parts below:

- User input values of path parameters
  - e.g., for `/entities/a b`, the `a b` will be encoded to `a%20b`.
  - e.g., for `/Entity(KeyName='va/ue')`, the `va/ue` will be encoded to `va%2Fue`.
- User input values of query parameters
  - e.g., for `$filter=Gender eq '/Female'`, the `Gender eq '/Female'` will be encoded to `Gender%20eq%20%27%2FFemale%27`.

## Consequences

- For the chosen components, we are able to apply encoding properly.
- There might be still some other parts like "host", "service path" and "entity name" etc., which need coding. Potential solutions are mentioned in this doc. (See [Background](#background))

## Background

OData and OpenAPI requests built by the SDK need to be encoded.
We should decide, which parts of the URL need to be encoded and which not.
Let's start from the structure of a URL.

### URL

```
https://www.example.com/path?param=1
```

The example above consists of the following components:

- protocol: `https`
- host: `www.example.com`
- path: `/path`
- query: `param=1`

As the protocol will not be encoded, we will only discuss the rest of them.

### Host

There are some cases where the host contains special characters like umlaut.
As not all the browsers/http clients can handle such special characters, Internationalized Domain Name (IDN) plays a big role here.
One can use an IDN converter so `www.häuser.de` can be converted to `www.xn--huser-gra.de`.
As the host is usually configured in the destination, the SDK will not make any adjustment.

### Path

Let's discuss OData path and OpenAPI path separately, as OData case is a bit complicated.

#### OData

Below is one example about how the path should look like in terms of OData

```
/basePath/Entity('key')/to_MultiLink('key')/to_SingleLink
```

- base path: `/basePath`
- entity path: `/Entity(KeyName='value')`
- navigation property path: `/to_MultiLink(KeyName='value')/to_SingleLink`

##### Service Path

We assume the service path has not special characters that need to be encoded.
If needed, the user can easily configure the service mapping file.

##### Entity Path

The entity path consists of the following parts:

- an entity name: `Entity`
- entity key names: `KeyName`
- values of the entity key: `value`

We assume the "entity names" and "entity key names" provided by the metadata do not have to be encoded.
If needed, based on the feedback, we can either do it during generation or ask the possibility to adjust the metadata.

On the other side, the "values of the entity key" of an entity is provided by the user, which might contain special characters.
One of the users uses `/` as part of a key.
Therefore, we have to encode the "values of the entity key".

##### Navigation Property Path

Similar to entity path, only the "values of the navigation property key" are planned to be encoded.

#### OpenAPI

The path pattern should look like the example below:

```
"/entities/{entityId}"
```

- path: `/entities`
- path parameter: `{entityId}`

Similar to OData, only user input is considered when encoding, which is the "path parameters"

### Query

Similar to path section, we also discuss OData and OpenAPI separately.

#### OData

OData allows you to use the following query options:

- `$top=1`
- `$skip=1`
- `$orderby=StringProperty`
- `$select=StringProperty`
- `$expand=to_MultiLink`
- `$filter=StringProperty eq 'string'`
- `$batch`
- `$value`

`$filter` is the only one query option that contains user input.
One spacial case is the `$expand`.
Normal `$expand` has the same structure as `$select`, while for deep `$expand`, it depends on the inner query option.

#### OpenAPI

The value of the query parameters should be encoded.

### Why `encodeURI` does not solve our problem

When `/` is used as part of the parameter value like `/Entity('a/b/c')`, the `encode` is not intelligent enough to encode it. (See [Appendix](#appendix))

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
