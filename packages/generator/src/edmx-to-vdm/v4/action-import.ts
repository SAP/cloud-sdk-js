import { unixEOL, createLogger } from '@sap-cloud-sdk/util';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { swaggerDefinitionForFunctionImport } from '../../swagger-parser/swagger-parser';
import {
  EdmxAction,
  EdmxActionImport,
  parseActionImport,
  parseActions
} from '../../edmx-parser/v4';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import { VdmActionImport, VdmComplexType, VdmEntity } from '../../vdm-types';
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

export function generateActionImportsV4(
  serviceMetadata: ServiceMetadata,
  entities: VdmEntity[],
  complexTypes: Omit<VdmComplexType, 'factoryName'>[],
  formatter: ServiceNameFormatter
): VdmActionImport[] {
  const actions = parseActions(serviceMetadata.edmx.root);
  const actionImports = parseActionImport(serviceMetadata.edmx.root);

  const joinedFunctionData = joinActionImportData(actionImports, actions);
  return (
    joinedFunctionData
      // TODO 1571 remove when supporting entity type as parameter
      .filter(
        ({ action: edmxAction }) => !hasUnsupportedParameterTypes(edmxAction)
      )
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
            formatter
          ),
          httpMethod,
          returnType: parseActionImportReturnTypes(
            edmxAction.ReturnType,
            entities,
            complexTypes,
            extractResponse,
            serviceMetadata.edmx.oDataVersion
          )
        };
      })
  );
}
