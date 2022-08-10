import { JwtPayload } from 'jsonwebtoken';
import { userId } from './user';

/**
 * Enumerator that selects the isolation type of destination in cache.
 * The used isolation strategy is either `Tenant` or `Tenant_User` because we want to get results for subaccount and provider tenants which rules out no-isolation or user isolation.
 */
export enum IsolationStrategy {
  Tenant = 'Tenant',
  Tenant_User = 'TenantUser'
}

/**
 * Determin the default Isolation strategy if not given as option.
 * @param jwt - JWT to determine the default isolation strategy
 * @returns The isolation strategy based on the JWT. If no JWT is given it defaults to Tenant isolation
 * @internal
 */
export function getDefaultIsolationStrategy(
  jwt: JwtPayload | undefined
): IsolationStrategy {
  return jwt && userId(jwt)
    ? IsolationStrategy.Tenant_User
    : IsolationStrategy.Tenant;
}
