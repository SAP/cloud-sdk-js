// TODO: this file is probably obsolete
//If so remove it for OSS
const fs = require('fs');
const path = require('path');

const pkgPath = path.resolve('package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath).toString());
const version = pkg.version;

// hardcoded dependencies whose versions shall be updated
Object.keys(pkg.dependencies)
    .filter(dep => dep.indexOf('@sap/cloud-sdk') === 0 || dep.indexOf('@sap-cloud-sdk') === 0)
    .forEach(dep => {
        pkg.dependencies[dep] = `^${version}`;
    });

if (pkg.peerDependencies) {
    Object.keys(pkg.peerDependencies)
        .filter(dep => dep.indexOf('@sap/cloud-sdk') === 0 || dep.indexOf('@sap-cloud-sdk') === 0)
        .forEach(dep => {
            pkg.peerDependencies[dep] = `^${version}`;
        });
}

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
