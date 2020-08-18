import { Worker } from 'worker_threads';
import path from 'path';

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
        console.log(pathWorker);
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

export { runWorkerPrimeService, runBubbleSortService };
