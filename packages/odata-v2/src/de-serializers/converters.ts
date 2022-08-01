import moment from 'moment';
import { durationRegexV2 } from '@sap-cloud-sdk/odata-common/internal';
import { Time } from '@sap-cloud-sdk/odata-common';

/**
 * @internal
 */
export function deserializeToTime(value: string): Time {
  const regexResult = durationRegexV2.exec(value);
  if (!regexResult) {
    throw new Error(`Failed to parse the value: ${value} to time.`);
  }
  const { hours, minutes, seconds } = regexResult?.groups || {};

  return {
    hours: hours ? parseInt(hours.replace('H', ''), 10) : 0,
    minutes: minutes ? parseInt(minutes.replace('M', ''), 10) : 0,
    seconds: seconds ? parseInt(seconds.replace('S', ''), 10) : 0
  };
}

/**
 * @internal
 */
export function serializeFromTime(value: Time): string {
  return (
    'PT' +
    leftpad(value.hours, 2) +
    'H' +
    leftpad(value.minutes, 2) +
    'M' +
    leftpad(value.seconds, 2) +
    'S'
  );
}

/**
 * @internal
 * This function can be used for both Edm.DateTime and and Edm.DateTimeOffset.
 */
export function deserializeToMoment(edmDateTime: string): moment.Moment {
  const dateTimeOffsetComponents =
    /^\/Date\((?<signedticks>-{0,1}\d+)((?<offsetsign>[+-])(?<unsignedoffset>\d{4}))?\)\/$/.exec(
      edmDateTime
    )?.groups;
  if (!dateTimeOffsetComponents) {
    throw new Error(`Failed to parse edmDateTime: ${edmDateTime} to moment.`);
  }

  const timestamp = moment(parseInt(dateTimeOffsetComponents.signedticks));

  if (
    dateTimeOffsetComponents.offsetsign &&
    dateTimeOffsetComponents.unsignedoffset
  ) {
    const offsetMultiplier =
      dateTimeOffsetComponents.offsetsign === '+' ? 1 : -1;
    const offsetInMinutes = parseInt(dateTimeOffsetComponents.unsignedoffset);
    return timestamp.utc().utcOffset(offsetMultiplier * offsetInMinutes);
  }

  return timestamp;
}

/**
 * @internal
 * This function can be used for both Edm.DateTime and and Edm.DateTimeOffset.
 */
export function serializeFromMoment(momentInstance: moment.Moment): string {
  const timestamp = momentInstance.unix() * 1000;

  // For some reason isUtc() returns wrong values here, so we use the internal flag directly
  if (momentInstance['_isUTC']) {
    const offset = Math.abs(momentInstance.utcOffset());
    const operator = momentInstance.utcOffset() >= 0 ? '+' : '-';
    return `/Date(${timestamp}${operator}${leftpad(offset, 4)})/`;
  }

  return `/Date(${timestamp})/`;
}

function leftpad(value: any, targetLength: number): string {
  const str = value.toString();
  if (str.length >= targetLength) {
    return str;
  }
  return '0'.repeat(targetLength - str.length) + str;
}
