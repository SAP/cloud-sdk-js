import execa = require('execa');

const packageName ='@sap-cloud-sdk/core'
const dryRun = true

async function deprecateVersions(){
  const response = await execa('npm',['view',packageName,'versions','--json'])
  const allVersions = JSON.parse(response.stdout)
  const relevantVersions = allVersions.filter(version=>version.match(/.*\-\w{8,8}\.\w/))
  console.log(relevantVersions)
  for(let i = 0; i< relevantVersions.length;i++){
    const reason = 'The used prerelease version did not fulfill semantic versioning.'
    const versionToBeRemoved = `${packageName}@${relevantVersions[i]}`
    const npmArguments = ['deprecate', versionToBeRemoved, reason]
    if(!dryRun) {
      await execa('npm',npmArguments )
    }else {
      console.log(`Run npm with arguments: ${JSON.stringify(npmArguments)}`)
    }
  }
}

deprecateVersions()
