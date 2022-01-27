import { execa } from 'execa';

async function main() {
  const ls = await execa('ls');
}

main();


