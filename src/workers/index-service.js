import { Worker } from 'worker_threads';
import path from 'path';
import os from 'os';
import logger from '../utils/config-winston';
import WorkerPool from './workerpool-primes';

import config from '../../config';

function runWorkerPrimeService(workerData) {
    return new Promise((resolve, reject) => {
        const pathWorker = path.join(__dirname, 'calc-primes.worker.js');
        const worker = new Worker(pathWorker, { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

function runBubbleSortService(workerData) {
    return new Promise((resolve, reject) => {
        const pathWorker = path.join(__dirname, 'buble-sorts.worker.js');
        const worker = new Worker(pathWorker, {
            workerData,
        });

        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

function runWorkerPoolPrimeNumber(workerData) {
    // Jalankan task sebanyak 10 buah task
    let workerPools = null;
    const pathWorkerPrimepool = path.join(
        __dirname,
        'workerpool-primes.worker.js',
    );

    if (config.mode === 'development') {
        workerPools = new WorkerPool(2, pathWorkerPrimepool);
    } else {
        workerPools = new WorkerPool(os.cpus().length, pathWorkerPrimepool);
    }

    // Menjalankan task secara banyak sekaligus,
    // atau bulk processing dengan Worker Pool Thread
    const arrayPromise = [];
    for (let i = 0; i < 10; i += 1) {
        const promise = new Promise((resolve, reject) => {
            workerPools.runTask(workerData, (errors, results) => {
                const stringDebug = `${i} ${errors} ${results}`;
                logger.info(stringDebug);
                if (errors) {
                    reject(errors);
                } else {
                    resolve(results);
                }
            });
        });
        arrayPromise.push(promise);
    }

    return Promise.allSettled(arrayPromise)
        .then((results) => {
            workerPools.close();
            results.forEach((result) => logger.info(result.status));
            return Promise.resolve(results);
        })
        .catch((error) => {
            logger.error(error);
            return Promise.reject(error);
        });
}

export {
    runWorkerPrimeService,
    runBubbleSortService,
    runWorkerPoolPrimeNumber,
};
