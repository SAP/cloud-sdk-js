import { Person } from './test-services/v4/trip-service/Person';

export function createPersonJson1() {
  return {
    UserName: 'user1',
    Emails: ['user1@example1.com', 'user1@example2.com']
  };
}

export function createPersonJson2() {
  return {
    UserName: 'user2',
    Emails: ['user2@example1.com', 'user2@example2.com']
  };
}

export function createPerson(originalData): Person {
  return Person.builder()
    .userName(originalData.UserName)
    .emails(originalData.Emails)
    .build()
    .setOrInitializeRemoteState();
}
