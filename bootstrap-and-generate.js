const { existsSync, readdirSync, readFileSync } = require('fs');
const { spawn } = require('child_process');

const vdmDependentPackages = ['vdm*'];

const parametrizePackages = parameter => packages =>
  packages.reduce((args, packageName) => [...args, `--${parameter}`, `@sap/cloud-sdk-${packageName}`], []);
const ignorePackages = parametrizePackages('ignore');

const exists = existsSync('packages/vdm');
const existsGraphVDM = existsSync('packages/vdm-sap-graph/generated');

if (exists) {
  const vdmPackages = readdirSync('packages/vdm');

  if (!vdmPackages.length) {
    console.error('Folder "packages/vdm" exists but is empty. Delete the vdm folder!');
    process.exit(1);
  }

  const versionOfFirstPackage = JSON.parse(readFileSync(`packages/vdm/${vdmPackages[0]}/package.json`, 'utf8')).version;
  const lernaVersion = JSON.parse(readFileSync('lerna.json', 'utf8')).version;

  if (versionOfFirstPackage > lernaVersion) {
    console.error(
      `Found version ${versionOfFirstPackage} in VDM but ${lernaVersion} in lerna.json. This would fail! This usually happens after a release and can be fixed by merging master into your branch (assuming the respective release PR has already been merged into master.)`
    );
    process.exit(1);
  } else if (versionOfFirstPackage < lernaVersion) {
    console.warn(
      `Found version ${versionOfFirstPackage} in VDM but ${lernaVersion} in lerna.json. You might need to regenerate your VDM (delete the vdm/ folder and run npm install in the project root).`
    );
    process.exit(1);
  }
}

Promise.resolve()
  .then(() => exists || createBootstrapCmd(ignorePackages(vdmDependentPackages)))
  .then(() => exists || createCmd('npm', ['run', 'generate:vdm']))
  .then(() => createBootstrapCmd())
  .then(() => existsGraphVDM || createCmd('npm',['run','generate:vdm-sap-graph']))
  .then(() => process.exit(0))
  .catch(code => {
    console.log('EXITING WITH CODE: ', code)
    process.exit(code);
  });

function createBootstrapCmd(params = []) {
  return createCmd('npx', ['lerna', 'bootstrap', '--hoist', '--force-local', '--strict', ...params]);
}

function log(cmd) {
  cmd.stdout.on('data', data => {
    console.log(data.toString());
  });

  cmd.stderr.on('data', data => {
    console.error(data.toString());
  });

  return cmd;
}

function createCmd(command, args) {
  const cmd = log(spawn(command, args));
  return new Promise((resolve, reject) => {
    cmd.on('exit', code => {
      !code ? resolve(0) : reject(code);
    });
  });
}
