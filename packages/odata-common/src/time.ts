/**
 * @internal
 */
export const durationRegexV2 =
  /PT(?<hours>\d{1,2}H)?(?<minutes>\d{1,2}M)?(?<seconds>\d{1,2}S)?/;

/**
 * Spec see here https://www.w3.org/TR/xmlschema11-2/#nt-duDTFrag
 * Regex see here https://regex101.com/r/sxO6YO/1
 * Matches a spec compliant duration like -P5DT12H30M12.9S
 * @internal
 */
export const durationRegexV4 =
  /^([+-])?P(\d+D)?(T(\d+H)?(\d+M)?(\d+(\.\d+)?S)?)?$/;

/**
 * Interface to represent Time or Duration.
 */
export interface Time {
  /**
   * The number of hours.
   */
  hours: number;
  /**
   * The number of minutes.
   */
  minutes: number;
  /**
   * The number of seconds.
   */
  seconds: number;
}

/**
 * Converts the given time to seconds in positive numerical format.
 * @param time - Time to convert.
 * @returns number Time in seconds.
 * @internal
 */
export function timeToSeconds(time: Time): number {
  if (time) {
    return Math.floor(time.seconds + time.minutes * 60 + time.hours * 3600);
  }
  throw Error('The given time is not valid.');
}

/**
 * Converts from seconds to time as {@link Time}.
 * @param n - Number of seconds to convert (should be positive).
 * @returns Time The converted time from the given number of seconds
 * @internal
 */
export function secondsToTime(n: number): Time {
  if (n <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }
  const hours = Math.floor(n / 3600);
  const restFromHours = n % 3600;
  const minutes = Math.floor(restFromHours / 60);
  const seconds = restFromHours % 60;
  return { hours, minutes, seconds };
}
