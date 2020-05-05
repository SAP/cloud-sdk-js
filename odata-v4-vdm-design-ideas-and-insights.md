# OData v4 VDM: Design Ideas and Insights

The code that I reference here can be found in [`odata-v4-vdm.ts`](./odata-v4-vdm.ts).
Not that "static helper" here refers to things like `BusinessPartner.BUSINESS_PARTNER` and is a language relic of how they're implemented in the Java SDK.
I haven't found a better term for them, so let me know if you have an idea.

## Insight: Making Entities Unique

I tried to find a more elegant way of expressing to which entity a given static helper belonged, but ultimately haven't found one.
So we still have to give every static helper a reference to the entity that it belongs to.
In the V2 VDM we used the static part of each entitiy (which is what we called `Constructable<EntityT>` as type), in my prototype I just used new instances every time (which *might* lead to memory issues, something static would be preferrable here if possible).

The reason for this is, as so often, structural typing.
Two classes that have different names but the exact same properties are treated as the same type in TypeScript.
Therefore, we need each entity to be structurally unique, which we achieve means of their actual properties.
Note, though, that if there were two entities in two different services that have the exact same properties, you could use them incorrectly without tsc complaining about it (but the request would most likely fail at runtime).
However, chances for this happening are pretty slim, therefore we can safely treat this as out of scope.

## Decomposition of Static Helpers

In the v2 VDM, we made heavy use of inheritance to model some of the static helpers.
For example, there is a class `Field` that implements `EntityIdentifiable`.
`Field` is then extended by `EdmTypeField`, which is again extended by js-type-specific fields like `StringFieldBase` or `NumberFieldBase`.
These are then again extended by either `StringField` or `ComplexTypeStringPropertyField`.
And then `StringField` also implements `SelectablEdmTypeField`.
So if you just try to understand `StringField`, you have to keep the whole enchilada in your head.
And this is ignoring generics here...

I'm confident that instead of making use of inheritance here, composing interfaces will lead to code that is easier to understand, easier to maintain and easier to extend in the future.
To keep the example of `StringField`, the same could be expressed like this:

```ts
interface Selectable {
  selectable: true;
}

interface Field {
  fieldName: string;
  fieldEdmType: string;
  // generic for js type?
}

interface Filterable<FieldT extends FieldType> {
  equals: (arg: FieldT) => Filter<FieldT>;
}

interface EntityIdentifier<EntityT extends Entity> {
  entity: EntityT;
}

type StringField<EntityT extends Entity> = Selectable & Field & Filterable<string> & EntityIdentifier<EntityT>; // & Order 
```

Of course, understanding `StringField` in its entirety still requires understanding all of the interfaces, but a) using interface composition makes sure that the parts are independent from one another and b) most likeley you'll only need to "load" a subset of the capabilities into your "brain memory", depending on what you're working on.

As always, there are trade-offs here.
Since interfaces don't allow sharing implementation, we have to write the same code mulitple times, since `StringField` needs to implement `Filterable<string>`, and `NumberField` needs to implement `Filterable<number>`, and `BooleanField` needs to ... (you get the idea).

This can be circumvented by using what I believe are called *mixins* in the functional programming world. 
Consider the following code snippet:

```ts
function defaultFilterable<FieldT extends FieldType>(dummy: FieldT, fieldName: string): Filterable<FieldT> {
  return {
    equals: (arg: FieldT) => ({
      fieldName,
      operator: 'eq',
      value: arg
    })
  }
}

function constructField<FieldT extends FieldType>(dummy: FieldT, fieldName: string): Filterable<FieldT> & Selectable {
  return {
    ...defaultFilterable(dummy, fieldName),
    selectable: true
  }
}

const MY_STRING_FIELD = constructField('dummy', 'MyStringField');
MY_STRING_FIELD.equals('huh') // I have no idea why this does not work, TypeScript treats 'dummy' as the actualy type here, though I just wanted to narrow `FieldT` to `string`
const MY_STRING_FIELD_2 = constructField<string>("shouldn't matter now", 'MyStringField2');
MY_STRING_FIELD_2.equals('huh') // but then again I did not know you could call functions with epxlicit generics (though it kind of makes sense, if you think about it)
// when using an explicit generic we obviously don't need the dummy param anymore, but I was too lazy to duplicate the functions
```

This solves the problem of code duplication.
However, this will probably cause confusion in the documentation, since we're mentally treating the resulting objects as classes with methods, but typedoc treats them as object with properties instead.
As we (I...) discovered in the past when experimenting with "functional class", this makes it hard to communicate stuff like deprecation, since `@deprecated` does not work on properties of objects.

The whole thing is a pick-two type of deal between code maintainability, code duplication and documentation quality.
We need make a trade-off, but we should do so deliberately and explicitly.

## Representations of OData Requests (and the CAP/CQN Use Case)

This is a comparatively minor issue, but getting this "right" in the beginning may save us some trouble down the road.
The reason I'm bringing this up is that there's this "latent requirement" by the CAP team to take their representation of a request (which is [CQN](https://cap.cloud.sap/docs/cds/cqn)) and somehow transform it into a request that can be executed by our code underlying the VDM, so that they can reuse stuff like integration with the destination service and eTag and csrf handling.
Having this kind of interop is especially useful when the service exposed your CAP app is a composition of e.g. an OData service (for which VDM code exists) and data from local persistence, so the whole thing makes a lot of sense to me.
Unfortunately, it's not straight-forward to implement, regardless of what I'm proposing here.

In the v2 VDM, there is the `ODataRequestConfig` that the request builders save all their state to.
This `ODataRequestConfig` is then passed together with a `Destination` to the `ODataRequest` class that takes care of transforming the whole thing into an HTTP request, executing it (and then IIRC the request builders are responsible for transforming the response back to instances of the respective `Entity` classes).

What I have in mind is conceptually similar, but a little more separated and with more explicit intermediate steps, in the hope that other people find it more easy to reuse parts of that request pipeline later on.
What follows is a lot of code, but bear with me.
The high level summary goes like this:
Starting from the request builder, we first have a representation of a request that uses object from the VDM domain model.
Ultimately, we somehow need to transform this into an HTTP request.
This mainly comprises three steps:
1. Transforming all of the property references to generic representations (e.g. `StringField('MyStringField', ...)` to `MyStringField`)
1. Transforming all the values of said properties to generic representations (e.g. `moment` to some generic representation)
1. Transforming this generic structured representation to flat strings (which is probably 90% of the work of build the HTTP request, at least for query scenarios)

Following the code should make this more clear, I hope.
I straight copied the code from the actual `.ts` file.
Not that there's the added advantage of sharing some interfaces between v2 and v4.

```ts
type FilterThing = Filter<?> | FilterLink<?,?> | FilterExpression
// and then there's also FilterLink and FilterList
// FilterLink is a thing that needs to be considered
interface FilterLink<EntityT extends Entity, LinkedEntityT extends Entity> {
  link: JLink<EntityT, LinkedEntityT>;
  actualFilter: FilterThing; // recursion, so we can get from 
}
// FilterList I'd hazard a guess could also be replaced by an array of something...

interface FilterExpression {
  lhs: FilterThing,
  rhs: FilterThing,
  operator: BooleanOperator
}

type BooleanOperator = 'and' | 'or' // does OData support stuff like 'nand', 'xor', ...? 

interface Filters {
  filters: Array<FilterThing>;
}

// for v2 we allow fields + links
interface V2Selects<EntityT extends Entity> {
  selects: Array<Field & EntityIdentifier<EntityT> | Link<EntityT,?>>;
}

// for v4 we only allow fields
// this also means that collectionFields cannot extend Field, I guess?
interface V4Selects<EntityT extends Entity> {
  selects: Array<Field & EntityIdentifier<EntityT>>;
}

type OrderDirection = 'asc' | 'desc';

interface Order<EntityT extends Entity> {
  by: Field & EntityIdentifier<EntityT>
  direction: OrderDirection
}

interface Orders<EntityT extends Entity> {
  orders: Array<Order<EntityT>>;
}

interface Expands<T extends Entity> {
  expands: Array<JLink<T,?>>; // depending on the implementation of course
}

interface Top {
  top: number;
}

interface Skip {
  skip: number;
}

interface Search {
  search: string;
}

interface Count {
  count: boolean;
  // count seems to be something that will be performed in addition to the normal get, not in its stead. 
  // also count seems to be part of the path, not the params...
}


interface GenericODataRequest {
  method: Method;
  entityName: string;
  serviceName: string;
  servicePath: string;
  customHeaders?: any;
  customParameters?: any;
}

interface ReadRequest {
  // ?
}

interface WriteRequest {
  payload: any;
  versionIdentifier: string;
}

type V2GetAllQuery<EntityT extends Entity> = Filters & V2Selects<EntityT> & Orders<EntityT> & Top & Skip;
type V4GetAllQuery<EntityT extends Entity> = Filters & V4Selects<EntityT> & Expands<EntityT> & Orders<EntityT> & Top & Skip & Search & Count;
type V2GetAllRequest<EntityT extends Entity> = GenericODataRequest & V2GetAllQuery<EntityT>;
type V4GetAllRequest<EntityT extends Entity> = GenericODataRequest & V4GetAllQuery<EntityT>;

// this is probably the representation closest to the VDM Domain
const v4query: V4GetAllQuery<V4TestEntity> = {
  selects: [V4TestEntityModel.STRING_FIELD],
  filters: [
    {
      fieldName: 'whatever',
      value: 'whatever',
      operator: 'eq'
    },
    {
      link: V4TestEntityModel.TO_TEST_ENTITY_J_LINK, // yeah yeah whatever
      actualFilter: {
        fieldName: 'whatever',
        value: 'whatever',
        operator: 'eq'
      }
    }
  ],
  expands: [V4TestEntityModel.TO_TEST_ENTITY_J_LINK], // recursive
  orders: [{ by: V4TestEntityModel.STRING_FIELD, direction: 'desc' }],
  count: false,
  search: '', // are there proper default values for search, skip and top? otherwise we'll probably have to make them optional
  skip: 0,
  top: -1
}

// and now you need to transform this thing step by step to an HttpRequest

// so one step is definitely transforming all the VDM property representations into string representations (e.g. `V4TestEntityModel.STRING_FIELD` to `'StringField'`
// the other thing is transforming all the values. For example, if there's a filter on a date field here, do we represent that value here as `moment` object or as string?
// also do we still need moment?
// the other thing to think about here is that each Edm data type has two representations, one for the uri format and for the payload format.
// if we know already here which one we need (i.e. there are no cases in which we don't know for every property in this object which representation we need down the road), we could already transform it here. otherwise obviously not.
const lessVDMishV4GetAllQuery = {
  selects: ['StringField'],
  filter: [
    {
      fieldName: 'whatever',
      value: 'whatever',
      operator: 'eq'
    },
    {
      fieldName: 'JLink/whatever',
      value: 'whatever',
      operator: 'eq'
    }
  ],
  expands: [{ // again recursive
    to: 'TestEntityLink',
    selects: [],
    filters: []
  }],
  orders: [{
    by: 'StringField',
    direction: 'desc'
  }],
  count: false,
  search: '',
  skip: 0,
  top: -1
}

// and then finally transforming that into an HttpRequest should be fairly straight-forward
// I omitted the non-query parts beforehand, but there shouldn't be any surprises here I hope

const httpV4GetAllRequest: HttpRequest = {
  url: '/sap/opu/odata/sap/API_TEST_SRV/TestEntity',
  method: 'get',
  body: null,
  headers: {},
  params: {
    '$format': 'json',
    '$select': 'StringField',
    '$expand': 'TestEntityLink',
    '$orderby': 'StringField desc',
    '$filter': "whatever eq 'whatever' and JLink/whatever eq 'whatever'"
    // and so on
  }
}

// and now we can pass this thing to an ODataRequestExecutor or something that makes some decisions about eTag and csrf and stuff but under the hood again delegates to the generic http client
// and then of course we still need to perform all of the transformation back, put in some thing that holds the entitie's data + eTag + last known remote state etc., but that should be analogous to v2
// except we might need one step in between for the CQN use case
type Method = 'get' | 'post'; // and so on
interface HttpRequest {
  url: string;
  // => that's the service path + the entity name
  // the baseUrl will come from the destination
  method: Method;
  // duh
  body: any;
  // duh
  headers: any;
  // etag + custom headers
  params: any;
  // => query + $format=json (for which there does not yet exist an interface for)
}
```

## `expand` API Design

While most of the RequestBuilder's API stays the same as in v2, `expand` needs to be implemented from scratch.
Making expand type safe is the biggest challenge, in my mind.

The mental model I use is that of an entity graph (which is consistent with the mental model of how expand was implemented in v2 and in the Java SDK).
Suppose all entities in one service are nodes in a directed graph, there is an edge from entity `A` to entity `B` iff `A` has a navigation property to `B`.

Based on this model, making the API type safe means finding representation of these edges, i.e. there must be objects that know both sides of the relation.
Then, the API can limit the accepted input to all edges whose starting point is the entity that the request is built on.

In my prototype, I tested four different implementation.

### 1: `LinkedRequestBuilder`

```ts
class V4GetAllRequestBuilder<EntityT extends Entity> {

  expand<LinkedEntityT extends Entity>(...expands: LinkedRequestBuilder<LinkedEntityT, EntityT>[]): this {
    return this;
  }

}

class LinkedRequestBuilder<EntityT extends Entity, ParentEntityT extends Entity> extends V4GetAllRequestBuilder<EntityT> {
  constructor(entity: EntityT, public parentEntity: ParentEntityT) {
    super(entity);
  }
}

requestBuilder
  .expand(
    V4TestEntityModel.TO_TEST_ENTITY_LINK
      .query() // note the extra call here
      .select(V4TestEntityLinkModel.STRING_FIELD)
      .filter(V4TestEntityLinkModel.STRING_FIELD.equals('value'))
  )
```

While this approach works, it means either having to perform the extra `query()` call or, to get rid of it, making the static helpers that represent navigation properties the `LinkedRequestBuilders`.
Solving the reuse of the query builder code by inheritance introduces two problems:
First, the normal request builder cannot be evolved independently.
Second, it introduces a cyclic dependency between the super- and the subclass, which may cause funky and hard to diagnose problems.

### 2: The Callback Approach

```ts
class V4GetAllRequestBuilder<EntityT extends Entity> {

  expand2(...expands: Link2<EntityT,?>[]): this { // turns out you actually don't need the second generic, since we can just ? it
    return this;
  }

}

// NavProp2 is composed into Link2, hence the missing generic here
interface NavProp2<LinkedEntityT extends Entity> {
  query: (fn: (arg: V4GetAllRequestBuilder<LinkedEntityT>) => V4GetAllRequestBuilder<LinkedEntityT>) => this;
}

requestBuilder()
  .expand2(
    V4TestEntityModel.TO_TEST_ENTITY_LINK_2
      .query(requestBuilder =>
        requestBuilder
          .select(V4TestEntityLinkModel.STRING_FIELD)
          .filter(V4TestEntityLinkModel.STRING_FIELD.equals('Still Chuck Testa'))
      )
  )
```

It works, concerns are neatly seperated, but the API is rather clunky in my opinion and the `NavProp2` interface is a little more on the galaxy brain side.

### 3: The GraphType Approach

```ts
class V4GetAllRequestBuilder<EntityT extends Entity> {

  expand3<LinkedEntityT extends EntityGraph<EntityT>>(...things: V4GetAllRequestBuilder<LinkedEntityT>[]): this {
    return this;
  }

}

// type version of an adjacency list representing the entity graph of a given service
type EntityGraph<EntityT extends Entity> =
  EntityT extends V4TestEntity ? (V4TestEntityLink) :
  EntityT extends V4TestEntity2 ? (V4TestEntity2Link | V4TestEntity2MultiLink) :
  any;

requestBuilder
  .expand3(
    new V4GetAllRequestBuilder(new V4TestEntity2Link())
      .select()
      .filter(),
    new V4GetAllRequestBuilder(new V4TestEntity2MultiLink()) // => DOES NOT COMPILE
      .select()
      .filter()
  )

requestBuilder
  .expand3(
    new V4GetAllRequestBuilder(new V4TestEntity2Link())
      .select()
      .filter()
  )
  .expand3( // => DOES COMPILE! note the second call to `expand3` here
    new V4GetAllRequestBuilder(new V4TestEntity2MultiLink())
      .select()
      .filter()
  )
```

I find this approach satisfying from a type perspective, since the type is a one to one mapping of my mental model.
However, having to call the expand function multiple times is inconsistent with how the rest of the API works and probably not very intuitive.
Also note that I created the request builders directly in this code snippet, in reality, we'd still probably like to have something like:

```ts
requestBuilder
  .expand3(
    V4TestEntity.TO_V4_TEST_ENTITY_LINK
      .select()
      .filter()
  )
  .expand3(
    V4TestEntity.TO_V4_TEST_ENTITY_MULTI_LINK
      .select()
      .filter()
  )
```

So we'd still have to solve the code reuse problem between the normal request builder and the static helper.

### 4: The Java SDK Approach

This is inspired by how the Java SDK does it.
This approach is actually very similar to approach one, but addresses the code reuse problem.

```ts
class V4GetAllRequestBuilder<EntityT extends Entity> {

  expandJ(...things: JLink<EntityT,?>[]): this {
    return this;
  }

}

type JLink<EntityT extends Entity, LinkedEntityT extends Entity> = Field & EntityIdentifier<EntityT> & JNavigationProperty<EntityT, LinkedEntityT>;

interface JNavigationProperty<EntityT extends Entity, LinkedEntityT extends Entity> {
  select: () => this; // I was lazy and skipped slotting in the correct types with correct generics here
  filter: () => this;
  expand: () => this;
  // and so on, basically this is the same interface as the query builder, so it should be possible to extract that into a common interface
}

requestBuilder
  .expandJ(
    V4TestEntityModel.TO_TEST_ENTITY_J_LINK
      .select(/* ... */)
      .expand(/* ... */)
  )
```

### Comparison

I find the drawbacks of approaches 1 and 3 too much, for my personal taste.
2 is probably easy to implement, but I prefer the API of 4, so that's what I would try and then re-open the discussion if there are unforeseen problems (though it also works in the Java SDK, so it shouldn't be that much of a problem in the JS SDK).

## Minor Points

### Document Design Decisions!

Since we're now going over the whole design, basically, I'd heavily encourage documenting some of the design decisions.
We completely missed that for the v2 VDM, and there are certain things in the code that still don't make sense to me just by looking at it.
This is good opportunity to avoid making the same mistake again.

### `_keys`

This is actually an example of the point I just mentioned.
Everytime I look at this function, I first don't get what it does and why it's needed, and as soon as I found it, I don't get why it is there (and not in a different place).

### Get Rid of the `EntityTypeForceMandatory` Type and Optional Properties

Initially we added one interface for each entity, `EntityType`, that only listed the properties of each entity (in the VDM representation, i.e. lower case names and JS types).
However, we also made the decision to mark those properties as optional (i.e. `property?: type;`) that are marked as `sap:nullable=true` in the edmx file.

This, in my opinion, is a mistake and we should not repeat this in the V4 VDM.
The semantics of `sap:nullable` and TypeScript's optional are different. 
As far as I understand, `sap:nullable` means that you cannot write `null` values for a property.
I'm not even sure if it enforces that entities are created with values for non-nullable properties in the first place.
However, suppose you run a query and select a single property.
In TypeScript land that still means that even though the key properties are not optional, there still is no value for them, which violates the type signature.

The second problem is that the entityBuilders for each entity are dynamically generated from the class that implement these types and are typed with these interfaces.
Due to some properties being optional, this has led to bugs in the past where some of the builder's methods where either missing entirely or were present but the type signature claimed otherwise, rendering them uncallable without forcing tsc to ignore the mismatch between type and reality.
We eventually introduced the `EntityTypeForceMandatory` interface to get rid of this problem.

Now I don't know what the best solution here is, but I'm confident that there are better ways to deal with the problem.
Personally, I'd at least accept that optional != nullable and don't make any properties optional. 

### Do We Need `extends Entity`? Everyhwere?

We're using generics like `EntityT extends Entity` everywhere, but from a pure type level, I have found very level use for that in the prototype.
Therefore, I'm questioning whether we actually need this in our design, or whether this is purely used to communicate to users "look, if you want to extend the VDM manually, you need something that extends `Entity`".
If the latter is the reason, I think we can scrap that.
I haven't heard of a single user that has ever extended the VDM like this, especially given that the generator can be used.
Of course, this argument is a little flawed, since just because I haven't heard of them doesn't mean they don't exist, but that doesn't make the assumption that they do exist any more realistic.

### Can We Get Rid of `moment.js`?

Or alternatively: can we somehow completely rely on builtin types or compositions thereof.
Not having any third party deps here would help us in extensibility for others and overall package size, which will probably become relevant for serverless use cases.
