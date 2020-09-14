## Count Method on Entities

This ADR is about the `$count` method in OData.
In general it is very simple:

```
http://my-test-service/some-entity$count
```

returns the number of existing `some-entity` in the backend.
However, in `v4` and `v2` there are more things to consider:

###v4

Note that the spaces  are for readability of the examples only; in real URLs they must be percent-encoded as %20.

[v2 spec](https://www.odata.org/documentation/odata-version-2-0/uri-conventions/)
[v4 spec](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_AddressingtheCountofaCollection):

#### Common (v2 & v4)
- Using `count` on root entity: `http://host/service/Categories(1)/$count`
- Using `count` on a filtered list: `http://host/service/Products/$count?$filter=Price gt 5.00` 
or even with filter on navigation `http://host/service/Categories/$count?filter=Products/Price gt 5.00`
- Using `count` on navigation property: `http://host/service/Categories(1)/Products/$count`
or even with multiple navigations `http://host/service/Categories(1)/Products(2)/Items/$count`

#### v4 Only
- Using `count` as the condition for filter: `http://host/service/Categories?$filter=Products/$count gt 0`
 or even with a condition in the count `http://host/service/Categories?$filter=Products/$count($filter=Price gt 5.00) gt 2`
- Using `count` as the condition for oderBy `http://host/service/Categories?$orderby=Products/$count`

### API Proposals

Add a new `count()` request as `getAll()` and then `execute()` with destination infromation:

#### Basic case (v2 & v4)
```ts
const myCount:number = await TestEntity.requestBuilder().count().execute(destination)
```

#### Count with filter (v2 & v4)

```ts
const myCount:number = await TestEntity.requestBuilder().count().filter(myFilter).execute(destination)
```

#### Navigation (v2 & v4)
Here I propose a new object the `pathBuilder`.
This could become handy also for other features like create a navigation property to an already existing entity. 

```ts
const myPathToN:Path<TestEntity,TestEntityMultiLink[]> = TestEntity.pathBuilder().key(testEntityKey).toMultiLink.build();
const myPathTo1:Path<TestEntity,TestEntityMultiLink> = TestEntity.pathBuilder().key(testEntityKey).toMultiLink.key(multiLinkKey).build();

TestEntity.requestBuilder().count(myPathToN).execute(destination) //0..N
TestEntity.requestBuilder().count(myPathTo1).execute(destination) //0..1
```
#### Count inside a filter condition (v4)

Here I priopose a new lambda funciton like `any` or `and`:

```ts
TestEndtiy.requestBuilder().getAll().filter(
  count(
    TestEntity.TO_MULTI_LINK
  ).greaterOrEqual(2)
).execute(destination)
```

the nesting described above would look like:

```ts
TestEndtiy.requestBuilder().getAll().filter(
  count(
    TestEntity.TO_MULTI_LINK.filter(TestEntityMultiLink.BOOLEAN_PROPERTY.equals(true))
  ).greaterOrEqual(2))
.execute(destination)
```

#### Count with orderBy (v4)

the `count` lambda function should translate to a sortable type

```ts
TestEntity.requestBuilder().getAll().orderBy(                                             
  asc(count(TestEntity.TO_MULTI_LINK)))
.execute()
```
