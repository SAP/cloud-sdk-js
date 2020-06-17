type Separator = '-'|'_'
const MAXIMUM_NUMBER_OF_SUFFIX = 1000;

interface FindUniqueName{
  nameToCheckForUniqueness:string,
  relatedNamesBuilder?:(name:string)=>string[],
  alreadyUsedNames: string[]
}

interface UniqueName{
  uniqueName:string
  relatedUniqueNames:string[]
}

function getAllNames(name:FindUniqueName):string[]{
  const allNames = [name.nameToCheckForUniqueness]
  if(typeof name.relatedNamesBuilder !== 'undefined'){
    allNames.push(...name.relatedNamesBuilder(name.nameToCheckForUniqueness));
  }
  return allNames;
}

function castToUniqueName(findUniqueName:FindUniqueName):UniqueName{
  const name = findUniqueName.nameToCheckForUniqueness;
  return {
    uniqueName:name,
    relatedUniqueNames:findUniqueName.relatedNamesBuilder ? findUniqueName.relatedNamesBuilder(name) : []}
}

function isNameAndRelatedUnique(findUniqueName:FindUniqueName):boolean{
  const allNames = getAllNames(findUniqueName);

  return !allNames.some(name=>isNameAlreadyUsed(name,findUniqueName.alreadyUsedNames))
}

function isNameAlreadyUsed(nameToTest:string,alreadyUsedNames:string[]){
  return alreadyUsedNames.includes(nameToTest) ||
    reservedVdmKeywords.has(nameToTest) ||
    reservedObjectPrototypeKeywords.has(nameToTest)
}

function addSuffix(findName:FindUniqueName,suffix:number,separator:Separator):FindUniqueName{
  const nameWithoutSuffix = removeSuffixIfPresent(findName.nameToCheckForUniqueness,separator)
  return {
    ...findName,
    nameToCheckForUniqueness:`${nameWithoutSuffix}${separator}${suffix}`
  }
}

function removeSuffixIfPresent(name:string,separator:Separator){
  const nameSuffixRemoved = name.replace(new RegExp(`${separator}_\d+$`),separator)
  return nameSuffixRemoved;
}

function removeUnnecessaryUsedNames(findUniqueName:FindUniqueName,separator:Separator):FindUniqueName{
  const nameNoSuffix = removeSuffixIfPresent(findUniqueName.nameToCheckForUniqueness,separator);
  const relevantAlreadyUsedItems = findUniqueName.alreadyUsedNames.filter(name=>name.startsWith(nameNoSuffix))
  return{
    ...findUniqueName,
    alreadyUsedNames:relevantAlreadyUsedItems
  }
}

function prepareDataForSuffixSearch(findUniqueName:FindUniqueName,separator:Separator):FindUniqueName{
  const nameNoSuffix = removeSuffixIfPresent(findUniqueName.nameToCheckForUniqueness,separator);
  const relevantAlreadyUsedItems = findUniqueName.alreadyUsedNames.filter(name=>name.startsWith(nameNoSuffix))
  return{
    ...findUniqueName,
    nameToCheckForUniqueness:nameNoSuffix,
    alreadyUsedNames:relevantAlreadyUsedItems
  }
}

function getUniqueNameUsingSuffix(findUniqueName:FindUniqueName,separator:Separator):UniqueName{
  let suffix = 1;
  const prepared = prepareDataForSuffixSearch(findUniqueName,separator);
  //This allgorithm as order N**2 for N identical names. With a sort you could get it down to N*log(N)
  //However with the related items in mind this is much easier and N should be small.
  while(suffix < MAXIMUM_NUMBER_OF_SUFFIX){
    const newName = addSuffix(prepared,suffix,separator)
    if(isNameAndRelatedUnique(newName)){
      return castToUniqueName(newName)
    }
    suffix++;
  }
  throw new Error(`Unable to find a unique name for ${findUniqueName.nameToCheckForUniqueness} within the range of 1000 suffixes.`)
}

export function getUniqueName(findUniqueName:FindUniqueName,separator:Separator):UniqueName{
  if(isNameAndRelatedUnique(findUniqueName)){
    return castToUniqueName(findUniqueName)
  }
  return getUniqueNameUsingSuffix(findUniqueName,separator)
}

