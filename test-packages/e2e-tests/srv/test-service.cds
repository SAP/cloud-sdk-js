using { cloudsdk.test as cloudsdk } from '../db/schema';

@path : 'test-service'
service TestService {

  define type MyComplexReturnType {
    someMessage: String;
    someId: Integer;
  }

  entity TestEntity as projection on cloudsdk.TestEntity
    actions {
      function getStringProperty() returns String;

      function boundFunctionWithoutArguments() returns String;
      function boundFunctionWithoutArgumentsComplexReturnType() returns MyComplexReturnType;
      function boundFunctionWithArguments(param1:String, param2:String) returns String;

      action deleteEntity() returns Integer;

      action boundActionWithoutArguments() returns String;
    }
  entity TestEntityLink as projection on cloudsdk.TestEntityLink;

  entity TestEntityWithMultipleKeys as projection on cloudsdk.TestEntityWithMultipleKeys
  actions {
    function boundFunctionWithoutArgumentsWithMultipleKeys() returns String;
    function boundFunctionWithArgumentsWithMultipleKeys(param1:String, param2:String) returns String;

    action boundActionWithoutArgumentsWithMultipleKeys() returns String;
  }

  function returnSapCloudSdk() returns String;
  function concatStrings(Str1 : String, Str2 : String) returns String;
  function returnInt(param : Integer) returns Integer;
  function returnCollection(param : Integer) returns array of Integer;
  function getByKey(param : Integer) returns TestEntity;
  function getByKeyWithMultipleKeys(param1 : Integer, param2: String, param3: Boolean) returns TestEntityWithMultipleKeys;
  function getAll() returns array of TestEntity;
  function returnKey(param : TestEntity) returns Integer;

  action createTestEntityById(id : Integer) returns TestEntity;
  action createTestEntityByIdReturnId(id : Integer) returns Integer;
  action createTestEntityReturnId(param : TestEntity) returns Integer;

  entity TestEntity50Prop as projection on cloudsdk.TestEntity50Prop;
}
