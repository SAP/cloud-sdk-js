/* eslint-disable no-console */
import { resolve } from 'path';
import { emptyDirSync, writeFileSync, ensureDirSync } from 'fs-extra';
import { Project } from 'ts-morph';
import execa = require('execa');
import { entitySourceFile } from './entity/file';
import { sourceFile } from './file-generator';
import { GeneratorOptions } from './generator-options';
import { entityTemplate } from './template-generation/templates/entity/entity';
import {
  parseServices,
  projectOptions,
  resolvePath,
  sanitizeOptions
} from './generator';

export async function generateTemplates(
  options: GeneratorOptions
): Promise<void> {
  options = sanitizeOptions(options);
  const services = parseServices(options);

  emptyDirSync(options.outputDir.toString());

  services.forEach(service => {
    console.time('service');
    const serviceDirectory = resolvePath(service.directoryName, options);
    ensureDirSync(serviceDirectory);
    service.entities.forEach(entity => {
      console.time('entity');
      const filePath = resolve(serviceDirectory, `${entity.className}.ts`);
      writeFileSync(filePath, entityTemplate(entity, service));
      console.timeEnd('entity');
    });
    console.timeEnd('service');
  });

  return;
}

export async function generateTsMorph(
  options: GeneratorOptions
): Promise<void> {
  options = sanitizeOptions(options);
  const services = parseServices(options);
  emptyDirSync(options.outputDir.toString());

  const project = new Project(projectOptions());

  services.forEach(service => {
    console.time('service');
    const serviceDirectory = resolvePath(service.directoryName, options);
    ensureDirSync(serviceDirectory);
    const serviceDir = project.createDirectory(serviceDirectory);
    service.entities.forEach(entity => {
      console.time('entity');
      sourceFile(
        serviceDir,
        entity.className,
        entitySourceFile(entity, service),
        options.forceOverwrite
      );
      console.timeEnd('entity');
    });
    console.timeEnd('service');
  });

  return project.save();
}
