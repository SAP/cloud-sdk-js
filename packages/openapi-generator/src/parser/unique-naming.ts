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
  getName: (item: ItemT) => string = getNameDefault,
  setName: (item: ItemT, name: string) => void = setNameDefault,
  formatName: (name: string) => string = camelCase
): ItemT[] {
  const uniqueItems = getCorrectlyNamedItems(items, getName, formatName);

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

/**
 * Get the items within a list of items that won't have to be renamed.
 * Those are the items that have a unique name and a name that does not have to be formatted.
 * @param items Named items.
 * @param getName Function to get the name of an item. Retrieves the `name` property by default.
 * @param formatName Function to transform the name when fining a unique name. Defaults to camel case.

 * @returns An object containing the unique operations, denoted by `unique` and operations with (potentially) duplicate names, denoted by `duplicate`.
 */
function getCorrectlyNamedItems<ItemT>(
  items: ItemT[],
  getName: (item: ItemT) => string = getNameDefault,
  formatName: (name: string) => string = camelCase
): ItemT[] {
  return items.reduce((uniqueItems, item) => {
    const name = getName(item);
    const isDuplicate = uniqueItems.some(
      uniqueItem => getName(uniqueItem) === name
    );
    const isFormatted = formatName(name) === name;
    if (isDuplicate || !isFormatted) {
      return uniqueItems;
    }
    return [...uniqueItems, item];
  }, [] as ItemT[]);
}

/**
 * Default function to access the name of an item.
 * @param item The item to get the name from.
 * @returns The name.
 */
export function getNameDefault<ItemT>(item: ItemT): string {
  return item['name'];
}

/**
 * Default function to set the name of an item.
 * @param item The item to set the name on.
 * @param name The name to set.
 */
export function setNameDefault<ItemT>(item: ItemT, name: string): void {
  item['name'] = name;
}
