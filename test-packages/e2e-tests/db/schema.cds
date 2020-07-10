namespace my.namespace;

entity TestEntity {
  key KeyPropertyInt: Integer;
  key KeyPropertyString: String;
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
}
