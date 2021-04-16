import { UniqueNameGenerator, camelCase } from '@sap-cloud-sdk/util';

export function ensureUniqueNames<ItemT, UniqueItemT>(
  items: ItemT[],
  nameHandler: {
    getName?: (item: ItemT) => string;
    transformItem?: (item: ItemT, name: string) => UniqueItemT;
    formatName?: (name: string) => string;
    reservedWords?: string[];
  } = {}
): UniqueItemT[] {
  const {
    getName = getNameDefault,
    transformItem = transformItemDefault,
    formatName = camelCase,
    reservedWords = []
  } = nameHandler;

  const uniqueItems = getCorrectlyNamedItems(
    items,
    getName,
    formatName,
    reservedWords
  );

  const nameGenerator = new UniqueNameGenerator('', [
    ...reservedWords,
    ...uniqueItems.map(item => getName(item))
  ]);

  const uniqueNames = uniqueItems.map(item => getName(item));
  return items.map(item => {
    const name = getName(item);
    if (uniqueNames.length && uniqueNames[0] === name) {
      uniqueNames.shift();
      return transformItem(item, name);
    }
    return transformItem(
      item,
      nameGenerator.generateAndSaveUniqueName(formatName(name))
    );
  });
}

/**
 * Get the items within a list of items that won't have to be renamed.
 * Those are the items that have a unique name and a name that does not have to be formatted.
 * @param items Named items.
 * @param getName Function to get the name of an item.
 * @param formatName Function to transform the name when finding a unique name.
 * @param reservedWords Reserved words that should not be handled as duplicates.
 * @returns An object containing the unique operations, denoted by `unique` and operations with (potentially) duplicate names, denoted by `duplicate`.
 */
function getCorrectlyNamedItems<ItemT>(
  items: ItemT[],
  getName: (item: ItemT) => string,
  formatName: (name: string) => string,
  reservedWords: string[]
): ItemT[] {
  return items.reduce((uniqueItems, item) => {
    const name = getName(item);
    const isReserved = reservedWords.includes(name);
    const isDuplicate = uniqueItems.some(
      uniqueItem => getName(uniqueItem) === name
    );
    const isFormatted = formatName(name) === name;
    return isReserved || isDuplicate || !isFormatted
      ? uniqueItems
      : [...uniqueItems, item];
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
 * @returns The renamed item.
 */
export function transformItemDefault<
  ItemT,
  UniqueItemT = ItemT & { name: string }
>(item: ItemT, name: string): UniqueItemT {
  return ({
    ...item,
    name
  } as unknown) as UniqueItemT;
}
