/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { asc, desc } from '../../src';
import {
  TestEntity,
  TestEntitySingleLink,
  TestEntityMultiLink,
  TestEntityLvl2MultiLink,
  TestEntityLvl2SingleLink
} from './test-services/v4/test-service';
// import { TestEntity as TestEntityV2 } from './test-services/v2/test-service';

// TODO: This file is for intermediate testing purposes only. It does not contain any actual tests and should be removed once our v4 support is not experimental anymore.
describe('v4', () => {
  it('selects', () => {
    TestEntity.customField('Peter').edmBoolean().equals(false);

    TestEntity.requestBuilder().getAll().select(
      /* SHOULD WORK */
      /* Property */
      TestEntity.STRING_PROPERTY,

      /* Complex Type Property */
      TestEntity.COMPLEX_TYPE_PROPERTY

      /* SHOULD MAYBE WORK */
      // TestEntity.COMPLEX_TYPE_PROPERTY.booleanProperty,

      /* SHOULD NOT WORK */
      /* any kind of link */
      // TestEntity.TO_SINGLE_LINK,
      // TestEntity.TO_MULTI_LINK,
      // TestEntity.TO_SINGLE_LINK.select(TestEntitySingleLink.BOOLEAN_PROPERTY),
      // TestEntity.TO_SINGLE_LINK.select(
      //   TestEntitySingleLink.TO_SINGLE_LINK.select(
      //     TestEntityLvl2SingleLink.BOOLEAN_PROPERTY
      //   )
      // ),
      // TestEntity.TO_SINGLE_LINK.select(
      //   TestEntitySingleLink.TO_MULTI_LINK.select(
      //     TestEntityLvl2SingleLink.BOOLEAN_PROPERTY
      //   )
      // ),
      // TestEntity.TO_MULTI_LINK.select(
      //   TestEntityMultiLink.TO_SINGLE_LINK.select(
      //     TestEntityLvl2MultiLink.STRING_PROPERTY
      //   )
      // ),
      // TestEntity.TO_MULTI_LINK.select(
      //   TestEntityMultiLink.TO_MULTI_LINK.select(
      //     TestEntityLvl2MultiLink.STRING_PROPERTY
      //   )
      // )
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

  it('expands', () => {
    TestEntity.requestBuilder()
      .getAll()
      .expand(
        /* SHOULD WORK */
        /* All Fields should work */
        TestEntity.ALL_FIELDS,

        /* Single Link should work */
        TestEntity.TO_SINGLE_LINK,

        /* Single Link select, expand should work */
        TestEntity.TO_SINGLE_LINK.select(
          TestEntitySingleLink.STRING_PROPERTY,
          TestEntitySingleLink.BOOLEAN_PROPERTY
        ).expand(TestEntitySingleLink.TO_SINGLE_LINK),
        /* Multi Link select, orderBy, filter, top, skip, expand should work */
        TestEntity.TO_MULTI_LINK.select(
          TestEntityMultiLink.STRING_PROPERTY,
          TestEntityMultiLink.BOOLEAN_PROPERTY
        )
          .orderBy(asc(TestEntityMultiLink.STRING_PROPERTY))
          .filter(TestEntityMultiLink.STRING_PROPERTY.equals('test'))
          .top(1)
          .skip(1)
          .expand(
            TestEntityMultiLink.TO_MULTI_LINK.select(
              TestEntityLvl2MultiLink.STRING_PROPERTY,
              TestEntityLvl2MultiLink.BOOLEAN_PROPERTY
            )
              .filter(TestEntityLvl2MultiLink.STRING_PROPERTY.equals('TEST'))
              .orderBy(desc(TestEntityLvl2MultiLink.STRING_PROPERTY))
          )

        /* SHOULD NOT WORK */
        /* Property should not work */
        // TestEntity.BOOLEAN_PROPERTY

        /* Single Link filter should not work */
        // TestEntity.TO_SINGLE_LINK.filter(
        //   TestEntitySingleLink.BOOLEAN_PROPERTY.equals(true)
        // ),

        /* Single Link oderBy should not work */
        // TestEntity.TO_SINGLE_LINK.orderBy(
        //   asc(TestEntitySingleLink.STRING_PROPERTY)
        // )
      )
      .filter(
        TestEntity.TO_SINGLE_LINK.filter(
          TestEntitySingleLink.BOOLEAN_PROPERTY.equals(true)
        )
      );
  });

  it('v2', () => {
    // TestEntity.requestBuilder().getAll().select(TestEntityV2.FLOAT_PROPERTY);
  });
});
