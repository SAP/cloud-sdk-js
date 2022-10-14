import { ActionFunctionImportRequestBuilderBase } from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import {
  ODataBoundActionImportRequestConfig,
  ActionImportParameters
} from '../request';
import { createODataUri } from '../uri-conversion';

export class BoundActionRequestBuilder<
  DeSerializersT extends DeSerializers,
  ParametersT,
  ReturnT
> extends ActionFunctionImportRequestBuilderBase<
  ReturnT,
  ODataBoundActionImportRequestConfig<DeSerializersT, ParametersT>
> {
  constructor(
    defaultServicePath: string,
    entitySetName: string,
    entityQueryString: string,
    serviceClassName: string,
    actionImportName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters: ActionImportParameters<ParametersT>,
    deSerializers: DeSerializersT
  ) {
    super(
      responseTransformer,
      new ODataBoundActionImportRequestConfig(
        defaultServicePath,
        entitySetName,
        entityQueryString,
        serviceClassName,
        actionImportName,
        parameters,
        createODataUri(deSerializers)
      )
    );
  }
}
