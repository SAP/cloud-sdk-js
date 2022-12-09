import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import nock from "nock";
import {executeWithMiddleware} from "../dist/middleware";
import {
    circuitbreakerHttp,
    circuitBreakers,
    getCircuitBreaker,
    httpKeyBuilder,
    HttpMiddlewareContext
} from "./circuitbreaker";

describe('circuit-breaker',()=>{
    beforeEach(()=>{
        Object.keys(circuitBreakers).forEach(key=>delete circuitBreakers[key])
        nock.cleanAll()
    })

    const host = 'http://example.com'
    it('opens breaker',async ()=>{
        nock(host, {})
            .persist()
            .get(/failing-500/)
            .reply(500);

        const requestConfig:AxiosRequestConfig = {method:"get",baseURL:host,url:'failing-500'}
        const context:HttpMiddlewareContext = {requestConfig,url:host,tenantId:'myTestTenant'}
        const request = ()=>axios.request(requestConfig)
        let keepCalling = true
        while (keepCalling){
            await executeWithMiddleware<AxiosResponse,HttpMiddlewareContext>(circuitbreakerHttp(),context,request)
            const breaker = circuitBreakers[httpKeyBuilder(context)]
            if(breaker.opened){
                break;
            }
        }
        await expect(executeWithMiddleware<AxiosResponse,HttpMiddlewareContext>(circuitbreakerHttp(),context,request)).rejects.toThrow('Breaker is open')

    })

    it('does not open for 401, 403 or 404 responses',async ()=>{
        const mock = nock(host, {})
            .get(/failing-ignore/)
            .times(10)
            .reply(401)
            .get(/failing-ignore/)
            .times(10)
            .reply(403)
            .get(/failing-ignore/)
             .times(10)
            .reply(404);

        const requestConfig:AxiosRequestConfig = {method:"get",baseURL:host,url:'failing-ignore'}
        const context:HttpMiddlewareContext = {requestConfig,url:host,tenantId:'myTestTenant'}
        const request = ()=>axios.request(requestConfig)
        let keepCalling = !mock.isDone()
        while (keepCalling){
            await executeWithMiddleware<AxiosResponse,HttpMiddlewareContext>(circuitbreakerHttp(),context,request)
            keepCalling = !mock.isDone()
        }
        expect(circuitBreakers[httpKeyBuilder(context)].opened).toBe(false)


    })

    it('creates circuit breaker for each tenant',async()=>{
        nock(host, {})
            .get(/ok/)
            .times(2)
            .reply(200);

        const requestConfig:AxiosRequestConfig = {method:"get",baseURL:host,url:'ok'}
        const request = ()=>axios.request(requestConfig)
        const context:HttpMiddlewareContext = {requestConfig,url:host,tenantId:'tenant1'}

        await executeWithMiddleware<AxiosResponse,HttpMiddlewareContext>(circuitbreakerHttp(),context,request())
        await executeWithMiddleware<AxiosResponse,HttpMiddlewareContext>(circuitbreakerHttp(),{...context,tenantId:'tenant2'},request())

        expect(Object.keys(circuitBreakers)).toEqual(['${host}::tenant1::ok','${host}::tenant2::ok'])
    })

    it('creates circuit breaker for each service',async()=>{
        nock(host, {})
            .get(/path-1/)
            .reply(200)
                .get(/path-1/)
                    .reply(200)

        const requestConfigPath1:AxiosRequestConfig = {method:"get",baseURL:host,url:'path-1'}
        const requestConfigPath2:AxiosRequestConfig = {method:"get",baseURL:host,url:'path-2'}
        const request = (requestConfig)=>axios.request(requestConfig)
        const context:HttpMiddlewareContext = {requestConfig,url:host,tenantId:'tenant1'}

        await executeWithMiddleware<AxiosResponse,HttpMiddlewareContext>(circuitbreakerHttp(),context,request(requestConfigPath1))
        await executeWithMiddleware<AxiosResponse,HttpMiddlewareContext>(circuitbreakerHttp(),context,request(requestConfigPath2))

        expect(Object.keys(circuitBreakers)).toEqual(['${host}::tenant1::path-1','${host}::tenant2::path-2'])
    })

    it('reacts correctly on xsuaa failures',()=>{

    })
})