// Contoh menjalankan proses komputasi berat
// di Node JS dengan Worker Threads
// Proses berat tidak menghambat dan blocking main event loop
// Sehingga aplikasi tetap responsif ketika proses kalkulasi
// komputasi berat di jalankan
import { parentPort } from 'worker_threads';

const min = 2;
const primes = [];

// Contoh menghitung bilangan prima
function generatePrimes(start, range) {
    let isPrime = true;
    const end = start + range;
    for (let i = start; i < end; i += 1) {
        for (let j = min; j < Math.sqrt(end); j += 1) {
            if (i !== j && i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
        isPrime = true;
    }
}

parentPort.on('message', (workerData) => {
    // Terima message dan jalankan di worker thread
    generatePrimes(workerData.start, workerData.range);
    parentPort.postMessage(primes);
    // Reset data array
    primes.splice(0, primes.length);
});
