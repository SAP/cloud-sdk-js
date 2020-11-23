import { codeBlock } from './code-block';

export interface Import {
  imports: string[];
  module: string;
}

export const imports = (...importData: Import[]) => codeBlock`
${importData
  .map(i => `import { ${i.imports.join(', ')} } from '${i.module}';`)
  .join('\n')}
`;
