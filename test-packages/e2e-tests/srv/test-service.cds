using {cloudsdk.test as cloudsdk} from '../db/schema';

@path : 'test-service'
service TestService {
  entity TestEntity     as projection on cloudsdk.TestEntity;
  entity TestEntityLink as projection on cloudsdk.TestEntityLink;
  function returnSapCloudSdk() returns String;
  function concatStrings(Str1 : String, Str2 : String) returns String;
  function returnInt(param : Integer) returns Integer;
  function getByKey(param : Integer) returns TestEntity;
  action createTestEntity(id : Integer) returns TestEntity;
  action createTestEntityReturnId(id : Integer) returns Integer;
}
