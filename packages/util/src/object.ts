/**
 * Checks if a chain of properties exists on the given object.
 *
 * @param obj - The object to be checked.
 * @param properties - Chained properties.
 * @returns True if the property chain leads to a truthy value, false otherwise.
 */
export function propertyExists(
  obj: Record<string, any>,
  ...properties: string[]
): boolean {
  if (!properties.length) {
    return true;
  }
  if (obj && obj.hasOwnProperty(properties[0])) {
    return propertyExists(obj[properties[0]], ...properties.slice(1));
  }
  return false;
}



/**
 * Adds the value to the object if it is neither null nor undefined.
 * Note that this is different to JS idiomatic checks for truthy/falsy values, i.e. an empty string will result in key/value pairs beeing added.
 *
 * @param key - The key to associate with the given value.
 * @param value - The value to associate with the given key.
 * @param obj - The object on which to create the association.
 * @returns A copy of the input object with the new key-value pair if the value is neither null nor undefined.
 */
export const assocSome = <T>(key: string, value?: any) => (obj: T): T => {
  if (typeof value !== 'undefined' && value !== null) {
   return assoc(key,value,obj)
  }
  return {...obj};
};

/**
 * Merges the two object if second object is neither null nor undefined.
 * If a key exists on a and b the value from b is taken
 *  *
 * @param a - The object to merge into.
 * @param b - The object which to merge into a.
 * @returns A copy of the merge(a, b) or a if b is undefined or null.
 */
export const mergeSome = (a: Record<string, any>, b?: Record<string, any>) => {
  if (typeof b !== 'undefined' && b !== null) {
    return {...a,...b}
  }
  return a;
};

/**
 * Takes an object and returns a new object whose keys are renamed according to the provided key mapping.
 * Any keys in the input object not present in the key mapping will be present in the output object as-is.
 * If a key in the key mapping is not present in the input object, the output object will contain the key with value "undefined".
 *
 * @param keyMapping - An object mapping keys of the input object to keys of the output object.
 * @param obj - The input object.
 * @returns An object with renamed keys.
 */
export const renameKeys = (
  keyMapping: Record<string, string>,
  obj: Record<string, any>
): Record<string, any> => {
  const unchangedEntries = Object.keys(obj)
    .filter(k => !Object.keys(keyMapping).includes(k))
    .reduce((newObj, key) => ({ ...newObj, [key]: obj[key] }), {});
  return Object.entries(keyMapping).reduce(
    (newObj, [oldKey, newKey]) => ({ ...newObj, [newKey]: obj[oldKey] }),
    unchangedEntries
  );
};

export const pick = (keys:string[],object:Object):Object=>{
  const result = {}
  keys.forEach(key=>{
    const value = object[key]
    if(value){
      result[key] = value
    }
  })
  return result;
}

export const assoc = <T>(key:string,value:any,obj:T) =>{
  return {...obj,[key]:value}
}

export const flatten = (input:any)=> {
  const flatResult: any[] = [];
  const stack: any[] = [...input]

  while (stack.length > 0) {
    const current = stack.pop()
    if(!Array.isArray(current)){
      flatResult.push(current)
    }else {
      stack.push(...current)
    }
  }

  return flatResult.reverse()
}
