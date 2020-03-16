import {RequestHandler} from "express";

export interface IRouterParams {
    path: string,
    method: string,
    handler: RequestHandler<any>,
    middleware: RequestHandler<any>[],
    description: string,
    responseModel?: any,
    samplePayload?: any,
}
