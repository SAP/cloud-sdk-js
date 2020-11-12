using {cloudsdk.test as cloudsdk} from '../db/schema';

@path : 'test-service'
service TestService {
  entity TestEntity     as projection on cloudsdk.TestEntity;
  entity TestEntityLink as projection on cloudsdk.TestEntityLink;
  function returnSapCloudSdk() returns String;
  function returnSapCloudSdk2(Int : Integer, Str : String) returns String;
  function returnInt(param : Integer) returns Integer;
  function getByKey(param : Integer) returns TestEntity;
  action createTestEntity(id : Integer) returns TestEntity;
  action createTestEntityReturnId(id : Integer) returns Integer;
}
