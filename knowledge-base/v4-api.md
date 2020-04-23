# API Proposal: OData v4 (killer) features

This document contains a collection of OData v4 features we want to implement and according API proposals.


## Collections and Complex Types
- Complex Types - *already available in v2*
  - SDK representation: JS objects (with some sugar)
- Collection types - *new in v4*
  - List of primitive or complex types
  - Navigation properties can also be represented as collections (one-to-many)
  - Example property in EDMX: `<Property Name="Emails" Type="Collection(Edm.String)" />`
  - Example values: https://services.odata.org/TripPinRESTierService/(S(ljgcbxqwp45c5l5m0h24kk1g))/People?$select=Emails

### Proposal(s)
- Represent as arrays for primitive types (e. g. `string[]` for the example above)

### Decision
- 1.

## $expand with Subqueries
- Make queries on expanded entities (navigation properties)
- Works for `getAll` and `getByKey`
- Example request for collection: https://services.odata.org/TripPinRESTierService/(S(ljgcbxqwp45c5l5m0h24kk1g))/People?$select=Friends&$expand=Friends($select=UserName,Emails;$filter=startswith(UserName,%27s%27))
- Example request for single link: https://services.odata.org/TripPinRESTierService/(S(ljgcbxqwp45c5l5m0h24kk1g))/People?$select=BestFriend&$expand=BestFriend($select=UserName,Emails)

### Open Questions
- Query options related to lists should be used on one-to-many navigation properties only? (This is not failing in the reference services)
- Is v4 behavior that when expanding, all properties of the navigation property are selected?

### Proposal(s)
- Allow all query operations within a select on collection types. For non-collection types this is already possible.
  ```ts
  TestEntity.requestBuilder()
    .getAll()
    .select(
      TestEntity.TO_SINGLE_LINK.select(
        TestEntitySingleLink.STRING_PROPERTY
      ),
      TestEntity.TO_MULTI_LINK
        .select(
          TestEntityMultiLink.STRING_PROPERTY,
          TestEntityMultiLink.BOOLEAN_PROPERTY
        )
        .filter(
          TestEntityMultiLink.STRING_PROPERTY.equals('test'),
          TestEntityMultiLink.BOOLEAN_PROPERTY.equals(true)
        )
        .orderBy(desc(TestEntityMultiLink.STRING_PROPERTY))
        .skip(1)
        .top(10)
        .search('term')
    )
  ```

- Allow all query operations within an additional expand on collection types. For non-collection types this is already possible.
  - Consider whether expand should also be available in v2 API.
  ```ts
  TestEntity.requestBuilder()
    .getAll()
    .expand(
      TestEntity.TO_SINGLE_LINK.select(
        TestEntitySingleLink.STRING_PROPERTY
      ),
      TestEntity.TO_MULTI_LINK
        .select(
          TestEntityMultiLink.STRING_PROPERTY,
          TestEntityMultiLink.BOOLEAN_PROPERTY
        )
        .filter(
          TestEntityMultiLink.STRING_PROPERTY.equals('test'),
          TestEntityMultiLink.BOOLEAN_PROPERTY.equals(true)
        )
        .orderBy(desc(TestEntityMultiLink.STRING_PROPERTY))
        .skip(1)
        .top(10)
        .search('term')
    )
  ```

### Decision:
- 2. when assumption is correct, otherwise 1.

## $select with Subqueries
- Can only be used for complex types and collection types, not for navigation properties
- Couldn't find a working example, assuming the following are valid examples:
  - Selection within complex type (does not work): https://services.odata.org/TripPinRESTierService/(S(ljgcbxqwp45c5l5m0h24kk1g))/Airports?$select=Location($select=Address)
  - Filter within collection complex type (does not work): https://services.odata.org/TripPinRESTierService/(S(ljgcbxqwp45c5l5m0h24kk1g))/People?$select=AddressInfo($filter=Address%20eq%20%27187%20Suffolk%20Ln.%27)

### Open Questions
- How does this feature really work?
- Where can we test this?
- Can we use a CAP service to test this?

### Proposal(s)
- This proposal is incomplete due to a lack of information on how the sub select actually works

  Single Complex Type
  ```ts
  TestEntity.requestBuilder()
    .getAll()
    .select(
      TestEntity.COMPLEX_TYPE_PROPERTY
        .select(
          TestComplexType.BOOLEAN_PROPERTY,
          TestComplexType.STRING_PROPERTY
        ) // allow selection of complex type properties
      )
  ```

  Collection Complex Type
  ```ts
  TestEntity.requestBuilder()
    .getAll()
    .select(
      TestEntity.COMPLEX_TYPE_COLLECTION_PROPERTY
        .select(
          TestComplexType.BOOLEAN_PROPERTY,
          TestComplexType.STRING_PROPERTY
        )
        .filter(
          TestComplexType.STRING_PROPERTY.equals('test')
        )
        // ... allow all other query operations on collections
      )
  ```

### Decision
- proposal looks ok, but decision can only be made once we can test the feature

## $filter with Subqueries on One-To-Many and One-To-One Links
- One-To-Many Links: by filtering in $expand
- One-To-One Links:
  - v2 example:
  https://services.odata.org/V2/Northwind/Northwind.svc/Products?$select=Category/CategoryID&$expand=Category&$format=json&$filter=Category/CategoryID%20eq%202

  - v4 example:
  https://services.odata.org/Experimental/Northwind/Northwind.svc/Products?$select=Category&$expand=Category($select=CategoryID)&$filter=Category/CategoryID%20eq%202

### Proposal(s)
- Same approach as v2
  ```ts
  TestEntity.requestBuilder()
    .getAll()
    .filter(
      TestEntity.TO_SINGLE_LINK.filter(
        TestEntitySingleLink.TO_SINGLE_LINK.filter(
          WhateverTheName.STRING_PROPERTY.equals('test'),
          WhateverTheName.STRING_PROPERTY.equals('fest')
        )
      )
    )
  ```
  The second use of `filter` is misleading, we might want ot find a better keyword

### Decision
- TBD

## Type dependent filter expressions (e. g. 'year' for dates)
- Already available in v2 for the most part, there are some more functions
- Recap filterfunctions in v2:
  ```ts
  TestEntity.requestBuilder()
    .getAll()
    .filter(
      length(TestEntity.STRING_PROPERTY).equals(3), // specific function
      filterfunction('length', 'int', TestEntity.STRING_PROPERTY).equals(3) // generic function
    )
  ```

### Proposal(s)
- Reuse filter functions from v2
- Provide more default implementations for both v2 / v4

### Decision
- TBD

## Deep update of child entitites
- Recap v2 create as child of:
```ts
TestEntityMultiLink.requestBuilder()
  .create(multiLinkEntity)
  .asChildOf(testEntity, TestEntity.TO_MULTI_LINK)
```

### Proposal(s)
- Same as v2 create as child of
  ```ts
  TestEntityMultiLink.requestBuilder()
    .update(multiLinkEntity)
    .asChildOf(testEntity, TestEntity.TO_MULTI_LINK)
  ```


## $search
- New query operator allows to search all columns by value
- Can consist of terms, phrases and groups and logical operators, e.g. `$search=term AND NOT "phrase expression" OR (group expression)
- No working examples found, TripPin does not fail at least: https://services.odata.org/TripPinRESTierService/(S(ljgcbxqwp45c5l5m0h24kk1g))/People?$search=Female

### Questions
- Where to get a service that supports that?

### Proposal(s)
- Plain string for terms, phrase and group expressions
  ```ts
  .search('term')
  .search('"phrase expression"')
  .search('(group expression)')
  ```

  Conjunctions
  ```ts
  .search(and('term', 'otherterm')) // $search=term AND otherterm
  .search('term', 'otherterm') // $search=term AND otherterm
  .search(or('term', 'otherterm')) // $search=term OR otherterm
  .search(not('term')) // $search=NOT term
  .search(not('term', 'otherterm')) // $search=NOT (term AND otherterm)
  ```

# Additional Features aka. Nice to haves

## Lambda functions

### Proposal(s)

### Decision
- TBD


## Enum types
- Enumerations of constant values in OData
- EDMX example:
  ```xml
  <EnumType Name="PersonGender">
    <Member Name="Male" Value="0" />
    <Member Name="Female" Value="1" />
    <Member Name="Unknow" Value="2" />
  </EnumType>
  ```

### Proposal(s)
- Use enums
  ```ts
  enum PersonGender {
    Male = '0',
    Female = '1',
    Unknow = '2'
  }
  ```

### Decision
- TBD


## Actions
- Like Functions but can have side effects, while functions must not

### Proposal(s)
- Same approach as for functions
- Rename functions from function-imports to functions

### Decision
- TBD

## Other Featuers
- Singletons
- Bound Operations (actions and functions)
- Lambda expressions
