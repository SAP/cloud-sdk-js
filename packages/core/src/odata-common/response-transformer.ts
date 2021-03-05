export function throwErrorWhenReturnTypeIsUnionType(
  data: any,
  functionActionName: string
) {
  // TODO 1677 ask the user to use executeRaw instead of execute when executeRaw is supported.
  throw new Error(
    `Failed to build an entity from the response of the function import or action import: ${functionActionName}, because the entity type of the return type is shared by multiple entity sets. Original data: ${data}.`
  );
}
