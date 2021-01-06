import { Temporal } from 'proposal-temporal';
import moment, { Moment } from 'moment';
import Duration = Temporal.Duration;
import PlainDate = Temporal.PlainDate;
import { EdmTypeMappingV4 } from './odata-v4';
import { EdmTypeMappingAll } from './odata-common';

export namespace temporalDeserializersNs {
  export const date = d => Temporal.PlainDate.from(d);
  export const duration = d => Temporal.Duration.from(d);
  export const all = {
    'Edm.Date': temporalDeserializersNs.date,
    'Edm.Duration': temporalDeserializersNs.duration
  };
}

interface deserializers {
  date?: any;
  duration?: any;
  all?: any;
}

export interface DateTime {
  'Edm.Date'?: any;
  'Edm.Duration'?: any;
  deserializers?: Partial<EdmTypeMappingAll>;
}

export class DateTimeDefault implements DateTime {
  // TODO
  'Edm.Date' = '';//Moment;
  'Edm.Duration' = '';//moment.Duration;
  deserializers = {};
}

export class DateTimeTemporal implements DateTime {
  'Edm.Date' = PlainDate;
  'Edm.Duration' = Duration;
  deserializers = {
    'Edm.Date': d => Temporal.PlainDate.from(d),
    'Edm.Duration': d => Temporal.Duration.from(d)
  };
}

export const dataTimeTemporal: DateTimeTemporal = new DateTimeTemporal();
