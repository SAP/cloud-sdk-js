import {Context, HttpResponse, Middleware, MiddlewareIn} from "@sap-cloud-sdk/http-client";
import CircuitBreaker from "opossum";
import {circuitBreakerDefaultOptions, getXsuaaServiceCredentials} from "@sap-cloud-sdk/connectivity/dist/scp-cf";
import {AxiosError, options} from "axios";
import {HttpRequestConfig} from "@sap-cloud-sdk/http-client/dist/http-client-types";

type ErrorFilter = (err)=>boolean
type KeyBuilder<ContextT extends Context> = (context:ContextT)=>string

function httpErrorFilter(error:AxiosError):boolean{
    if(error.response?.status && [401,403,404].includes(error.response.status)){
        return true
    }
    return false;
}


export interface HttpMiddlewareContext extends Context  {
    tenantId:string,
    requestConfig: HttpRequestConfig;
}

export function httpKeyBuilder(context:HttpMiddlewareContext):string{
    return  `${context.uri}::${context.requestConfig.url}::${context.tenantId}`
}

export function circuitbreakerHttp():Middleware<HttpResponse, HttpMiddlewareContext>{
    return circuitbreaker(httpKeyBuilder,httpErrorFilter)
}


function circuitbreaker<ReturnT, ContextT extends Context>(keyBuilder:KeyBuilder<ContextT>,
errorFilter:ErrorFilter): Middleware<ReturnT, ContextT>{
    return (options:MiddlewareIn)=>{
        return ()=>(getCircuitBreaker(keyBuilder(options.context),errorFilter) as CircuitBreaker<any,ReturnT>).fire(options.fn)
    }
}


export const circuitBreakers:Record<string,CircuitBreaker> = {}

function getCircuitBreaker(key:string,errorFilter:ErrorFilter):CircuitBreaker{
    if (!circuitBreakers[key]) {
        circuitBreakers[key] = new CircuitBreaker(
            executeFunction,
            {...circuitBreakerDefaultOptions,errorFilter}
        );
    }
    return circuitBreakers[key];
}

function executeFunction<T extends (...args: any[]) => any>(
    fn: T,
    ...parameters: Parameters<T>
): ReturnType<T> {
    return fn(...parameters);
}
