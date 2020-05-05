/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  TestEntity,
  TestEntitySingleLink,
  TestEntityMultiLink,
  TestEntityLvl2MultiLink,
  TestEntityLvl2SingleLink
} from './test-services/v2/test-service';

describe('v4', () => {
  it('selects', () => {
    TestEntity.requestBuilder()
      .getAll()
      .select(
        TestEntity.STRING_PROPERTY,
        TestEntity.TO_SINGLE_LINK.select(TestEntitySingleLink.BOOLEAN_PROPERTY),
        TestEntity.TO_SINGLE_LINK.select(
          TestEntitySingleLink.TO_SINGLE_LINK.select(
            TestEntityLvl2SingleLink.BOOLEAN_PROPERTY
          )
        ),
        TestEntity.TO_SINGLE_LINK.select(
          TestEntitySingleLink.TO_MULTI_LINK.select(
            TestEntityLvl2MultiLink.BOOLEAN_PROPERTY
          )
        ),
        TestEntity.TO_MULTI_LINK.select(
          TestEntityMultiLink.TO_SINGLE_LINK.select(
            TestEntityLvl2SingleLink.STRING_PROPERTY
          )
        ),
        TestEntity.TO_MULTI_LINK.select(
          TestEntityMultiLink.TO_MULTI_LINK.select(
            TestEntityLvl2MultiLink.STRING_PROPERTY
          )
        )
      );
  });

  it('filters', () => {
    TestEntity.requestBuilder()
      .getAll()
      .filter(
        /* SHOULD WORK */
        /* simple property */
        TestEntity.STRING_PROPERTY.equals('test'),

        /* complex property */
        TestEntity.COMPLEX_TYPE_PROPERTY.booleanProperty.equals(true),

        /* single link filter */
        TestEntity.TO_SINGLE_LINK.filter(
          TestEntitySingleLink.BOOLEAN_PROPERTY.equals(true)
        ),

        /* single link single link filter */
        TestEntity.TO_SINGLE_LINK.filter(
          TestEntitySingleLink.TO_SINGLE_LINK.filter(
            TestEntityLvl2SingleLink.BOOLEAN_PROPERTY.equals(true)
          )
        )

        /* SHOULD NOT WORK */
        /* multi link filter */
        // TestEntity.TO_MULTI_LINK.filter(
        //   TestEntityMultiLink.BOOLEAN_PROPERTY.equals(true)
        // )
      );
  });
});
