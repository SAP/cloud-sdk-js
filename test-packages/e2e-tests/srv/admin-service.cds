using {my.namespace as my} from '../db/schema';

service AdminService @(requires_ : 'admin') {
  entity TestEntity     as projection on my.TestEntity;
  entity TestEntityLink as projection on my.TestEntityLink;
  function returnSapCloudSdk() returns String;
  function returnSapCloudSdk2(Int : Integer, Str : String) returns String;
  function returnInt(param : Integer) returns Integer;
  function getByKey(param : Integer) returns TestEntity;
  action createTestEntity(id : Integer) returns TestEntity;
  action createTestEntityReturnId(id : Integer) returns Integer;
}
