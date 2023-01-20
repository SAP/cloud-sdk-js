import {Context, executeWithMiddleware, Middleware, MiddlewareIn} from "./middleware";
import exp from "constants";
import {createLogger} from "@sap-cloud-sdk/util/dist/logger";

describe('middleware',()=>{
    const logger = createLogger('middleware')

    const middleWareAppend1 : Middleware<string, string, Context<string>> = function(options:MiddlewareIn<string, string, Context<string>>){
        logger.info('append1')
        return s=>options.fn(s).then(s=>Promise.resolve(`1`))
    }
    const middleWareAppend2 : Middleware<string, string, Context<string>> = function(options:MiddlewareIn<string, string, Context<string>>){
        logger.info('append2')
        return  s=>options.fn(s).then(s=>Promise.resolve(s+' append2'))
    }

    const middleWareChangeArgument : Middleware<string, string, Context<string>> = function(options:MiddlewareIn<string, string, Context<string>>){
        options.context.fnArguments = 'changed Argument'
        return options.fn
    }

    it('adds middlewares in the expected order',async()=>{
        const infoSpy = jest.spyOn(logger,'info')
        const actual = await executeWithMiddleware([middleWareAppend1,middleWareAppend2],{uri:'dummyUri',fnArguments:'initial Input',tenantId:'dummyTenant'},(s:string)=>Promise.resolve(s))
        expect(infoSpy).toHaveBeenCalledWith('append2,append1')
        expect(actual).toBe('initial Input append1 append2')
    })
})