import { Worker } from 'worker_threads';

function runWorkerPrimeService(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./calc-primes.worker.js', { workerData });
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
        const worker = new Worker('./buble-sorts.worker.js', { workerData });
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
