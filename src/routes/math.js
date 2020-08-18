import express from 'express';
import { isMainThread } from 'worker_threads';
import logger from 'loglevel';
import {
    runWorkerPrimeService,
    runBubbleSortService,
} from '../workers/index-service';

// all the controller and utility functions here:
function helloTest(_req, res) {
    res.send('Hello router');
}

async function add(req, res) {
    const sum = Number(req.query.a) + Number(req.query.c);
    res.send(sum.toString());
}

async function subtract(req, res) {
    const difference = Number(req.query.a) - Number(req.query.b);
    res.send(difference.toString());
}

async function calcPrimeNumber(req, res) {
    const startNumber = Number(req.query.startrange);
    const rangeNumber = Number(req.query.ranges);
    const workData = { start: startNumber, range: rangeNumber };

    if (isMainThread) {
        try {
            const result = await runWorkerPrimeService(workData);
            res.send(result);
        } catch (err) {
            res.send({
                error: 'Error kalkulasi bilangan prima',
                message: err.message,
            });
        }
    }
}

async function calcBubbleSorted(req, res) {
    const lengthNumber = Number(req.query.lengthnum);
    const maxNumber = Number(req.query.maxnum);
    const workData = { lengthData: lengthNumber, maxData: maxNumber };

    console.log('Jalan request cek ', isMainThread);
    if (isMainThread) {
        try {
            const result = await runBubbleSortService(workData);
            res.send(result);
        } catch (err) {
            res.send({
                error: 'Error generate random number',
                message: err.message,
            });
        }
    }
}

// A function to get the routes.
// That way all the route definitions are in one place which I like.
// This is the only thing that's exported
function getMathRoutes() {
    const router = express.Router();
    router.get('/add', add);
    router.get('/subtract', subtract);
    router.get('/hello', helloTest);
    router.get('/calc-prime', calcPrimeNumber);
    router.get('/bubbles', calcBubbleSorted);
    return router;
}

export default getMathRoutes;
