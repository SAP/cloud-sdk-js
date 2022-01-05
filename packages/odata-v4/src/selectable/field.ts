import { FieldOptions as FieldOptionsCommon } from '@sap-cloud-sdk/odata-common/internal';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FieldOptions<
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends FieldOptionsCommon<NullableT, SelectableT>{};
