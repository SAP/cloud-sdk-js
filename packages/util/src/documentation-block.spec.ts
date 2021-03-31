import { EOL } from 'os';
import { documentationBlock } from './documentation-block';

describe('documentation-block', () => {
  it('creates empty documentation block', () => {
    const actual = documentationBlock``;
    expect(actual).toBe(`/**${EOL} * ${EOL} */`);
  });

  it('removes empty lines in beginning and and of documentation block', () => {
    const actual = documentationBlock` 
    
    some content.
    
    
    `;
    expect(actual).toBe(`/**${EOL} * some content.${EOL} */`);
  });

  it('keeps internal empty lines', () => {
    const actual = documentationBlock` 
    
    Line Before empty line.
    
    Line After empty line.
    
    
    `;
    expect(actual).toMatchSnapshot();
  });

  it('creates single line documentation', () => {
    const actual = documentationBlock`A single line of documentaiton.`;
    expect(actual).toBe(`/**${EOL} * A single line of documentaiton.${EOL} */`);
  });

  it('creates single line documentation with single argument', () => {
    const argument = 'myArgument';
    const actual = documentationBlock`Some text before ${argument} my text after.`;
    expect(actual).toBe(
      `/**${EOL} * Some text before myArgument my text after.${EOL} */`
    );
  });

  it('creates single line documentation with arguments', () => {
    const argument1 = 'myArgument1';
    const argument2 = 'myArgument2';
    const actual = documentationBlock`${argument1} Some text before ${argument2} my text after.`;
    expect(actual).toBe(
      `/**${EOL} * myArgument1 Some text before myArgument2 my text after.${EOL} */`
    );
  });

  it('creates multi line documentation in block form', () => {
    const actual = documentationBlock`First line
      Second line   
    Third line`;
    expect(actual).toMatchSnapshot();
  });

  it('create multi line documentation with arguments', () => {
    const argumentFirstLine = 'argumentFirstLine';
    const argumentThirdLine1 = 'argumentThirdLine1';
    const argumentThirdLine2 = 'argumentThirdLine2';
    const actual = documentationBlock`
      First line 
         Second line
      ${argumentThirdLine1} text third line ${argumentThirdLine2}   
       Forth line`;
    expect(actual).toMatchSnapshot();
  });

  it('handles new lines in arguments', () => {
    const argumentWithNewLines = [
      'First Line',
      'Second Line',
      'Third Line'
    ].join(EOL);
    const actual = documentationBlock`A single line of documentaiton with new lines in argument
    ${argumentWithNewLines}.`;
    expect(actual).toMatchSnapshot();
  });

  it('masks */ character', () => {
    const actual = documentationBlock`A single line of */ documentaiton with illegal */.`;
    expect(actual).toBe(
      `/**${EOL} * A single line of  documentaiton with illegal .${EOL} */`
    );
  });
});
