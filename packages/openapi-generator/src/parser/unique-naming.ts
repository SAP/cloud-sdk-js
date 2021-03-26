import { UniqueNameGenerator, camelCase } from '@sap-cloud-sdk/util';

/**
 * Ensure uniqueness of names.
 * Takes a list of items, identifies duplicate names and renames the duplicate names.
 * @param items List of items to rename.
 * @param getName Function to get the name of an item. Retrieves the `name` property by default.
 * @param setName Function to set the name of an item. Sets the name property by default.
 * @param formatName Function to transform the name when fining a unique name. Defaults to camel case.
 * @returns The given items with unique names.
 */
export function ensureUniqueNames<ItemT>(
  items: ItemT[],
  getName: (item: ItemT) => string = item => item['name'],
  setName: (item: ItemT, name: string) => void = (item, name) => {
    item['name'] = name;
  },
  formatName: (name: string) => string = name => camelCase(name)
): ItemT[] {
  const uniqueItems = getUniquelyNamedItems(items, getName);

  const nameGenerator = new UniqueNameGenerator(
    '',
    uniqueItems.map(item => getName(item))
  );

  const uniqueNames = uniqueItems.map(item => getName(item));
  return items.map(item => {
    const name = getName(item);
    if (uniqueNames.length && uniqueNames[0] === name) {
      uniqueNames.shift();
    } else {
      setName(item, nameGenerator.generateAndSaveUniqueName(formatName(name)));
    }
    return item;
  });
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
 * Get the items with unique names within a list of items.
 * @param items Named items.
 * @param getName Function to get the name of an item. Retrieves the `name` property by default.
 * @returns An object containing the unique operations, denoted by `unique` and operations with (potentially) duplicate names, denoted by `duplicate`.
 */
function getUniquelyNamedItems<ItemT>(
  items: ItemT[],
  getName: (item: ItemT) => string = item => item['name']
): ItemT[] {
  return items.reduce(
    (unique, item) =>
      !isDuplicateName(
        unique.map(uniqueItem => getName(uniqueItem)),
        getName(item)
      )
        ? [...unique, item]
        : unique,
    [] as ItemT[]
  );
}
