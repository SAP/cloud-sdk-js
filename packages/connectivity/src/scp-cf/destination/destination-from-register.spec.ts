import {
    DestinationWithName,
    searchRegisteredDestination,
    registerDestination,
    registerDestinationCache
} from "./destination-from-register";
import {
    mockDestinationsEnv,
    mockServiceBindings, providerServiceToken,
    unmockDestinationsEnv
} from "../../../../../test-resources/test/test-util";
import {createLogger, encodeBase64} from "@sap-cloud-sdk/util";
import {getDestination} from "./destination-accessor";
import {JwtHeader, JwtPayload} from "jsonwebtoken";
import {mockTestDestination, setTestDestination} from "@sap-cloud-sdk/test-util";
import {Destination} from "./destination-service-types";
import {Cache} from "../cache";


const testDestination:DestinationWithName = {
    name: 'RegisteredDestination',
    url: 'https://example.com'
};

const destinationWithForwarding: Destination = {
    forwardAuthToken: true,
    url: 'https://mys4hana.com',
    name: 'FORWARD-TOKEN-DESTINATION'
};

describe('register-destination',()=>{
    beforeEach(()=>{
        mockServiceBindings()
    })

    afterEach(()=>{
        registerDestinationCache.clear()
        unmockDestinationsEnv();
    })

    it('registers destiantion and retrieves it',async ()=>{
            registerDestination(testDestination)
            const actual = await getDestination({destinationName: testDestination.name})
            expect(actual).toEqual(testDestination)
        }
    )

    it('retrieves env destinations before registered ones',async ()=>{
            registerDestination(testDestination)
            setTestDestination({...testDestination,authentication:'BasicAuthentication'})
            const actual = await getDestination({destinationName: testDestination.name})
            expect(actual?.authentication).toEqual('BasicAuthentication')
        }
    )

    it('retunrs undefined if destination key is not found',async()=>{
        const actual = searchRegisteredDestination({destinationName:'Non-existing-destination'})
        expect(actual).toBeNull()
    })

    it('caches with tenant isolation if no JWT is given',()=>{
        registerDestination(testDestination)
        expect(registerDestinationCache.getCacheInstance().hasKey('')).toBe(true)
    })

    it('caches with tenant isolation if JWT does not contain user-id',()=>{
        registerDestination(testDestination,{jwt:providerServiceToken})
        expect(registerDestinationCache.getCacheInstance().hasKey('')).toBe(true)
    })

    it('caches with unlimited time',()=>{

    })

    it('caches with tenant-user isolation if JWT is given',()=>{
        registerDestination(testDestination)
    })

    it('adds proxy to registered destination',()=>{

    })



    it('adds the auth token if forwardAuthToken is enabled', async () => {
        mockDestinationsEnv(destinationWithForwarding);
        const jwtPayload: JwtPayload = { exp: 1234 };
        const jwtHeader: JwtHeader = { alg: 'HS256' };
        const fullToken = `${encodeBase64(
            JSON.stringify(jwtHeader)
        )}.${encodeBase64(JSON.stringify(jwtPayload))}.SomeHash`;
        const actual = await getDestination({
            destinationName: 'FORWARD-TOKEN-DESTINATION',
            jwt: fullToken
        });
        expect(actual?.authTokens![0].expiresIn).toEqual('1234');
        expect(actual?.authTokens![0].value).toEqual(fullToken);
        expect(actual?.authTokens![0].http_header.value).toEqual(
            `Bearer ${fullToken}`
        );
    });

    it('warns if forwardAuthToken is enabled but no token provided.', async () => {
        mockDestinationsEnv(destinationWithForwarding);

        const logger = createLogger('env-destination-accessor');
        const warnSpy = jest.spyOn(logger, 'warn');
        await getDestination({ destinationName: 'FORWARD-TOKEN-DESTINATION' });
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringMatching(
                /Option 'forwardAuthToken' was set on destination but no token was provided to forward./
            )
        );
    });

    it('infos if destination registed destination is retrieved.', async () => {
        registerDestination(testDestination);

        const logger = createLogger('register-destination');
        const infoSpy = jest.spyOn(logger, 'info');
        await getDestination({ destinationName: 'FINAL-DESTINATION' });
        expect(infoSpy).toHaveBeenCalledWith(
            expect.stringMatching(
                /Successfully retrieved destination 'FINAL-DESTINATION' from registered destinations./
            )
        );
    });

})
