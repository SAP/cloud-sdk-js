Make the `Entity` aware of the OData version.<br>
Make ODataV2  the fallback so everything generated stays the same.
- SomeThing<EntityT extends Entity> ==> `SomeThing<EntityT extends Entity<Version>,Version=ODataV2>`. 
This extension holds up to the fields, filter etc.
- Use conditional types to split `Selectable<Version> = Version extends ODataV4 ? SelectableV4<EntityT> : SelectableV2<EntityT>`;

New V4 file are created for:
- get-all-request-builder-v4.ts
- odata-get-all-request-config-v4.ts
- test-entity-v4.ts Sample ODataV4 entity containing a collection
- odata-v2.ts and odata-v4.ts as dummy classes to set the version

Relevant Changes:
- EntityIdentifiable contains field `_version`
- Constructable contains field `_version`
- For the Concrete implementations `get-all-request-builder-v4.ts` the `_version` is set to `ODataV4`

Focused on the entity deserializer, but the serializer should be the same. If switches:
- payload-value-converter.ts (`edmToTs()` now version aware via argument) 
- payload-value-converter.ts (`deserializersV4` mapping with value converters)
- payload-value-converter.ts (`EdmToPrimitiveV4` conditional type used in edmToTs)

Tests:
- `entity-deserializer.spec.ts` for CollectionType
- `get-all-request-builder.spec.ts` for get-request builder
