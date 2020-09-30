const INTERNAL_PREFIX = '_';

export function prependPrefix(name: string): string {
  return `${name.startsWith(INTERNAL_PREFIX) ? '' : INTERNAL_PREFIX}${name}`;
}

export function stripPrefix(name: string): string {
  return name.startsWith(INTERNAL_PREFIX) ? name.substr(1) : name.substr(0);
}
