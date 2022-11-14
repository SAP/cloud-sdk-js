namespace cloudsdk.test;

entity TestEntityLink{
  key KeyTestEntityLink: Integer;
  key KeyToTestEntity: Integer;
  StringProperty: String(111);
}

entity TestEntity {
  key KeyTestEntity: Integer;
  StringProperty: String(111);
  GuidProperty: UUID;
  BooleanProperty: Boolean;
  Int64Property: Integer64;
  DoubleProperty: Double;
  DecimalProperty: Decimal(9,2);
  DateProperty: Date;
  TimeOfDayProperty: Time;
  DataTimeOffsetDataTimeProperty: DateTime;
  DataTimeOffsetTimestampProperty: Timestamp;
  //Only Composition allow for deep create. Associations do not. The reason is that Composition are self-contained.
  //So a child entity can not exist without a parent.
  ToMultiLink: Composition of many TestEntityLink on KeyTestEntity=ToMultiLink.KeyToTestEntity;
};

entity TestEntityWithMultipleKeys {
  key KeyTestEntityWithMultipleKeys: Integer;
  key StringPropertyWithMultipleKeys: String(111);
  key BooleanPropertyWithMultipleKeys: Boolean;
}

entity TestEntity50Prop {
  key KeyTestEntity50Prop: Integer;
  StringProperty1: String(111);
  GuidProperty1: UUID;
  BooleanProperty1: Boolean;
  Int64Property1: Integer64;
  DoubleProperty1: Double;
  DecimalProperty1: Decimal(9,2);
  DateProperty1: Date;
  TimeOfDayProperty1: Time;
  DataTimeOffsetDataTimeProperty1: DateTime;
  DataTimeOffsetTimestampProperty1: Timestamp;
  StringProperty2: String(111);
  GuidProperty2: UUID;
  BooleanProperty2: Boolean;
  Int64Property2: Integer64;
  DoubleProperty2: Double;
  DecimalProperty2: Decimal(9,2);
  DateProperty2: Date;
  TimeOfDayProperty2: Time;
  DataTimeOffsetDataTimeProperty2: DateTime;
  DataTimeOffsetTimestampProperty2: Timestamp;
  StringProperty3: String(111);
  GuidProperty3: UUID;
  BooleanProperty3: Boolean;
  Int64Property3: Integer64;
  DoubleProperty3: Double;
  DecimalProperty3: Decimal(9,2);
  DateProperty3: Date;
  TimeOfDayProperty3: Time;
  DataTimeOffsetDataTimeProperty3: DateTime;
  DataTimeOffsetTimestampProperty3: Timestamp;
  StringProperty4: String(111);
  GuidProperty4: UUID;
  BooleanProperty4: Boolean;
  Int64Property4: Integer64;
  DoubleProperty4: Double;
  DecimalProperty4: Decimal(9,2);
  DateProperty4: Date;
  TimeOfDayProperty4: Time;
  DataTimeOffsetDataTimeProperty4: DateTime;
  DataTimeOffsetTimestampProperty4: Timestamp;
  StringProperty5: String(111);
  GuidProperty5: UUID;
  BooleanProperty5: Boolean;
  Int64Property5: Integer64;
  DoubleProperty5: Double;
  DecimalProperty5: Decimal(9,2);
  DateProperty5: Date;
  TimeOfDayProperty5: Time;
  DataTimeOffsetDataTimeProperty5: DateTime;
  DataTimeOffsetTimestampProperty5: Timestamp;
};

