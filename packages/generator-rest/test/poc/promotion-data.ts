/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { ARTSCommonHeaderTypeActionCodeEnum, ARTSCommonHeaderTypeMessageTypeEnum, BusinessUnitCommonDataTypeCodeEnum, PriceCalculate, PriceCalculateBaseTransactionTypeEnum } from "./generated/calculation";

export const transaction: PriceCalculate = {
  ARTSHeader: {
    MessageID: {
      value: '7193039f-0ccb-4d24-b176-663c1c18b45a'
    },
    DateTime: [
      {
        value: '2019-09-02T12:45:56.000Z'
      }
    ],
    Requestor: 'R1',
    BusinessUnit: [
      {
        value: 'FC01',
        TypeCode: BusinessUnitCommonDataTypeCodeEnum.RetailStore
      }
    ],
    WorkstationID: {
      value: 'W1'
    },
    RequestedMultiLanguage: ['EN', 'DE'],
    MasterDataSourceSystemID: 'SAPCLNT000',
    ActionCode: ARTSCommonHeaderTypeActionCodeEnum.Calculate,
    MessageType: ARTSCommonHeaderTypeMessageTypeEnum.Request
  },
  PriceCalculateBody: [
    {
      TransactionID: {
        value: '78937893289'
      },
      DateTime: {
        value: '2270-01-13T04:48:30.000Z'
      },
      ShoppingBasket: {
        LineItem: [
          {
            Sale: {
              ItemID: [
                {
                  value: 'CHA2111002'
                }
              ],
              MerchandiseHierarchy: [
                {
                  value: 'CHA2111',
                  ID: '1'
                }
              ],
              Quantity: [
                {
                  value: 2,
                  Units: 1,
                  UnitOfMeasureCode: 'PCE'
                }
              ],
              ItemType: 'Stock'
            },
            SequenceNumber: [0]
          }
        ]
      },
      NetPriceFlag: false,
      TransactionType: PriceCalculateBaseTransactionTypeEnum.SaleTransaction
    }
  ],
  InternalMajorVersion: 3,
  InternalMinorVersion: 0
};
