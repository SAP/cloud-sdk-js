import {resolve} from 'path'
import execa = require('execa');
import {promises,readFileSync} from 'fs';
import { createLogger } from '@sap-cloud-sdk/util';

const startTag = '<!--genericPart-->'
const endTag = '<!--genericPartStop-->'

const genericContent = readFileSync(resolve(__dirname,'GENERIC-README-PART.md'),{encoding:'utf8'})

const logger = createLogger('check-licenses');

type lernaModule = {
  name:string,
    version:string,
    private:boolean,
    location:string
}

function replaceGenericContent(fileContent:string,genericContent:string):string{
  return fileContent.replace(new RegExp(`${startTag}(.|\n)*${endTag}`),`${startTag}\n${genericContent}${endTag}`)//${startTag}${genericContent}${endTag}
}

async function getPackageLocations():Promise<string[]>{
  const response = await execa('lerna',['list','--json','-a'],{cwd:resolve(__dirname,'../')})
  return (JSON.parse(response.stdout) as lernaModule[]).map(module=>module.location).filter(path=>!path.includes('test-packages'))
}

async function updateReadmeFile(pathModule:string){
  const pathReadme = resolve(pathModule,'README.md')
  const oldFileContent = await promises.readFile(pathReadme,{encoding:'utf8'})
  const newFileContent = replaceGenericContent(oldFileContent,genericContent)
  await promises.writeFile(pathReadme,newFileContent,{encoding:'utf8'})
  logger.info(`File ${pathReadme} finished.`)
}

async function updateReadmeFiles(){
  logger.info('Generic content is added to README.md files in packages.')
  const packageLocations = await getPackageLocations()
  await Promise.all(packageLocations.map(path=>updateReadmeFile(path)))
}

updateReadmeFiles()
