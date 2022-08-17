import CircuitBreaker from 'opossum';
import {
    circuitBreakerDefaultOptions,
    Destination,
    JwtPayload,
    timeoutPromise
} from '../scp-cf';

export interface MiddlewareInOut {
    fn: <T>(argv: any[]) => Promise<T>;
    exitChain: boolean;
    context?: RequestContext;
};

export type MiddlewareFunction = (options: MiddlewareInOut) => MiddlewareInOut;
interface MiddleWareWithPrio { priority: number; middleWare: MiddlewareFunction };
export interface MiddleWare {
    [key: string]: MiddleWareWithPrio|undefined;
    timeout?: MiddleWareWithPrio;
    circuitBreaker?: MiddleWareWithPrio;
    retry?: MiddleWareWithPrio;
};

export interface RequestContext {
    category: 'xsuaa' | 'destination' | 'target';
    url?: string;
    request?: any; //TODO httprequest config in client -> circular dependency
    jwt?: string|JwtPayload; // for convinience
    destination?: Destination;
};

const timeOutPriority = 10;
const circuitBreakerPriority = 20;
const defaultTimeout = 100000;

export function resilience(): MiddleWare{
    return{
        timeout:timeoutMiddleWare()
    };
}

function stackMiddleWare(middleWare: MiddleWare): MiddlewareFunction{
    const sortedByPrioList = Object.values(middleWare).filter(m=>m !== undefined).sort((a,b)=>a!.priority>b!.priority ? 1 : -1).map(m=>m!.middleWare);
    const merged: MiddlewareFunction =  sortedByPrioList.reduce((all,curr)=>(inOut)=>{
        const foo = curr(inOut);
        return all(foo);
    },(inOut => inOut) as MiddlewareFunction);
    return merged;
}

export async function executeWithMiddleWare<T>(fn: <T>(...argv: any) => Promise<T>,args: any[], middleWare: MiddleWare=resilience(), context: RequestContext): Promise<T>{
    const sortedByPrioList = stackMiddleWare(middleWare);
    return  sortedByPrioList({ fn, exitChain:false,context }).fn(args);
}

function timeoutMiddleWare(): MiddleWareWithPrio{
        const timeoutMidleware: MiddlewareFunction = <T>(middleWareInOut: MiddlewareInOut)=>{
            const { context,fn,exitChain } = middleWareInOut;
            const wrapped = <T>(args: any[])=> exitChain ? fn<T>(args) : Promise.race([fn<T>(args),timeoutPromise<T>(defaultTimeout)]);
            return    {
                fn:wrapped,
                context,
                exitChain
            };
        };
        return {
            middleWare:timeoutMidleware,
            priority:timeOutPriority
        };
}

function circuitBreakerMiddleWare(): MiddleWareWithPrio{
    const circuitBreakMiddleWare: MiddlewareFunction= <T>(middleWareInOut: MiddlewareInOut)=>{
        const { context,fn,exitChain } = middleWareInOut;
        // TODO have map extracting the right circuit breaker from context for service and tenant
        const wrapped = <T>(args: any[])=> exitChain ? fn<T>(args) : new CircuitBreaker<any[],T>(middleWareInOut.fn,circuitBreakerDefaultOptions).fire(args);
        return {
            fn:wrapped,
            context,
            exitChain
        };
    };
    return { middleWare: circuitBreakMiddleWare,priority:circuitBreakerPriority };
}

