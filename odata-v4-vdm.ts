
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

class V4GetAllRequestBuilder<EntityT extends Entity> {
  private request: Partial<V4GetAllQuery<EntityT>> = {}

  constructor(public entity: EntityT) { }

  select(...selects: Array<Selectable & EntityIdentifier<EntityT>>): this {
    return this;
  }

  filter(...filters: Filter<?>[]): this { // here we actually need an array of things that are either just Filters (i.e. data containers) or FilterExpressions
    return this;
  }

  // order(...orders: Orderable): this { // orders is not the best name. Also Xable is technically not the best name, since we're not talking about things that we can perform the operation but rather arguments to perform the operation on the entity with
  //   return this;
  // }

  expand<LinkedEntityT extends Entity>(...expands: LinkedRequestBuilder<LinkedEntityT, EntityT>[]): this { // wait... so we expect as argument a class that extends "us"? that's a circular dependency I think? Unless we keep it in the same file maybe?
    return this;
  }

  expand2(...expands: Link2<EntityT,?>[]): this { // turns out you actually don't need the second generic, since we can just ? it
    return this;
  }

  expand3<LinkedEntityT extends EntityGraph<EntityT>>(...things: V4GetAllRequestBuilder<LinkedEntityT>[]): this {
    return this;
  }

  expandJ(...things: JLink<EntityT,?>[]): this {
    return this;
  }

  top(top: number): this {
    return this;
  }

  skip(skip: number): this {
    return this;
  }

  search(searchPattern: string): this {
    return this;
  }

  count(): this { // count?
    return this;
  }

  customHeaders(customHeaders: any): this {
    return this;
  }

  customParameter(customParameters: any): this {
    return this;
  }

  build(): V4GetAllRequest<EntityT> {
    return {
      // ...defaultRequest, // if I had one
      ...this.request
    }
  }

  execute(destination): EntityT {
    const vdmReq = this.build();
    // everything after are things that should not need any state anymore, execute here is just the convenience thing
    const genericReq = transformRefsAndVals(vmdReq);
    const httpReq = transformToHttpReq(genericReq);
    const httpResp = executeOdataRequest(httpReq, destination);
    const genericOdataResp = transformToGenericOdataResponse(httpResp);
    const vdmEntity: EntityT = buildEntity(genericOdataResp, this.entity); // static vs. dynamic might become interesting here
    return vdmEntity;
  }
}

class LinkedRequestBuilder<EntityT extends Entity, ParentEntityT extends Entity> extends V4GetAllRequestBuilder<EntityT> {
  constructor(entity: EntityT, public parentEntity: ParentEntityT) {
    super(entity);
  }
}

interface Selectable {
  selectable: true;
}

interface Field {
  fieldName: string;
  fieldEdmType: string;
  // generic for js type?
}

type FieldType =
  | string
  | number
  | boolean
  // | Time // let's ignore these for a second
  // | Moment
  // | BigNumber
  // | null // also why do we need these?
  // | undefined
  ;

interface Filterable<FieldT extends FieldType> {
  equals: (arg: FieldT) => Filter<FieldT>; // the OG return type here is Filter<FieldT,EntityT>, which seems to be a simple data container
}

interface Filter<FieldT extends FieldType> {
  fieldName: string;
  value: FieldT;
  operator: string; // TODO: define operator type
}

type StringField<EntityT extends Entity> = Selectable & Field & Filterable<string> & EntityIdentifier<EntityT>;

abstract class Entity {
  entityName: string;
  serviceName: string;
  servicePath: string;
}

interface EntityIdentifier<EntityT extends Entity> {
  entity: EntityT;
}

// DUCKTYPING!!
// we need something that is structurally "unique" at runtime
// or, phrased differently: for the API to reject input from stuff that belongs to a different entity, that entity must structurally differ from the correct one
// extends Entity implements EntityType still seems like a reasonable way to achieve this
// in theory, you could also go implements Entity, EntityType (i.e. with two interfaces), but you need at least one class somewhere to get generics, since generics don't work with interfaces 
// do we actually need `extends Entity`? it makes sense if you want to restrict what people can use to extend from the outside, but nobody realistically does this anyway, right?
class V4TestEntity extends Entity implements TestEntityType {
  serviceName = 'TestService';
  servicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  entityName = 'TestEntity';
  stringField: string;
  toTestEntityLink: TestEntityLinkType;
}

interface TestEntityType {
  stringField: string;
  toTestEntityLink: TestEntityLinkType;
}

class V4TestEntityLink extends Entity implements TestEntityLinkType {
  serviceName = 'TestService';
  servicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  entityName = 'TestEntityLink';
  strungField: string;
}

interface TestEntityLinkType {
  strungField: string;
}

class V4TestEntity2 extends Entity implements TestEntity2Type {
  serviceName = 'TestService';
  servicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  entityName = 'TestEntity2';
  testEntity2 = 'jajaja';
}

interface TestEntity2Type {
  testEntity2: string;
}

class V4TestEntity2Link extends Entity implements TestEntity2LinkType {
  serviceName = 'TestService';
  servicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  entityName = 'TestEntity2Link';
  testEntity2Link = 'jajaja';
}

interface TestEntity2LinkType {
  testEntity2Link: string;
}

class V4TestEntity2MultiLink extends Entity implements TestEntity2MultiLinkType {
  serviceName = 'TestService';
  servicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  entityName = 'TestEntity2MultiLink';
  testEntity2MultiLink = 'jajaja';
}

interface TestEntity2MultiLinkType {
  testEntity2MultiLink: string;
}

// type version of an adjacency list representing the entity graph of a given service
type EntityGraph<EntityT extends Entity> =
  EntityT extends V4TestEntity ? (V4TestEntityLink) :
  EntityT extends V4TestEntity2 ? (V4TestEntity2Link | V4TestEntity2MultiLink) :
  any;

interface NavigationProperty<EntityT extends Entity, LinkedEntityT extends Entity> {
  // select: (...selects: Array<Selectable & EntityIdentifier<LinkedEntityT>>) => this; // return type?
  query: () => LinkedRequestBuilder<LinkedEntityT, EntityT>; // return type ?
}

interface NavProp2<LinkedEntityT extends Entity> {
  query2: (fn: (arg: V4GetAllRequestBuilder<LinkedEntityT>) => V4GetAllRequestBuilder<LinkedEntityT>) => this;
}

interface JNavigationProperty<EntityT extends Entity, LinkedEntityT extends Entity> {
  select: () => this;
  filter: () => this;
  expand: () => this;
  // and so on, basically this is the same interface as the query builder, so it should be possible to again extract that into a common interface
}

// TODO: filterable?
type Link<EntityT extends Entity, LinkedEntityT extends Entity> = Field & EntityIdentifier<EntityT> & NavigationProperty<EntityT, LinkedEntityT>;
type Link2<EntityT extends Entity, LinkedEntityT extends Entity> = Field & EntityIdentifier<EntityT> & NavProp2<LinkedEntityT>;
type JLink<EntityT extends Entity, LinkedEntityT extends Entity> = Field & EntityIdentifier<EntityT> & JNavigationProperty<EntityT, LinkedEntityT>;

namespace V4TestEntityModel {
  export const STRING_FIELD: StringField<V4TestEntity> = {
    selectable: true,
    fieldName: 'StringFieldArizona',
    fieldEdmType: 'Edm.String',
    entity: new V4TestEntity(),
    equals: (arg) => {
      return {
        fieldName: 'StringFieldArizona',
        value: arg,
        operator: 'eq'
      } as Filter<string>;
    }
  }

  export const TO_TEST_ENTITY_LINK: Link<V4TestEntity, V4TestEntityLink> = {
    fieldName: 'to_TestEntityLink',
    fieldEdmType: 'TestEntityLinkType', // the way it's called in the edmx? I guess? cross reference with v2
    entity: new V4TestEntity(),
    query: () => new LinkedRequestBuilder(new V4TestEntityLink(), new V4TestEntity())
  }

  export const TO_TEST_ENTITY_LINK_2: Link2<V4TestEntity, V4TestEntityLink> = {
    fieldName: 'to_TestEntityLink',
    fieldEdmType: 'TestEntityLinkType', // the way it's called in the edmx? I guess? cross reference with v2
    entity: new V4TestEntity(),
    query2: (fn: (arg: V4GetAllRequestBuilder<V4TestEntityLink>) => V4GetAllRequestBuilder<V4TestEntityLink>) => TO_TEST_ENTITY_LINK_2;
  }

  export const TO_TEST_ENTITY_J_LINK: JLink<V4TestEntity, V4TestEntityLink> = {
    fieldEdmType: 'TestEntityLinkType', // the way it's called in the edmx? I guess? cross reference with v2
    fieldName: 'to_TestEntityLink',
    entity: new V4TestEntity(),
    expand: () => TO_TEST_ENTITY_J_LINK,
    filter: () => TO_TEST_ENTITY_J_LINK,
    select: () => TO_TEST_ENTITY_J_LINK
  }
}

namespace V4TestEntityLinkModel {
  export const STRING_FIELD: StringField<V4TestEntityLink> = {
    selectable: true,
    fieldName: 'StringFieldArizona',
    fieldEdmType: 'Edm.String',
    entity: new V4TestEntityLink(),
    equals: (arg) => {
      return {
        fieldName: 'StringFieldArizona',
        value: arg,
        operator: 'eq'
      } as Filter<string>;
    }
  }
}


const requestBuilder: V4GetAllRequestBuilder<V4TestEntity> = new V4GetAllRequestBuilder(new V4TestEntity());

requestBuilder
  .select(V4TestEntityModel.STRING_FIELD)
  .filter(V4TestEntityModel.STRING_FIELD.equals('Chuck Testa'))
  .expand(
    V4TestEntityModel.TO_TEST_ENTITY_LINK
      .query()
      .select(V4TestEntityLinkModel.STRING_FIELD)
      .filter(V4TestEntityLinkModel.STRING_FIELD.equals('Still Chuck Testa'))
  )
  .expand2(
    V4TestEntityModel.TO_TEST_ENTITY_LINK_2
      .query2(requestBuilder =>
        requestBuilder
          .select(V4TestEntityLinkModel.STRING_FIELD)
          .filter(V4TestEntityLinkModel.STRING_FIELD.equals('Still Chuck Testa'))
      )
  )
  .expand3(
    new V4GetAllRequestBuilder(new V4TestEntityLink())
      .select()
      .filter(),
    new V4GetAllRequestBuilder(new V4TestEntity2())
      .select()
      .filter()
  )

// However - union types! if the type is determined once, it cannot be redetermined for the second param
// so you cannot use two different entities in the same expand call...
new V4GetAllRequestBuilder(new V4TestEntity2())
  .expand3(
    new V4GetAllRequestBuilder(new V4TestEntity2Link())
      .select()
      .filter(),
    new V4GetAllRequestBuilder(new V4TestEntity2MultiLink())
      .select()
      .filter()
  )
  .expand3(
    new V4GetAllRequestBuilder(new V4TestEntity2MultiLink())
      .select()
      .filter(),
    new V4GetAllRequestBuilder(new V4TestEntity2Link())
      .select()
      .filter()
  )

// ... but you can call it multiple times
new V4GetAllRequestBuilder(new V4TestEntity2())
  .expand3(
    new V4GetAllRequestBuilder(new V4TestEntity2Link())
      .select()
      .filter()
  )
  .expand3(
    new V4GetAllRequestBuilder(new V4TestEntity2MultiLink())
      .select()
      .filter()
  )

// constructing fields using strict composition will either cause a lot of duplication...
class NumberField implements Filterable<number> {
  equals(arg: number): Filter<number> {
    return {
      fieldName: 'number',
      operator: 'eq',
      value: arg
    };
  }
}

class BooleanField implements Filterable<boolean> {
  equals(arg: boolean): Filter<boolean> {
    return {
      fieldName: 'boolean',
      operator: 'eq',
      value: arg
    };
  }
}

// duplication can be avoided by using functional mixins
// but this might cause confusion in the documentation, since we're treating the resuling objects mentally as classes with methods, but typedoc treats them as object with properties instead // TODO: verify
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
MY_STRING_FIELD.equals('huh') // I have no idea why this does not work...
const MY_STRING_FIELD_2 = constructField<string>("shouldn't matter now", 'MyStringField2');
MY_STRING_FIELD_2.equals('huh') // but then again I did not know you could call functions with epxlicit generics (though it kind of makes sense, if you think about it)
// when using an explicit generic we obviously don't need the dummy param anymore, but I was too lazy to duplicate the functions

// the whole thing is a "pick two from three" between code flexibility/maintainability (composition over inheritance), code duplication (classes vs mixins) and properly rendered documentation (classes vs mixins)
// you can use classes + inheritance (like we do), which loses you flexibility and maintainability
// you can uses clases + interfaces, which bring you duplicated code
// or you can use mixins + interfaces, which loses you properly rendered documentation (though you might make an argument that something like StringField is maybe not what people are looking at the docs for)

// minor points:

// TODO: every time I look at this I'm wondering what the difference between _keyFields and _keys is
// I think _keys should be a function somewhere else that takes the model and the state container and then gives you the key of that instance (which is what is returned here)

// get rid of ForceMandatory type
// either generate the builders explicitly
// or just accept and document the fact that there's a mismatch between "nullable" in OData, "select" in OData and "optional" in TypeScript and just make the ForceMandatory the normal interface and get rid of the current normal one 
