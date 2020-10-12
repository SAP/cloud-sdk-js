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
  //Only Composition allow for deep create. Associations do not. The reason is that Composition are self-contained.
  //So a child entity can not exist without a parent.
  ToMultiLink: Composition of many TestEntityLink on KeyTestEntity=ToMultiLink.KeyToTestEntity;
};


