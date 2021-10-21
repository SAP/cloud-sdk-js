export function throwErrorWhenReturnTypeIsUnionType(
  data: any,
  functionActionName: string
): never {
  throw new Error(
    `Failed to build an entity from the response of the function import or action import: ${functionActionName}, because the entity type of the return type is shared by multiple entity sets. Please use 'executeRaw' instead of 'execute' to get the raw response. Original response body: ${JSON.stringify(
      data
    )}.`
  );
}
