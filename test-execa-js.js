import { execa } from 'execa';

async function main() {
  const ls = await execa('ls');
  console.log(ls);
}

main();
