namespace my.namespace;

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
  //ToMultiLink: Association[0..*] to TestEntityLink on KeyTestEntity=ToMultiLink.KeyToTestEntity;
  ToMultiLink: Composition of many TestEntityLink on KeyTestEntity=ToMultiLink.KeyToTestEntity;
};


