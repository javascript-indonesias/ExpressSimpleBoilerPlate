import express from 'express';
// any other routes imports would go here
import { getMathRoutes } from './math';

function getRoutes() {
    // create a router for all the routes of our app
    const router = express.Router();
    router.use('/math', getMathRoutes());
    // any additional routes would go here
    return router;
}

export { getRoutes };
