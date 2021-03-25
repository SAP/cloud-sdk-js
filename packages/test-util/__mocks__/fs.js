let mockedFS = jest.genMockFromModule('fs');
const originalFS = jest.requireActual('fs');

let mockingIsOn = false;
let mockReadDirSync = [];
let mockReadFileSync = '';

function switchMockOn() {
  mockingIsOn = true;
}

function switchMockOff() {
  mockingIsOn = false;
}

function setReadDirSync(files) {
  mockReadDirSync = files;
}

function setReadFileSync(filePath, file) {
  mockReadFileSync = file;
}

function readdirSync(directoryPath) {
  if (!mockingIsOn) {
    return originalFS.readdirSync(directoryPath);
  }
  return mockReadDirSync;
}

function readFileSync(filePath, encoding) {
  if (!mockingIsOn) {
    return originalFS.readFileSync(filePath, encoding);
  }
  return mockReadFileSync;
}

//Take default for all which is not mocked
for (var prop in mockedFS) {
  if (mockedFS.hasOwnProperty(prop) && originalFS.hasOwnProperty(prop)) {
    if (typeof mockedFS[prop] === 'function') {
      mockedFS[prop] = originalFS[prop];
    }
  }
}

//set mock functions
mockedFS.switchMockOn = switchMockOn;
mockedFS.switchMockOff = switchMockOff;

mockedFS.setReadDirSync = setReadDirSync;
mockedFS.readdirSync = readdirSync;

mockedFS.setReadFileSync = setReadFileSync;
mockedFS.readFileSync = readFileSync;

module.exports = mockedFS;
