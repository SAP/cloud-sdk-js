using { my.namespace as my } from '../db/schema';
service AdminService @(requires_:'admin') {
  entity TestEntity as projection on my.TestEntity;
  entity TestEntityLink as projection on my.TestEntityLink;
}
