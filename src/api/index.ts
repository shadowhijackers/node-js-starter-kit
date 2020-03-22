import express from "express";

import restAPIs from './rest';

export default {
    loadRestEndPoints: (expressInstance: express.Application)=>{
        restAPIs(expressInstance)
    }
}
