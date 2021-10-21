import { secondsToTime, timeToSeconds } from '@sap-cloud-sdk/core';

describe('Time', () => {
  it('timeToSeconds throw error ', () => {
    const time = { hours: 1, minutes: 1, seconds: 1 };
    const actual = timeToSeconds(time);
    expect(actual).toBe(3661);
  });

  it('secondsToTime converts to a uniform time correctly', () => {
    const seconds = 3661;
    const actual = secondsToTime(seconds);
    expect(actual).toEqual({ hours: 1, minutes: 1, seconds: 1 });
  });
});
