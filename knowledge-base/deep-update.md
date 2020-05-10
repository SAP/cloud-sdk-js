## odata v4 deep update
### odata v4.0 V.S. odata v4.0.1
#### odata v4.0
- only support binding info for navi-property
  1. [1-to-1] replace the existing one `object.set()`
  1. [1-to-n] add them to the existing collection `collection.addAll()`
#### odata v4.0.1
- full set by using the same navi-property name `object.set()`, which does NOT allow:
  - adding links
  - deleting links
  - deleting entities
``` json
{
  "@type":"#Northwind.Manager",
  "FirstName" : "Patricia",
  "DirectReports": [
    {
      "@id": "Employees(5}"
    },
    {
      "@id": "Employees(6}",
      "LastName": "Smith"
    },
    {
      "FirstName": "Suzanne",
      "LastName": "Brown"
    }
  ]
}
```
- delta update by using a `@delta` annotation
  - delete entities (`@removed`)
  - delete links (`reason = deleted`)
  - add links (with id/key)
  - update entities (with id/key + Partial<Entity>)
  - create new entities + add links (without id/key)
``` json
{
  "@type": "#Northwind.Manager",
  "FirstName": "Patricia",
  "DirectReports@delta": [
    {
      "@removed": {
        "reason": "deleted"
      },
      "@id": "Employees(3)"
    },
    {
      "@removed": {
        "reason": "changed"
      },
      "@id": "Employees(4)"
    },
    {
      "@id": "Employees(5)"
    },
    {
      "@id": "Employees(6)",
      "LastName": "Smith"
    },
    {
      "FirstName": "Suzanne",
      "LastName": "Brown"
    }
  ]
}
```

## proposal
### full set
- like deep create
- no api changes, only behaviour changes
- be aware of the `@id` field that needs to be handled
   - add `@id` attribute implicitly in the request builder (Java)
   - add `@id` as default attribute to the abstract entity,
   - change navi-property type to e.g., :
   ```
   toOtherMultiLink: (TestEntityOtherMultiLink & Identifiable)[];
   
   interface Identifiable{
       _id: string
   }
   ```
   - hint: `@id` is used [here](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_LinktoRelatedEntitiesWhenCreatinganE)
### delta update
``` typescript
new UpdateRequestBuilder(TestEntity, entity)
.deepUpdateWithDeltaPayload(
    TestEntity.TO_MULTI_LINK, deltaMultiLink1, deltaMultiLink2
).deepUpdateWithDeltaPayload(
    someOtherNaviProperties...
)
.execute(destination);
```
```
deltaMultiLink: TestEntityMultiLink & IsRemoved;

interface IsRemoved{
    removed?: boolean;
    reason?: string;
}
```

Again, `@id` can be treated the same way as the full set

## decision
### 4.0 V.S. 4.0.1
4.0.1, newer, latest, more powerful.
The what's [link](http://docs.oasis-open.org/odata/new-in-odata/v4.01/cn01/new-in-odata-v4.01-cn01.html#_Toc485385071)
indicates that 4.0.1 introduces deep updates.
### scope
- full set (Y)
- @delta (N)
  - @delete
    - reason
  - with id/key
  - without id/key
### priority
low
- no test system
- no feature request

## open topic
- [killer feature?] create entities + add links
  

