import {getDestinationsFromEnv, setDestinationsInEnv, validateNameAvailable} from "./destination-from-env";
import {Destination, DestinationAuthToken} from "./destination-service-types";
import {Cache, IsolationStrategy} from "../cache";
import {DestinationFetchOptions} from "./destination-accessor-types";
import {DestinationCache} from "./destination-cache";
import {decodeJwt} from "../jwt";
import {createLogger} from "@sap-cloud-sdk/util";
import {userId} from "../user";
import {getXsuaaServiceCredentials} from "../environment-accessor";
import {parseSubdomain} from "../subdomain-replacer";
import {addProxyConfigurationInternet, ProxyStrategy, proxyStrategy} from "./proxy-util";


const logger = createLogger({
    package: 'connectivity',
    messageContext: 'register-destination'
})
/**
 * @internal
 */
export const registerDestinationCache = DestinationCache(
    new Cache<Destination>(undefined)
);

type RegisterDestinationOptions= Pick<DestinationFetchOptions, 'jwt'|'isolationStrategy'>



/**
 * Set a given destination in the `destinations` environment variable.
 *
 * Throws an error if a destination with the same name as the given test destination already exists.
 * @param destination - A destination to add to the `destinations` environment variable
 */
export function registerDestination(destination: DestinationWithName,options?:RegisterDestinationOptions): void {
    if (!destination.name || !destination.url) {
        throw Error(
            'The registerDestination function requires a destination name and url.'
        );
    }

    registerDestinationCache.cacheRetrievedDestination(decodedJwt(options),destination,isolationStrategt(options))
}

export type DestinationWithName = Omit<Destination, 'name'> & { name: string };

function destinationHasName(
    destination: Destination
): destination is DestinationWithName {
    return !!destination.name;
}

/**
 * Internal
 * @param options
 */
export function searchRegisteredDestination(options:DestinationFetchOptions):Destination|null{
    const destination = registerDestinationCache.retrieveDestinationFromCache(decodedJwt(options),options.destinationName,isolationStrategt(options)) || null

    if (destination?.forwardAuthToken) {
        destination.authTokens = destinationAuthToken(options.jwt);
    }
    logger.info(`Successfully retrieved destination '${options.destinationName}' from environment variable.`)

    return destination &&
    proxyStrategy(destination) === ProxyStrategy.INTERNET_PROXY
        ? addProxyConfigurationInternet(destination)
        : destination;
}

function isolationStrategt(options?:RegisterDestinationOptions):IsolationStrategy{
    const hasUserId = options?.jwt && userId(decodeJwt(options.jwt))
    return options?.isolationStrategy || hasUserId ? IsolationStrategy.Tenant_User : IsolationStrategy.Tenant
}

function decodedJwt(options?:RegisterDestinationOptions):Record<string,any>{
    const providerTenantId = parseSubdomain(getXsuaaServiceCredentials(options?.jwt).url)

    return options?.jwt ? decodeJwt(options.jwt) : {zid:providerTenantId}
}

function destinationAuthToken(
    token?: string
): [DestinationAuthToken] | undefined {
    if (token) {
        const decoded = decodeJwt(token);
        logger.info(
            "Option 'forwardAuthToken' enabled on destination. Using the initial token for the destination."
        );
        return [
            {
                value: token,
                expiresIn: decoded.exp!.toString(),
                error: null,
                http_header: { key: 'Authorization', value: `Bearer ${token}` },
                type: 'Bearer'
            }
        ];
    }
    logger.warn(
        "Option 'forwardAuthToken' was set on destination but no token was provided to forward. This is most likely unintended and will lead to a authorization error on request execution."
    );
}
