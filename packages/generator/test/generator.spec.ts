import { generate } from '../src/generator';
import { Project, ModuleKind, ModuleResolutionKind } from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';

describe('ESM support in generator', () => {
  const outputDir = path.join(__dirname, 'test-output');
  const inputFile = path.join(__dirname, 'test-service.edmx');

  jest.setTimeout(60000); // Increase timeout to 60 seconds for all tests in this describe block

  beforeEach(() => {
    if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true });
    }
    fs.mkdirSync(outputDir);
  });

  afterEach(() => {
    fs.rmSync(outputDir, { recursive: true });
  });

  test('project options are set correctly for ESM', async () => {
    console.time('project options test');
    console.log('Starting project options test');
    const options = {
      input: inputFile,
      outputDir,
      generateESM: true,
      forceOverwrite: true,
      packageJson: true,
      tsconfig: path.join(__dirname, 'tsconfig.json')
    };

    await generate(options);

    const serviceDir = fs.readdirSync(outputDir)[0]; // Assuming only one service is generated
    const servicePath = path.join(outputDir, serviceDir);
    
    console.log('Service directory contents:', fs.readdirSync(servicePath));

    const tsConfigPath = path.join(servicePath, 'tsconfig.json');
    if (fs.existsSync(tsConfigPath)) {
      const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf-8'));
      console.log('tsconfig.json:', tsConfig);
      expect(tsConfig.compilerOptions.module).toBe('esnext');
      expect(tsConfig.compilerOptions.moduleResolution).toBe('nodenext');
    } else {
      console.log('tsconfig.json not found');
    }
    console.timeEnd('project options test');
  });

  test('generated files are compatible with ESM', async () => {
    console.time('generated files test');
    console.log('Starting generated files test');
    const options = {
      input: inputFile,
      outputDir,
      generateESM: true,
      forceOverwrite: true,
      packageJson: true,
      tsconfig: path.join(__dirname, 'tsconfig.json')
    };

    await generate(options);

    const serviceDir = fs.readdirSync(outputDir)[0]; // Assuming only one service is generated
    const servicePath = path.join(outputDir, serviceDir);
    
    console.log('Service directory contents:', fs.readdirSync(servicePath));

    const indexPath = path.join(servicePath, 'index.ts');
    if (fs.existsSync(indexPath)) {
      const indexFile = fs.readFileSync(indexPath, 'utf-8');
      console.log('index.ts content:', indexFile);
      expect(indexFile).toContain('export * from');
      expect(indexFile).not.toContain('require(');
    } else {
      console.log('index.ts not found in service directory');
    }

    const packageJsonPath = path.join(servicePath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
      const packageJson = JSON.parse(packageJsonContent);
      console.log('package.json content:', packageJson);
      expect(packageJson.type).toBe('module');
    } else {
      console.log('package.json not found in service directory');
    }
    console.timeEnd('generated files test');
  });
});
