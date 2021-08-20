## Count Method on Entities

This ADR is about the `$count` method in OData.
In general, it is very simple:

```
http://my-test-service/some-entity$count
```

Returns the number of existing `some-entity` in the backend.
However, in `v4` and `v2` there are more things to consider.

[v2 spec](https://www.odata.org/documentation/odata-version-2-0/uri-conventions/) <br>
[v4 spec](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_AddressingtheCountofaCollection)

Note that the spaces are for readability of the examples only.
In real URLs they must be percent-encoded as %20.

#### Common (v2 & v4)

- Using `count` on root entity: `http://host/service/Categories/$count`
- Using `count` on a filtered list: `http://host/service/Products/$count?$filter=Price gt 5.00`
  or even with filter on navigation `http://host/service/Categories/$count?filter=Products/Price gt 5.00`
- Using `count` on navigation property: `http://host/service/Categories(1)/Products/$count`
  or even with multiple levels of navigation `http://host/service/Categories(1)/Products(2)/Items/$count`

#### v4 Only

- Using `count` as the condition for filter: `http://host/service/Categories?$filter=Products/$count gt 0`
  or even with a condition in the count `http://host/service/Categories?$filter=Products/$count($filter=Price gt 5.00) gt 2`
- Using `count` as the condition for oderBy `http://host/service/Categories?$orderby=Products/$count`

### Tests Sample Service

- We checked with the sample services and count is only possible on collection of entities.
- Count works with `skip` and `top` as expected.

### API Proposals

Add a new `count()` method inside the `getAll()` and then `execute()` with destination information:

#### A: Basic case (v2 & v4)

```ts
const myCount: number = await TestEntity.requestBuilder()
  .getAll()
  .count()
  .execute(destination);
```

The `count()` will return a `CountRequestBuilder` returning `Promise<number>` on execute.
It will not contain any methods like `filter,top...`.

#### B: Count with filter (v2 & v4)

Hence, if you want to call `count` with filter or top you have to call it last:

```ts
const myCount: number = await TestEntity.requestBuilder()
  .getAll()
  .filter(myFilter)
  .top(2)
  .count()
  .execute(destination);
```

#### C: Navigation (v2 & v4)

This item is not decided yet.
We will consider it later.
Possible solution approaches could be:

##### pathBuilder

This could become handy also for other features like create a navigation property to an already existing entity.

```ts
const myPathToN:Path<TestEntity,TestEntityMultiLink[]> = TestEntity.pathBuilder().key(testEntityKey).toMultiLink.build();
const myPathTo1:Path<TestEntity,TestEntityMultiLink> = TestEntity.pathBuilder().key(testEntityKey).toMultiLink.key(multiLinkKey).build();

TestEntity.requestBuilder().getAll(().count(myPathToN).execute(destination) //0..N
TestEntity.requestBuilder().getAll(().count(myPathTo1).execute(destination) //0..1
```

##### navTo

We use a `TestEntity.requestBuilder.getAll().navTo(someKey)` and this returns then a request builder of the navigation property.

#### D & E

The next two parts are separate from the `count()` method we used up to now.
The `count` is in the `filter` or `orderBy` scope and returns a number/orderable object.

#### D: Count inside a filter condition (v4)

We propose a new lambda function like `any` or `and`:

```ts
TestEntity.requestBuilder()
  .getAll()
  .filter(count(TestEntity.TO_MULTI_LINK).greaterOrEqual(2))
  .execute(destination);
```

the nesting described above would look like:

```ts
TestEntity.requestBuilder()
  .getAll()
  .filter(
    count(
      TestEntity.TO_MULTI_LINK.filter(
        TestEntityMultiLink.BOOLEAN_PROPERTY.equals(true)
      )
    ).greaterOrEqual(2)
  )
  .execute(destination);
```

#### E: Count with orderBy (v4)

The `count` lambda function should also translate to a sortable type

```ts
TestEntity.requestBuilder()
  .getAll()
  .orderBy(asc(count(TestEntity.TO_MULTI_LINK)))
  .execute();
```

### Order of Implementation

- `A` and `B` initial scope
- `D` and `E` second issue

- `C` is the complicated case.
  We exclude for the moment and make a second ADR for it later.
  Ask the Java colleagues for their solution there.
