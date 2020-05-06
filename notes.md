# Notes OData POC

## Basic idea

I want to differentiate entities by their version, which is represented as an instance variable on the entity itself:
```ts
export abstract class Entity extends EntityBase {
  readonly _oDataVersion: 'v4' = 'v4';
}
```

Things that need to be split / duplicated are:
- Everything related to conversion (payload / uri)
- RequestBuilders (due to partially differing APIs)
- Link implementation

Every actual entity and request builder (e. g. `TestEntity`, `TestEntityRequestBuilder`) shall be based on the v4 / v2 implementation - the API shall be solely based on this change.

How can they be brought together?
I didn't really get to this part, but I was aiming for splitting the above mentioned code into a common, v2 and v4 part. The rest should basically use some form of dependency injection to call the respective implementation. Most of the code should not rely on the specific version implementation.


## Bugs / Possible improvements I found

- The type of `_allFields` in `Constructable` should not be `Selectable`, but `Field` | `Link`
- All other properties of `Constructable` that are currently of type `Selectable` should be `Field` (e. g. keys)
- `Link` can be simplified by adding a default parameter
- `AllFields` should be a Field itself
- We could add some more type safety by storing the name of the entity as an instance variable, e. g. `_entityName: 'TestEntity' = 'TestEntity'` for more convenience
- `odate-batch-consts`
