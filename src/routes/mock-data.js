import express from 'express';
import { generateRandomData } from '../dataparsers/mock-generator';
import logger from '../utils/config-winston';

async function getMockData(req, res) {
    const lengthData = Number(req.params.lengthdata);
    let randomData = [];
    try {
        if (lengthData > 0) {
            randomData = await generateRandomData(lengthData);
        } else {
            randomData = await generateRandomData();
        }
        res.json({ data: randomData });
    } catch (err) {
        logger.warn(`Error random data generator ${err}`);
        res.json({ data: randomData });
    }
}

function getMockRoutes() {
    const router = express.Router();
    router.get('/mockdata', getMockData);
    return router;
}

export default getMockRoutes;
