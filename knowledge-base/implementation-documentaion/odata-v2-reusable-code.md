We want to reuse the current `core`/`generator` code for odata v4. 
Therefore, this file lists all the source code that can/cannot be used.
Simple conclusion is that most of the source code can be used, since there are not so many conflicts between v2 and v4.
V4 new features might introduce refactoring, which will be decided when the feature ticket is started.
Then the refactored code can be reused by both version.

## core
### filter
#### filter function related
All files can be reused. When necessary, we can consider adding `odata-v4-filter-functions.ts`.
#### filter itself
- filter.ts
- filter-link.ts
- filter-list-ts
- filterable.ts
All files above can be reused in terms of the basic usage. However, when implementing new feature like `$expand=_ItemPartner($filter=SalesOrder eq '2915717')` or `any`/`all` keywords, this might not be the case.
### http-client
Not odata related.
### order
All files can be reused, no changes.
### request-builder
All files can be reused.
### scp-cf
Not odata related.
### selectable
All files can be reused in terms of the common usage. However, when implementing new feature like `$expand=_ItemPartner($select=SalesOrder)`, this might not be the case.
### util
All files can be reused/improved.
### root
- edm data type conflict:
    - uri-value-converter.ts
    - edm-types.ts
    - payload-value-converter.ts
- Low level abstraction. This might be the location for the strategy pattern, where v2/v4 specific generator can be applied.
    - entity.ts
    - entity-builder.ts
    - entity-deserializer.ts
    - entity-serializer.ts

## generator
### aggregator-package
Not odata related.
### batch
All files can be reused, because the basic usage of the `batch` does not change.
### complex-type
All files can be reused, no changes.
### entity
Low level abstraction.
This might be the location for the strategy pattern, where v2/v4 specific generator can be applied.
### function-import
All files can be reused, no changes.
### parser
Not odata related.
### request-builder
All files can be reused.
### service
Not odata related.
### root
- edm data type conflict:
    - generator-utils.ts
- make v4 variant for the files below:
    - generator.ts
    - generator-cli.ts
    - generator-options.ts


