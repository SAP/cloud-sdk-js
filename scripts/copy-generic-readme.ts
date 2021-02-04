import {resolve} from 'path'
import execa = require('execa');
import {promises,readFileSync} from 'fs';

const startTag = '<!-- genericPart -->'
const endTag = '<!-- genericPartStop -->'

//&& yarn lerna run readme

const genericContent = readFileSync(resolve(__dirname,'../GENERIC-README-PART.md'),{encoding:'utf8'})

type lernaModule = {
  name:string,
    version:string,
    private:boolean,
    location:string
}


function replaceGenericContent(fileContent:string,genericContent:string):string{
  return fileContent.replace(new RegExp(`${startTag}[.\n]*${endTag}`),`${startTag}${genericContent}${endTag}`)
}

async function getPackageLocations():Promise<string[]>{
  const response = await execa('lerna',['list','--json'],{cwd:resolve(__dirname,'../')})
  return (JSON.parse(response.stdout) as lernaModule[]).map(module=>module.location)
}

async function updateOneReadme(pathModule:string){
  const pathReadme = resolve(pathModule,'README.md')
  const fileContent = await promises.readFile(pathReadme,{encoding:'utf8'})
  const newFileContent = replaceGenericContent(fileContent,genericContent)
  console.log(newFileContent)
}

async function doIt(){
  const packageLocations = await getPackageLocations()
  updateOneReadme(packageLocations[1])
  // packageLocations.map()
}

doIt()
