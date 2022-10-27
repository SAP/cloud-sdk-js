import { createLogger, unixEOL } from '@sap-cloud-sdk/util';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import { EdmxAction, EdmxActionImport } from '../../edmx-parser/v4/edm-types';
import {
  parseActionImport,
  parseActions
} from '../../edmx-parser/v4/edmx-parser';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { swaggerDefinitionForFunctionImport } from '../../swagger-parser';
import { VdmActionImport, VdmComplexType, VdmEntityInConstruction } from '../../vdm-types';
import { parseActionImportReturnTypes } from '../common/action-function-return-types';
import { transformActionImportBase } from '../common/action-import';
import { hasUnsupportedParameterTypes } from '../edmx-to-vdm-util';
import { findActionFunctionByImportName } from './action-function-util';

const logger = createLogger({
  package: 'generator',
  messageContext: 'action-import'
});

function findActionForActionImport(
  actions: EdmxAction[],
  actionImport: EdmxActionImport
): EdmxAction | undefined {
  return findActionFunctionByImportName(actions, actionImport.Action);
}

const extractResponse = (response: string) => `${response}.value`;

interface JoinedActionImportData {
  actionImport: EdmxActionImport;
  action: EdmxAction;
}

function joinActionImportData(
  actionImports: EdmxActionImport[],
  actions: EdmxAction[]
): JoinedActionImportData[] {
  const actionImportsWithoutActions: EdmxActionImport[] = [];
  const joinedActionImportData = actionImports.reduce(
    (joined, actionImport) => {
      const edmxAction = findActionForActionImport(actions, actionImport);

      if (edmxAction) {
        return [
          ...joined,
          {
            actionImport,
            action: edmxAction
          }
        ];
      }
      actionImportsWithoutActions.push(actionImport);
      return joined;
    },
    []
  );

  if (actionImportsWithoutActions.length) {
    logger.warn(
      `Could not find actions referenced by the following action imports. Skipping code generation: 
${actionImportsWithoutActions
  .map(f => `${f.Name} => ${f.Action}`)
  .join(`, ${unixEOL}`)}`
    );
  }

  return joinedActionImportData;
}

/**
 * @internal
 */
 export function filterActions(joinedFunctionData: JoinedActionImportData[], bindingEntitySetName?: string): JoinedActionImportData[] {
  if (bindingEntitySetName) {
    // filter 3 aspects: is bound?, is right bounding entity, has unsupported parameters
    return joinedFunctionData
      .filter(({ action: edmxAction }) => edmxAction.IsBound)
      .filter(({ action: edmxAction }) => edmxAction.Parameter.length > 0)
      .filter(({ action: edmxAction }) => edmxAction.Parameter[0].Type.endsWith(bindingEntitySetName)) //fixme this won't work if with TestEntity and FoobarTestEntity.. need to split at the .?
      .filter(
        ({ action: edmxAction }) =>
          !hasUnsupportedParameterTypes(edmxAction, bindingEntitySetName)
      );
  }
      // TODO 1571 remove when supporting entity type as parameter
  return joinedFunctionData.filter(
    ({ action: edmxAction }) =>
      !hasUnsupportedParameterTypes(edmxAction, bindingEntitySetName)
  );
}

/**
 * @internal
 */
export function generateActionImportsV4(
  serviceMetadata: ServiceMetadata,
  serviceName: string,
  entities: VdmEntityInConstruction[],
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter,
  bindingEntitySetName?: string
): VdmActionImport[] {
  const actions = parseActions(serviceMetadata.edmx.root);
  const actionImports = parseActionImport(serviceMetadata.edmx.root);

  const joinedFunctionData = joinActionImportData(actionImports, actions);
  const filteredJoinedFunctionData = filterActions(joinedFunctionData, bindingEntitySetName);

  return (
    filteredJoinedFunctionData
      .map(({ actionImport, action: edmxAction }) => {
        const httpMethod = 'post';
        const swaggerDefinition = swaggerDefinitionForFunctionImport(
          actionImport.Name,
          httpMethod,
          serviceMetadata.swagger
        );

        return {
          ...transformActionImportBase(
            actionImport,
            edmxAction.Parameter || [],
            swaggerDefinition,
            formatter,
            bindingEntitySetName
          ),
          httpMethod,
          returnType: parseActionImportReturnTypes(
            edmxAction.ReturnType,
            entities,
            complexTypes,
            extractResponse,
            serviceName
          )
        };
      })
  );
}
