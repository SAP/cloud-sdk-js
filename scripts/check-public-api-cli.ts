import { join,resolve } from 'path';
import { promises } from 'fs';
import { createLogger } from '@sap-cloud-sdk/util';
import execa from 'execa';
import {
    checkSingleIndexFile, ExportedObject,
    indexFiles,
    parseIndexFile,
    parseTypeDefinitionFile,
    typeDescriptorPaths
} from './check-public-api';

const logger = createLogger('check-public-api');

async function checkApiOfPackage(pathToPackage: string): Promise<void>{
    await promises.rmdir(join(pathToPackage,'dist'),{ recursive:true });
    const response = await execa('yarn',['compile'],{ cwd:pathToPackage });
    logger.info(response.stdout);
    checkSingleIndexFile(join(pathToPackage,'src'));

    const typeDefinitionPaths = typeDescriptorPaths(join(pathToPackage,'dist'));
    const allFiles = await Promise.all(typeDefinitionPaths.map(async path=>({ path,content:await promises.readFile(path,'utf8') })));
    const allExportedTypes = allFiles.reduce((all,file)=>{
        const newElements: ExportedObject[] = parseTypeDefinitionFile(file.content).map(withtoutPath=>({ path:file.path,...withtoutPath }));
        return [...all,...newElements];
    },[] as ExportedObject[]);

    const allExportedIndex = parseIndexFile(await promises.readFile(indexFiles(pathToPackage)[0],'utf8'));

    let somethingWrong = false;
    for(const exportedType of allExportedTypes){
        if(!allExportedIndex.find(nameInIndex=>exportedType.name === nameInIndex)){
            logger.error(`The ${exportedType.type} "${exportedType.name}" in file: ${exportedType.path} is not listed in the index.ts but also not marked as internal.`);
            somethingWrong = true;
        }
    }

    for(const nameInIndex of allExportedIndex){
        if(!allExportedTypes.find(exportedType=>exportedType.name === nameInIndex)){
            logger.error(`The object "${nameInIndex}" is the index.ts but marked as internal.`);
            somethingWrong = true;
        }
    }
    if(somethingWrong){
       process.exit(1);
    }
}

checkApiOfPackage(resolve(__dirname,'../packages/connectivity'));
