import { join,resolve } from 'path';
import { promises } from 'fs';
import { createLogger, flatten } from '@sap-cloud-sdk/util';
import {
    checkSingleIndexFile,
    indexFiles,
    parseIndexFile,
    parseTypeDefinitionFile,
    typeDescriptorPaths
} from './check-public-api';

const logger = createLogger('check-public-api');

async function checkApiOfPackage(pathToPackage: string): Promise<void>{
    checkSingleIndexFile(join(pathToPackage,'src'));

    const typeDefinitionPaths = typeDescriptorPaths(join(pathToPackage,'dist'));
    const allFiles = await Promise.all(typeDefinitionPaths.map(path=>promises.readFile(path,'utf8')));
    const allExportedTypes = flatten(allFiles.map(file=>parseTypeDefinitionFile(file)));

    const allExportedIndex = parseIndexFile(await promises.readFile(indexFiles(pathToPackage)[0],'utf8'));

    let somethingWrong = false;
    for(const exportedType of allExportedTypes){
        if(!allExportedIndex.includes(exportedType)){
            logger.error(`The object ${exportedType} is not in the index.ts but also not marked as internal.`);
            somethingWrong = true;
        }
    }

    for(const exportedIndex of allExportedIndex){
        if(!allExportedTypes.includes(exportedIndex)){
            logger.error(`The object ${exportedIndex} is the index.ts but marked as internal..`);
            somethingWrong = true;
        }
    }
    if(somethingWrong){
       process.exit(1);
    }
}

checkApiOfPackage(resolve(__dirname,'../packages/connectivity'));
