import { join } from 'path';
import { GlobSync } from 'glob';
import { flatten } from '@sap-cloud-sdk/util';

export function typeDescriptorPaths(cwd: string): string[]{
    const files =   new GlobSync('**/*.d.ts',{ cwd }).found;
    return files.filter(file=>!file.includes('index.d.ts')).map(file=>join(cwd,file));
}

export interface ExportedObject{
    name: string;
        type: string;
    path: string;
}

export function parseTypeDefinitionFile(fileContent: string): Omit<ExportedObject,'path'>[]{
    const normalized = fileContent.replace(/\n+/g,'');
    return  ['function','const','enum','class','type','interface'].reduce((allObjects,objectType)=>{
        const regex = objectType === 'interface' ? new RegExp(`export ${objectType} (\\w+)`,'g') :new RegExp(`export declare ${objectType} (\\w+)`,'g');
        const exported = captureGroupsFromGlobalRegex(regex,normalized).map(element=>({ name:element,type:objectType }));
        return[...allObjects,...exported];
    },[]);
}

export function indexFiles(cwd: string): string[]{
    const files =   new GlobSync('**/index.ts',{ cwd }).found;
    return files.filter(file=>!file.includes('index.d.ts')).map(file=>join(cwd,file));
}

export function checkSingleIndexFile(cwd: string){
    const files = indexFiles(cwd);
    if(files.length > 1){
        throw Error(`Too many index files found: ${files.join(',')}`);
    }
    if(files.length === 0){
        throw Error(`No index.ts file found in ${cwd}`);
    }
    if(files[0]!== join(cwd,'index.ts')){
        throw new Error(`Index file is not in root foldes ${files[0]}`);
    }
}

export function parseIndexFile(fileContent: string): string[]{
    const normalized = fileContent.replace(/\s+/g,'');
    const groups = captureGroupsFromGlobalRegex(/\{([\w,]+)\}/g,normalized);

    return flatten(groups.map(group=>group.split(',')));
}

function captureGroupsFromGlobalRegex(regex: RegExp,str: string): string[]{
    const groups = Array.from(str.matchAll(regex));
    return groups.map(group=>group[1]);
}

