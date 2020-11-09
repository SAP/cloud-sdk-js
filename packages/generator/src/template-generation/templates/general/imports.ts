import { Import } from '../../entity';
import { codeBlock } from './common';

export const imports = (importData: Import[]) => codeBlock`
${importData
  .map(i => `import { ${i.imports.join(', ')} } from '${i.module}';`)
  .join('\n')}
`;
