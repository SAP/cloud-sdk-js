import { decodeJwt } from '../jwt';
import { serviceToken } from '../token-accessor';
import type { JwtPair } from '../jwt';
import type { DestinationOptions } from './destination-accessor-types';

/**
 * @internal
 */
export async function getProviderServiceToken(
  options: DestinationOptions
): Promise<JwtPair> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { jwt, ...optionsWithoutJwt } = options;
  const encoded = await serviceToken('destination', optionsWithoutJwt);
  return { encoded, decoded: decodeJwt(encoded) };
}
