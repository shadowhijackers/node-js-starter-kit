import * as request from "supertest";
import express from "express";

import config from '../../../src/config';
import loaders from "../../../src/loaders";


describe('Get users API',  () => {

    let loadedModules: any;
    beforeAll(async ()=>{
        const app = express();
        loadedModules = await loaders({ expressApp: app});
    });

    it('Should response code 200', async () => {

        const response = await request.agent(loadedModules.app)
            .get(config.api.prefix + '/users');
        expect(response.status).toBe(200);

    });

});
