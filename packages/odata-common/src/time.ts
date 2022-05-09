/**
 * @internal
 */
export const durationRegexV2 =
  /PT(?<hours>\d{1,2}H)?(?<minutes>\d{1,2}M)?(?<seconds>\d{1,2}S)?/;

/**
 * @internal
 */
export const durationRegexV4 =
  /([+-]{1,1})?P(\d{1,2}D)?(T(\d{1,2}H)?(\d{1,2}M)?(\d{1,2}S)?(\d{2,2}\.\d+S)?)?/;

/**
 * Interface to represent Time or Duration.
 */
export interface Time {
  hours: number;
  minutes: number;
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
 * Converts from seconds to time as [[Time]].
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
