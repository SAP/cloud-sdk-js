import { UniqueNameGenerator, camelCase } from '@sap-cloud-sdk/util';

/**
 * Ensure uniqueness of names.
 * Takes a list of items, identifies duplicate names and renames the duplicate names.
 * @param items List of items to rename.
 * @param getName Function to get the name of an item. Retrieves the `name` property by default.
 * @param setName Function to set the name of an item. Sets the name property by default.
 * @param formatName Function to transform the name when fining a unique name. Defaults to camel case.
 * @returns The original parsing information with unique operation IDs.
 */
export function ensureUniqueNames<ItemT>(
  items: ItemT[],
  getName: (item: ItemT) => string = item => item['name'],
  setName: (item: ItemT, name: string) => void = (item, name) => {
    item['name'] = name;
  },
  formatName: (name: string) => string = name => camelCase(name)
): ItemT[] {
  const {
    unique: uniqueItems,
    duplicate: duplicateItems
  } = partitionNamedAndDuplicate(items, getName);

  const nameGenerator = new UniqueNameGenerator(
    '',
    uniqueItems.map(item => getName(item))
  );

  const renamedDuplicateItems = duplicateItems.map(item => {
    setName(
      item,
      nameGenerator.generateAndSaveUniqueName(formatName(getName(item)))
    );
    return item;
  });

  return [...uniqueItems, ...renamedDuplicateItems];
}

function isDuplicateName(uniqueNames: string[], name: string): boolean {
  return (
    // is already in unique names
    uniqueNames.includes(name) ||
    // differs when transformed to camel case - can potentially become duplicate
    camelCase(name) !== name
  );
}

/**
 * Partition items into an object with two lists - one conaining the items that have unique names and one containing the items that have duplicate or potentially duplicate names.
 * @param items Named items.
 * @param getName Function to get the name of an item. Retrieves the `name` property by default.
 * @returns An object containing the unique operations, denoted by `unique` and operations with (potentially) duplicate names, denoted by `duplicate`.
 */
function partitionNamedAndDuplicate<ItemT>(
  items: ItemT[],
  getName: (item: ItemT) => string = item => item['name']
): {
  unique: ItemT[];
  duplicate: ItemT[];
} {
  const unique: ItemT[] = [];
  const duplicate: ItemT[] = [];
  items.forEach(item => {
    if (
      isDuplicateName(
        unique.map(uniqueItem => getName(uniqueItem)),
        getName(item)
      )
    ) {
      duplicate.push(item);
    } else {
      unique.push(item);
    }
  });

  return { unique, duplicate };
}
